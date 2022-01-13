const bookForm = document.getElementById('bookForm');
const title= document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const addBookBtn = document.getElementById("submit");
const bookLibrary = document.getElementById("library");
const addCard = document.getElementById("addCard");
const formContainer = document.querySelector(".form-container");
const bookArray = [];

let myLibrary = [
    {
    title: "The Monk Who Sold His Ferrari", 
    author: "Robin Sharma",
    pages: 198,
},
 {
    title: "Courage to be Disliked", 
    author: "Fumitake Koga and Ichiro Kishimi",
    pages: 329,
},
 {
    title: "No Excuses: The Power of Self-Discpline", 
    author: "Brian Tracy",
    pages: 332,
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
    bookLibrary.appendChild(newBook);
    newBook.setAttribute('data-name',` ${book.title}`)
    newBook.classList.add("books");
    newBook.innerHTML = `
    <h1>${book.title}</h1>
    <p>${book.author}</p>
    <p>${book.pages}</p>
    `;
    bookArray.push(newBook);

    
    toggleReadStatus(newBook);
    storeData()
    removeBook(newBook);

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
        let bookDiv = document.createElement('div');
        bookLibrary.appendChild(bookDiv);
        bookDiv.setAttribute("data-name", `${item.title}`);
        bookDiv.classList.add("books");
        bookDiv.innerHTML = `
        <h1>${item.title}</h1>
        <p>${item.author}</p>
        <p>${item.pages}</p>
        `;
        bookArray.push(bookDiv);
        
       toggleReadStatus(bookDiv);
       storeData();
       removeBook(bookDiv);
    });
}

displayBook() 

function clearForm() {
    bookForm.reset();
}

function bookLibraryStyle() {
bookLibrary.style.display = "flex";
bookLibrary.style.margin = "0 auto";
bookLibrary.style.maxWidth = "80%";
bookLibrary.style.justifyContent = "space-around";
bookLibrary.style.flexWrap = "wrap";
}
bookLibraryStyle()

function removeBook(item) {
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.textContent = "Remove Book";
    item.appendChild(removeBtn);
    removeBtn.addEventListener("click", () => {
        let bookIndex = bookArray.indexOf(item);
        if(bookIndex > -1) {
            myLibrary.splice(bookIndex, 1);
            bookArray.splice(bookIndex,1)
            item.style.display = "none";
            storeData();
            return myLibrary;
        }
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

