// # Bookshelf Apps
// - memasukkan data buku ke dalam rak (belum selesai dibaca)
// - memindahkan data buku antar rak (selesai dibaca - belum)
// - menghapus data buku dari rak

// [
//  {
//   id: string | number,
//   title: string,
//   author: string,
//   year: number,
//   isComplete: boolean,
//  }
// ]

const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKSHELF_APPS";
 
// membuat id unik dgn timestamp 
function generateId() {
  return +new Date();
}
 
// membuat objek buku
function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author, 
    year: Number(year),
    isComplete,
  };
}
 
// untuk cari buku sesuai idnya, kalo sesuai maka return 
function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id == bookId) {
      return bookItem;
    }
  }
  return null;
}

// untuk cari index buku sesuai id, jika ga ketemu -> return -1
function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id == bookId) {
      return index;
    }
  }
  return -1;
}

// cek apakah browser mendukung localStorage atau tidak
function isStorageExist() {
  if (typeof Storage === "undefined") {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

// untuk menyimpan data ke localStorage berdasarkan KEY
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

// untuk memuat data dari localStorage & memasukkan data hasil parsing ke variabel
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

// bikin elemen HTML utk nampilin detail buku 
function makeBook(bookObject) {
  const { id, title, author, year, isComplete } = bookObject;

  const container = document.createElement("article");
  container.classList.add("book_item");

  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = `Penulis: ${author}`;

  const textYear = document.createElement("p");
  textYear.innerText = `Tahun: ${year}`;

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action");

  if (isComplete) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("green");
    undoButton.innerText = "Belum selesai di Baca";
    undoButton.addEventListener("click", function () {
      undoBookFromCompleted(id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.innerText = "Hapus buku";
    deleteButton.addEventListener("click", function () {
      removeBookFromCompleted(id);
    });

    actionContainer.append(undoButton, deleteButton);
  } else {
    const completeButton = document.createElement("button");
    completeButton.classList.add("green");
    completeButton.innerText = "Selesai dibaca";
    completeButton.addEventListener("click", function () {
      addBookToCompleted(id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.innerText = "Hapus buku";
    deleteButton.addEventListener("click", function () {
      deleteBook(id);
    });

    actionContainer.append(completeButton, deleteButton);
  }

  container.append(textTitle, textAuthor, textYear, actionContainer);

  return container;
}
 
// untuk nambahin buku 
function addBook() {
  const title = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const year = parseInt(document.getElementById('inputBookYear').value);
  const isComplete = document.getElementById('inputBookIsComplete').checked;

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, title, author, year, isComplete);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  alert("Buku berhasil ditambahkan!");
}

function addBookToCompleted(bookId) {
  const bookIndex = findBookIndex(bookId);
  if (bookIndex === -1) return;
 
  books[bookIndex].isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  alert("Buku berhasil dipindahkan!");
}
 
function removeBookFromCompleted(bookId) {
  const bookIndex = findBookIndex(bookId);
  if (bookIndex === -1) return;
 
  books.splice(bookIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  alert("Buku berhasil dihapus!");
}
 
function undoBookFromCompleted(bookId) {
  const bookIndex = findBookIndex(bookId);
  if (bookIndex === -1) return;
 
  books[bookIndex].isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  alert("Buku berhasil dipindahkan!");
}
 
function deleteBook(bookId) {
  const bookIndex = findBookIndex(bookId);
  if (bookIndex === -1) return;

  books.splice(bookIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  alert("Buku berhasil dihapus!");
}
 
// event listener saat DOM selesai diload
document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, () => {
  console.log('Data berhasil disimpan')
})
 
// render ulang datar buku tiap ada perubahan 
document.addEventListener(RENDER_EVENT, function () {
  const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  const completeBookshelfList = document.getElementById('completeBookshelfList');

  incompleteBookshelfList.innerHTML = '';
  completeBookshelfList.innerHTML = '';

  for (const book of books) {
    const bookElement = makeBook(book);
    if (book.isComplete) {
      completeBookshelfList.appendChild(bookElement);
    } else {
      incompleteBookshelfList.appendChild(bookElement);
    }
  }
});
