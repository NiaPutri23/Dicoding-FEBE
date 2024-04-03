const STORAGE_KEY = "notes_data"; // Tambahkan definisi STORAGE_KEY
const SAVED_EVENT = "notes_saved"; // Tambahkan definisi SAVED_EVENT

// hasilkan id unik untuk catatan dengan format "notes-16karakter random"
function generateId() {
  return "notes-" + Math.random().toString(36).substr(2, 16);
}

// nampilin pop up form
function showForm() {
  document.getElementById("popupForm").style.display = "block";
}

// tutup pop up form 
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// array notes
const notes = [];

// simpan note
function saveNote() {
  event.preventDefault(); //biar ga reload halaman pas form disubmit 

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  const newNote = {
    id: generateId(),
    title: title,
    body: body,
    createdAt: getCurrentDate(),
    archived: false,
  };
  notes.push(newNote);

  renderNotes(); // render ulang tiap tambah note baru 

  document.getElementById("noteForm").reset(); //reset form biar isinya keapus 

  closeForm();

  alert("Note Added!");

  saveData(); // Simpan catatan ke local storage
}

// fungsi hasilkan current date 
function getCurrentDate() {
  const currentDate = new Date();

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ];

  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const newDate = day + " " + months[monthIndex] + " " + year;

  return newDate;
}


function archiveNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = !notes[noteIndex].archived;
    
    const icon = document.querySelector('.btn-archive');
    icon.style.transform = `rotate(180deg)`;
    
    toggleArchivedNotes();
    renderNotes(); // nampilin hasil update 
    saveData(); // simpan ke local storage
    document.getElementById(noteId).classList.toggle('note-transform'); // Tambahkan atau hapus kelas untuk transformasi
  }
}


function deleteNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1); // hapus elemen beserta indexnya 
    renderNotes();
    saveData(); 
  }
}

function renderNotes() {
  const noteBox = document.getElementById("notesGrid");
  noteBox.innerHTML = "";  

  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    if (note.archived && !document.getElementById("showArchived").checked) {
      noteElement.style.display = "none"; // Sembunyikan catatan yang diarsipkan jika "Show Archived Notes" tidak dicentang
    }
    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <p class="date-created">${note.createdAt}</p>
      <div class="btn-note">
      <div class="btn-archive" onclick="archiveNote('${note.id}')">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
      >
        <path
          fill="#1E1E1E"
          d="m12 17.192l3.308-3.307l-.708-.708l-2.1 2.1v-4.7h-1v4.7l-2.1-2.1l-.708.708zM5 7.808v10.577q0 .269.173.442t.442.173h12.77q.269 0 .442-.173t.173-.442V7.808zM5.77 20q-.672 0-1.221-.549Q4 18.901 4 18.231V7.487q0-.293.093-.55q.094-.258.28-.475L5.931 4.59q.217-.292.543-.441Q6.8 4 7.174 4h9.614q.374 0 .71.149q.335.15.552.441l1.577 1.91q.186.217.28.485q.093.267.093.56V18.23q0 .67-.549 1.22q-.55.549-1.22.549zM5.38 6.808H18.6l-1.33-1.596q-.097-.097-.222-.154Q16.923 5 16.788 5H7.192q-.134 0-.26.058q-.124.057-.22.154zM12 13.404"
        />
      </svg>
      </div>
      
      <div class="btn-delete" onclick="deleteNote('${note.id}')">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="#1E1E1E"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.2"
        d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
      />
    </svg>
        </svg>
      </div>
      </div>
    `;
    noteBox.appendChild(noteElement);
  });
}

function toggleArchivedNotes() {
  const showArchived = document.getElementById("showArchived").checked;
  const archivedNotes = document.querySelectorAll(".note.archived");
  archivedNotes.forEach((note) => {
    if (showArchived) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
  renderNotes();
  saveData();
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(notes);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof Storage === "undefined") {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

// Inisialisasi: Render catatan dari local storage saat halaman dimuat
window.onload = function () {
  const storedNotes = localStorage.getItem(STORAGE_KEY);
  if (storedNotes) {
    notes.push(...JSON.parse(storedNotes));
    renderNotes();
  }
};
