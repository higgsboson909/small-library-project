const addBookEl = document.querySelector(".add-book");
const mainContentEl = document.querySelector(".main-content");
const dialog = document.querySelector("dialog");
const modalCloseEl = document.querySelector(".modal-close");
const submitBtnEl = document.querySelector(".form-submit");
const bookForm = document.querySelector("#book-form");
const bookEl = [];

let myLibrary = [];     // contains books array
let bookIndex = 0;

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

// delete the book 
function removeBook(i) {
    myLibrary.splice(i, 1);
}

// insert books to dom
function insertBooks(bookArr) {

    
    bookArr.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("data-id", bookIndex++);
        const titleEl = document.createElement("div");
        const authorEl = document.createElement("div"); 
        const noOfPagesEl = document.createElement("div");
        const btnsEl = document.createElement("div");
        btnsEl.className = "btns";
        const rmvBtn = document.createElement("button");
        rmvBtn.classList.add('remove-btn');
        rmvBtn.innerHTML = "Remove";
        const readBtn = document.createElement("button");
        readBtn.classList.add('read-btn');
        readBtn.innerHTML = "To read";
        btnsEl.append(readBtn);
        btnsEl.append(rmvBtn);
        bookDiv.append(titleEl);
        bookDiv.append(authorEl);
        bookDiv.append(noOfPagesEl);
        bookDiv.append(btnsEl);
        bookDiv.className = "book";
        titleEl.className = "title";
        authorEl.className = "author";
        noOfPagesEl.className = "no-of-pages";
        titleEl.innerHTML = book.title;
        authorEl.innerHTML =  book.author;
        noOfPagesEl.innerHTML = "p. - " + book.noOfPages;
        bookEl.push(bookDiv);

        // delete the book card
        rmvBtn.addEventListener('click', () => {
            removeBook(bookDiv.getAttribute('data-id'));
            bookDiv.remove();
            bookIndex = 0;
            bookEl.forEach((book) => book.remove());        // remove the preious books
            
    insertBooks(myLibrary);         //insert newly added book
        });

        mainContentEl.append(bookDiv);
    });
}

addBookEl.addEventListener('click', () => {
    dialog.showModal();
});
modalCloseEl.addEventListener('click', () => {
    event.preventDefault();
    dialog.close();
})

// form submit
submitBtnEl.addEventListener('click', () => {
    event.preventDefault(); 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    addBookToLibrary(title, author, pages, false);
    bookEl.forEach((book) => book.remove());        // remove the preious books
    bookIndex = 0;
    insertBooks(myLibrary);         //insert newly added book
})