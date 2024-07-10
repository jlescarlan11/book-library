let myLibrary = [];

function Book(title, author, numOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, numOfPages, hasRead) {
  const newBook = new Book(title, author, numOfPages, hasRead);
  myLibrary.push(newBook);
  saveLibraryToLocalStorage();
  displayBooks();
}

function saveLibraryToLocalStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function loadLibraryFromLocalStorage() {
  const library = localStorage.getItem("library");
  if (library) {
    myLibrary = JSON.parse(library);
  }
}

function displayBooks() {
  const library = document.querySelector("#library");
  library.innerHTML = "";

  const addBook = document.createElement("button");
  addBook.className = "book-card new-book-btn";

  const newBookBtnContainer = document.createElement("div");
  newBookBtnContainer.className = "new-book-btn-container";

  const addBookTxt = document.createElement("h4");
  addBookTxt.textContent = "Add New Book";
  newBookBtnContainer.appendChild(addBookTxt);

  const addLibraryLogo = document.createElement("span");
  addLibraryLogo.className = "material-symbols-outlined";
  addLibraryLogo.textContent = "library_add";
  newBookBtnContainer.appendChild(addLibraryLogo);

  addBook.appendChild(newBookBtnContainer);

  library.appendChild(addBook);

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    const title = document.createElement("h4");
    title.textContent = `${book.title}`;
    bookCard.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `by ${book.author}`;
    bookCard.appendChild(author);

    const numOfPages = document.createElement("p");
    numOfPages.className = "num-pages";
    numOfPages.textContent = `${book.numOfPages} pages`;
    bookCard.appendChild(numOfPages);

    const hasRead = document.createElement("p");

    hasRead.textContent = `Status : ${
      book.hasRead ? "Completed" : "In Progress"
    }`;
    bookCard.appendChild(hasRead);

    const changeReadStatus = document.createElement("button");
    changeReadStatus.className = "change-button";
    changeReadStatus.textContent = "Change Status";
    bookCard.appendChild(changeReadStatus);

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    bookCard.appendChild(removeButton);

    changeReadStatus.addEventListener("click", (e) => {
      book.hasRead = !book.hasRead;
      saveLibraryToLocalStorage();
      displayBooks();
    });

    removeButton.addEventListener("click", (e) => {
      myLibrary.splice(index, 1);
      saveLibraryToLocalStorage();
      displayBooks();
    });

    library.appendChild(bookCard);
  });
}

loadLibraryFromLocalStorage();
displayBooks();

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book-btn");
const submitButton = document.querySelector(".submit");
const cancelButton = document.querySelector(".cancel");
const form = document.querySelector("#new-book-form");

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (form.checkValidity()) {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title.value, author.value, pages.value, read);

    dialog.close();

    form.reset();
  } else {
    form.reportValidity();
  }
});

dialog.addEventListener("close", (e) => {
  e.preventDefault();
});

cancelButton.addEventListener("click", (e) => {
  e.preventDefault;
  dialog.close();
});
