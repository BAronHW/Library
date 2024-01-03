class Book{
    constructor(
        title = "undefined",
        author = "undefined",
        pages = "0",
        isRead = false,
    ){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library{
    constructor(
        Books = []
    ){
        this.Books = Books;
    }

    addBook(newBook){
        this.Books.push(newBook);
        this.updateLocalStorage();
    }
    removeBook(title){
        //get the books whos title is not equal to the title you want to delete 
        //and reassign that books array to the old booksarray 
        this.Books = this.Books.filter((book)=>book.title !== title)
        this.updateLocalStorage();
    }
    
    updateLocalStorage(){
        localStorage.setItem("books", JSON.stringify(this.Books));
    }
}

const library = new Library();
//UI shits

const addbutton = document.getElementById("addbookbtn"); //addbutton 
const bookgrid = document.getElementById("bookdisp");
const bookform = document.getElementById("addbookform");

const titleinput = document.getElementById("title");
const authorinput = document.getElementById("author");
const pagesinput = document.getElementById("pages");
const checkbox = document.getElementById("isread");
const submitformbtn = document.getElementById("submitform");
addbutton.addEventListener("click", toggleform);

function toggleform() {
    if (bookform.style.display === "none"|| bookform.style.display === "") {
        bookform.style.display = "block";
    } else {
        bookform.style.display = "none";
    }
}

bookform.addEventListener("submit", function(event) {
    event.preventDefault(); // This will prevent the default form submission
    createNewBook();
    console.log(library.Books.length);
});

function getforminfo() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isread').checked;
    const newBook = new Book(title,author,pages,isRead);
    return newBook;
}

//addes the card to the grid and adds the book to the library array
function createNewBook(){
    const newBook = getforminfo();
    const bookexists = library.Books.some(book => book.title === newBook.title);
    if(bookexists){
        console.log("Book already exists");
    }else{
        library.addBook(newBook); // Use the addBook method
        createNewCard(newBook); // Create and display the card for the new book
    }
}

function createNewCard(book) {
    // Create card container
    const card = document.createElement('div');
    card.classList.add('card');

    // Create and append title
    const titleElement = document.createElement('h3');
    titleElement.classList.add('card-title');
    titleElement.textContent = book.title;
    card.appendChild(titleElement);

    // Create and append author
    const authorElement = document.createElement('p');
    authorElement.classList.add('card-author');
    authorElement.textContent = `Author: ${book.author}`;
    card.appendChild(authorElement);

    // Create and append pages
    const pagesElement = document.createElement('p');
    pagesElement.classList.add('card-pages');
    pagesElement.textContent = `Pages: ${book.pages}`;
    card.appendChild(pagesElement);

    // Create and append read status
    const readStatusElement = document.createElement('p');
    readStatusElement.classList.add('card-read-status');
    readStatusElement.textContent = `Read: ${book.isRead ? 'Yes' : 'No'}`;
    card.appendChild(readStatusElement);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X'; // Text for the button
    deleteButton.classList.add('delete-btn');
    card.appendChild(deleteButton);

    // Append the card to the grid
    bookgrid.appendChild(card);

    // Add event listener for the delete button
    deleteButton.addEventListener('click', function() {
        // Logic to remove the book from the library and the card from the grid
        library.removeBook(book.title);
        card.remove();
        printarray()
    });
    // Append the card to the grid
    bookgrid.appendChild(card);
    printarray();
}

function printarray(){
    library.Books.forEach(element => {
        console.log(element);
    });
}

function loadLibraryFromLocalStorage() {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
        const booksArray = JSON.parse(savedBooks);
        booksArray.forEach(bookData => {
            const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.isRead);
            library.addBook(book);
            createNewCard(book);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLibraryFromLocalStorage();
});

