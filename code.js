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

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
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
  });

  let deleteBtns = document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", (e) => findBook(e));
  });
}

function clearForm() {
  $title.value = "";
  $author.value = "";
  $pages.value = "";
}

function findBook(index) {
  console.log(index.target.getAttribute("data-value"));
  return index.target.getAttribute("data-value");
}
