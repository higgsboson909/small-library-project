const addBookEl = document.querySelector(".add-book");
const mainContentEl = document.querySelector(".main-content");
const bookEl = [];

let myLibrary = [];     // contains books array

// constructor for book object
function Book(title, author, noOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.isRead = isRead;
}

Book.prototype.changeReadStatus = function (status) {
    this.isRead = status; 
};

// main

// add books mannualy
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('Moby Dick', 'Herman Melville', 585, false);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 283, true);


insertBooks(myLibrary);




// methods

// add books to the library
function addBookToLibrary(title, author, noOfPages, isRead) {
    const book = new Book(title, author, noOfPages, isRead);
    myLibrary.push(book);
    return 0;
}

function displayBook() {
    myLibrary.forEach((myBook) => {
        console.log(myBook);
    });
}

function removeBook(i) {
    myLibrary.splice(i, 1);
}

// insert books to dom
function insertBooks(bookArr) {

    
    bookArr.forEach((book) => {
        const bookDiv = document.createElement("div");
        const titleEl = document.createElement("div");
        const authorEl = document.createElement("div"); 
        const noOfPagesEl = document.createElement("div");
        bookDiv.append(titleEl);
        bookDiv.append(authorEl);
        bookDiv.append(noOfPagesEl);
        bookDiv.className = "book";
        titleEl.className = "title";
        authorEl.className = "author";
        noOfPagesEl.className = "no-of-pages";
        titleEl.innerHTML = book.title;
        authorEl.innerHTML =  book.author;
        noOfPagesEl.innerHTML = "p. - " + book.noOfPages;
        bookEl.push(bookDiv);
        mainContentEl.append(bookDiv);
    });
}