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
function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}
 
// untuk cari buku sesuai idnya, kalo sesuai maka return 
function findBook(bookId) {
  return books.find((book) => book.id == bookId);
}
 
// untuk cari index buku sesuai id, jika ga ketemu -> return -1
function findBookIndex(bookId) {
  return books.findIndex((book) => book.id == bookId);
}
 
function isStorageExist() {
  return typeof Storage !== "undefined";
}
 
function saveData() {
  if (isStorageExist()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}
 
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializedData) || [];
 
  books.length = 0; // Clear books array before pushing new data
 
  data.forEach((book) => {
    books.push(book);
  });
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}
 
// bikin elemen HTML utk nampilin detail buku 
function makeBook(bookObject) {
  const { id, title, author, year, isCompleted } = bookObject;
 
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
 
  if (isCompleted) {
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
      removeBookFromCompleted(id);
    });
 
    actionContainer.append(completeButton, deleteButton);
  }
 
  container.append(textTitle, textAuthor, textYear, actionContainer);
 
  return container;
}
 
// untuk nambahin buku 
function addBook() {
  const textBookTitle = document.getElementById("inputBookTitle").value;
  const textBookAuthor = document.getElementById("inputBookAuthor").value;
  const textBookYear = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;
 
  const generatedID = generateId();
  const bookObject = generateBookObject(
    generatedID,
    textBookTitle,
    textBookAuthor,
    textBookYear,
    isComplete
  );
  books.push(bookObject);
 
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  alert("Buku berhasil ditambahkan!");
}
 
function addBookToCompleted(bookId) {
  const bookIndex = findBookIndex(bookId);
  if (bookIndex === -1) return;
 
  books[bookIndex].isCompleted = true;
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
 
  books[bookIndex].isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  alert("Buku berhasil dipindahkan!");
}
 
// event listener saat DOM selesai diload
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
 
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
 
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
 
document.addEventListener(SAVED_EVENT, () => {
  console.log("Data berhasil disimpan");
});
 
// render ulang datar buku tiap ada perubahan 
document.addEventListener(RENDER_EVENT, function () {
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );
 
  // menghapus isi rak buku yang ada dan buat elemen baru untuk tiap buku
  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";
 
  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (bookItem.isCompleted) {
      completeBookshelfList.appendChild(bookElement);
    } else {
      incompleteBookshelfList.appendChild(bookElement);
    }
  }
});