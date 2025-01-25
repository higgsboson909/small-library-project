
let myLibrary = [];     // contains books array


// constructor for book object
function Book(title, author, noOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.isRead = isRead;
}


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