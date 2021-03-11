"use strict"

// read functionality
const output = document.getElementById("output");
const bookshelfName = document.getElementById("status");
const bName = bookshelfName.innerText;
var bookshelfname = "\"" + bName + "\"";
console.log(bookshelfname);

function getBooks() {
    axios.get("http://localhost:8080/getBookStatus/" + bookshelfName)
        .then(res => {
            output.innerHTML = "";

            const books = res.data;
            console.log(books);

                books.forEach(book => {
                    const newBook = renderBook(book);
                    console.log("New Book: ", newBook);
                    output.appendChild(newBook);
                   });
                }).catch(err => console.error(err))
}

function renderBook(book) {

    const newColumn = document.createElement("div");
    newColumn.className = "col";

    const newBook = document.createElement("div");
    newBook.className = "card m-5";
    newColumn.appendChild(newBook);

    const bookBody = document.createElement("div");
    bookBody.className = "card-body";
    newBook.appendChild(bookBody);

    const bookTitle = document.createElement("h5");
    bookTitle.className = "card-title";
    bookTitle.innerText = book.title;
    bookBody.appendChild(bookTitle);

    const bookText = document.createElement("p");
    bookText.className = "card-text";
    bookText.innerHTML = "Author: " + book.author;
    bookText.innerHTML += "<br>";
    bookText.innerHTML += "Genre: " + book.genre;
    bookText.innerHTML += "<br>";
    bookText.innerHTML += "Year Released: " + book.yearReleased;
    bookText.innerHTML += "<br>";
    bookText.innerHTML += "Book Status: " + book.status;
    bookBody.appendChild(bookText);

    const bookFooter = document.createElement("div");
    bookFooter.className = "card-footer"
    newBook.appendChild(bookFooter);

    const deleteBookButton = document.createElement("a");
    deleteBookButton.className = "card-link";
    deleteBookButton.innerText = "Delete";
    deleteBookButton.addEventListener('click', function () {
        deleteBook(book.id);
    });

    bookFooter.appendChild(deleteBookButton);

    const updateBookButton = document.createElement("a");
    updateBookButton.className = "card-link";
    updateBookButton.innerText = "Update";
    
    bookFooter.appendChild(updateBookButton);

    return newColumn;
}

getBooks();

//delete functionality
function deleteBook(id) {
    axios.delete("http://localhost:8080/removeBook/" + id)
      .then(() => getBooks())
      .catch(err => console.error(err));
}