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

let myLibrary = [];

const dataTest = [
  { title: "Mokebe", author: "Mokebe", pages: 123, status: "Read" },
  { title: "Mokebe", author: "Mokebe", pages: 123, status: "Not read" },
];

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
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function checkLocalStorage() {
  if (localStorage.getItem("myLibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  } else {
    myLibrary = dataTest;
  }
}

const $list = document.querySelector("tbody");

function showList() {
  checkLocalStorage();
  myLibrary.forEach((book) => {
    const bookListed = `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
        <button class="change">${book.status}</button>
        </td>
        <td>
        <button class="delete">Delete</button>
        </td>
      </tr>
      
    `;
    $list.insertAdjacentHTML("afterbegin", bookListed);
  });
}

function clearForm() {
  $title.value = "";
  $author.value = "";
  $pages.value = "";
}
