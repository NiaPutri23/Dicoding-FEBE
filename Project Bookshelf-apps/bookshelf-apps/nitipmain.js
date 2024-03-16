document.addEventListener("DOMContentLoaded", function () {
    const inputBookForm = document.getElementById("inputBook");
    const searchBookForm = document.getElementById("searchBook");
    const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
    const completeBookshelfList = document.getElementById("completeBookshelfList");
  
    const STORAGE_KEY = "BOOKSHELF_APPS";
  
    function makeBookObject(id, title, author, year, isComplete) {
      return { id, title, author, year, isComplete };
    }
  
    function refreshDataFromBookshelf() {
      let books = [];
      const localStorageData = localStorage.getItem(STORAGE_KEY);
  
      if (localStorageData !== null) {
        books = JSON.parse(localStorageData);
      }
  
      return books;
    }
  
    function saveDataToStorage(data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  
    function renderBookshelf(books) {
      incompleteBookshelfList.innerHTML = "";
      completeBookshelfList.innerHTML = "";
  
      for (const book of books) {
        const bookElement = document.createElement("article");
        bookElement.classList.add("book_item");
        bookElement.innerHTML = `
          <h3>${book.title}</h3>
          <p>Penulis: ${book.author}</p>
          <p>Tahun: ${book.year}</p>
          <div class="action">
            <button class="green" data-id="${book.id}">${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}</button>
            <button class="red" data-id="${book.id}">Hapus buku</button>
          </div>
        `;
  
        if (book.isComplete) {
          completeBookshelfList.appendChild(bookElement);
        } else {
          incompleteBookshelfList.appendChild(bookElement);
        }
      }
    }
  
    function addBookToBookshelf(event) {
      event.preventDefault();
  
      const title = document.getElementById("inputBookTitle").value;
      const author = document.getElementById("inputBookAuthor").value;
      const year = document.getElementById("inputBookYear").value;
      const isComplete = document.getElementById("inputBookIsComplete").checked;
      const id = +new Date();
  
      const newBook = makeBookObject(id, title, author, year, isComplete);
      const books = refreshDataFromBookshelf();
  
      books.push(newBook);
      saveDataToStorage(books);
  
      renderBookshelf(books);
  
      inputBookForm.reset();
    }
  
    function moveBook(event) {
      if (event.target.classList.contains("green") || event.target.classList.contains("red")) {
        const action = event.target.textContent;
        const id = event.target.dataset.id;
        let books = refreshDataFromBookshelf();
  
        if (action === "Selesai dibaca") {
          books = books.map(book => {
            if (book.id == id) {
              book.isComplete = true;
            }
            return book;
          });
        } else if (action === "Belum selesai dibaca") {
          books = books.map(book => {
            if (book.id == id) {
              book.isComplete = false;
            }
            return book;
          });
        } else if (action === "Hapus buku") {
          books = books.filter(book => book.id != id);
        }
  
        saveDataToStorage(books);
        renderBookshelf(books);
      }
    }
  
    inputBookForm.addEventListener("submit", addBookToBookshelf);
    searchBookForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const keyword = document.getElementById("searchBookTitle").value.toLowerCase();
      const books = refreshDataFromBookshelf();
  
      const filteredBooks = books.filter(book => book.title.toLowerCase().includes(keyword));
      renderBookshelf(filteredBooks);
    });
  
    incompleteBookshelfList.addEventListener("click", moveBook);
    completeBookshelfList.addEventListener("click", moveBook);
  
    // Initial render
    renderBookshelf(refreshDataFromBookshelf());
  });
  