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

Book.prototype.changeReadStatus = function () {
    if(this.isRead == true) {
        this.isRead = false;
    }
    else 
        this.isRead = true;
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
        if(book.isRead === true) {
            readBtn.innerHTML = "Read";
            readBtn.classList.add("read");
        }
        else {
            readBtn.innerHTML = "To read";
            readBtn.classList.add("to-read");
        }
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

        updateReadStatus();
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
    let bookStatus;
    if(document.getElementById("read").value == 'on') {
        bookStatus = true;
    }
    else 
        bookStatus = false;
        
    console.log(bookStatus);
    addBookToLibrary(title, author, pages, bookStatus);
    bookEl.forEach((book) => book.remove());        // remove the preious books
    bookIndex = 0;

    insertBooks(myLibrary);         //insert newly added book
});

updateReadStatus();

function updateReadStatus() {
    let allBookEls = document.querySelectorAll(".book");
    allBookEls.forEach((book) => {
            book.addEventListener('click', (event) => {
            const target = event.target;

            if(target.classList.contains("read")) {
                let index = book.getAttribute("data-id");
                myLibrary[index].changeReadStatus();
                target.innerHTML = "To read";
                target.classList.remove("read");
                target.classList.add("to-read");
            }
            else if(target.classList.contains("to-read")) {
                let index = book.getAttribute("data-id");
                target.innerHTML = "Read";
                myLibrary[index].changeReadStatus();
                target.classList.remove("to-read");
                target.classList.add("read");
            }
        });
    });
}