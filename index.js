const bookForm = document.getElementById('bookForm');
const title= document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const addBookBtn = document.getElementById("submit");
const bookLibrary = document.getElementById("library");
const addCard = document.getElementById("addCard");
const formContainer = document.querySelector(".form-container");

let myLibrary = [
    {
        title: "Arson by the river", 
    author: "Ichiro Ikigai",
    pages: 306,
},
 {
        title: "The Hobbit ", 
    author: "J. R. Tolkien",
    pages: 609,
},
 {
        title: "Harry Potter", 
    author: "J . K. Rowling",
    pages: 702,
}
];

addCard.addEventListener("click", () => {
    formContainer.style.display = "block";
    bookLibrary.style.display = "none";
})

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let book = new Book();
    book.title = title.value;
    book.author = author.value;
    book.pages = pages.value;
    myLibrary.push(book);
    bookLibrary.style.display = "flex";
    formContainer.style.display = "none";

    let newBook = document.createElement('div');
    // newBook.style.background = "azure";
    bookLibrary.appendChild(newBook);
    newBook.setAttribute('data-name',` ${book.title}`)
    console.log(newBook. getAttribute('data-name'));
    newBook.classList.add("books");
    newBook.innerHTML = `
    <h1>${book.title}</h1>
    <p>${book.author}</p>
    <p>${book.pages}</p>
    `;

    removeBook(newBook);
    toggleReadStatus(newBook);
    storeData()

    clearForm()
    return myLibrary
})

function Book(title,
    author,
    pages,
    readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
};

function displayBook() {
    myLibrary.forEach(( item, index )=> {
        console.log(item, index)
        let bookDiv = document.createElement('div');
        bookLibrary.appendChild(bookDiv);
        bookDiv.setAttribute("data-name", `${item.title}`);
        console.log(bookDiv. getAttribute('data-name'));
        bookDiv.classList.add("books");
        bookDiv.innerHTML = `
        <h1>${item.title}</h1>
        <p>${item.author}</p>
        <p>${item.pages}</p>
        `;

        removeBook(bookDiv)
       toggleReadStatus(bookDiv)
       storeData()
    })
   
}

displayBook() 

function clearForm() {
    author.value = "";
    title.value = "";
    pages.value = "";
}

function bookLibraryStyle() {
bookLibrary.style.display = "flex";
bookLibrary.style.maxWidth = "80%";
bookLibrary.style.margin = "0 auto";
bookLibrary.style.justifyContent = "space-between";
bookLibrary.style.flexWrap = "wrap";
}
bookLibraryStyle()

function removeBook(item) {
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.textContent = "Remove Book";
    item.appendChild(removeBtn);
    removeBtn.addEventListener("click", () => {
        let bookIndex = myLibrary.indexOf(item);
        myLibrary.splice(bookIndex, 1);
        item.style.display = "none";
});
}

function toggleReadStatus(item) {
    const toggleBtn = document.createElement("button");
    item.appendChild(toggleBtn);
    toggleBtn.textContent = "UNREAD";
    toggleBtn.addEventListener("click", () => {
        if(toggleBtn.textContent == "UNREAD") {
          toggleBtn.textContent ="READ"
        }else {
           toggleBtn.textContent = "UNREAD"
        }    
    })
}

function storeData() {
    localStorage.setItem("bookStorage", JSON.stringify(myLibrary))
}

