function Book(title, author, numOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.hasRead = hasRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.numOfPages}, ${this.hasRead}`;
  };
}

const book1 = new Book("abakadabra", "sensyo", 123, "not read yer");

console.log(book1.info());
