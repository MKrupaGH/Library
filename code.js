const $title = document.querySelector("#title");
const $author = document.querySelector("#author");
const $pages = document.querySelector("#pages");
const $status = document.querySelector("#status");
const $form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
  showList();
  clearForm();
});

const $list = document.querySelector("tbody");

let myLibrary = [];

const dataTest = [
  { title: "Mokebe", author: "Mokebe", pages: 123, status: "Read" },
  { title: "Mokebe", author: "Mokebe", pages: 123, status: "Not read" },
];

showList();

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function addBook() {
  const newBook = new Book(
    $title.value,
    $author.value,
    $pages.value,
    $status.value
  );
  myLibrary.push(newBook);
  //console.log(myLibrary.push(newBook))
  updateStorage();
}

function updateStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function checkLocalStorage() {
  if (localStorage.getItem("myLibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  } else {
    myLibrary = dataTest;
  }
}
//console.log(typeof myLibrary)

function showList() {
  checkLocalStorage();
  $list.textContent = "";
  myLibrary.forEach((book, index) => {
    const bookListed = `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
        <button class="change" data-value="${index}">${book.status}</button>
        </td>
        <td>
        <button class="delete" data-value="${index}">Delete</button>
        </td>
      </tr> `;

    $list.insertAdjacentHTML("afterbegin", bookListed);

    const btn = document.querySelector(".change");

    if (book.status === "Not read") {
      btn.classList.add("change-notRead");
    } else {
      btn.classList.add("change-read");
    }
  });

  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const findedIndex = findBook(e);
      myLibrary.splice(findedIndex, 1);
      e.target.parentElement.parentElement.remove();
      updateStorage();
    });
  });

  document.querySelectorAll(".change").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const findedIndex = findBook(e);

      if (e.target.textContent === "Not read") {
        myLibrary[findedIndex].status = "Read";
        e.target.classList.remove("change-notRead");
        e.target.classList.add("change-read");
        e.target.textContent = "Read";
        updateStorage();
      } else if (e.target.textContent === "Read") {
        myLibrary[findedIndex].status = "Not read";
        e.target.classList.remove("change-read");
        e.target.classList.add("change-notRead");
        e.target.textContent = "Not read";
        updateStorage();
      }
    });
  });
}

function clearForm() {
  $title.value = "";
  $author.value = "";
  $pages.value = "";
}

function findBook(listenerTarget) {
  return listenerTarget.target.getAttribute("data-value");
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    input.setCustomValidity("");
  });
});

$title.addEventListener("invalid", () => {
  if ($title.value === "") {
    $title.setCustomValidity("Enter title!");
  }
});

$author.addEventListener("invalid", () => {
  if ($author.value === "") {
    $author.setCustomValidity("Enter author!");
  } else if ($author.validity.patternMismatch) {
    $author.setCustomValidity("You should use only letters!");
  }
});

$pages.addEventListener("invalid", () => {
  console.log("work");
  if ($pages.value === "" || $pages.value === "0") {
    $pages.setCustomValidity("The number of pages has to be min. 1");
  }
});
