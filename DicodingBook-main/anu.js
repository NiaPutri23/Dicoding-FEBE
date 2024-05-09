function main() {
    const baseUrl = "https://notes-api.dicoding.dev/v2";
    const STORAGE_KEY = "notes_data";
    const SAVED_EVENT = "notes_saved";
  
    function generateId() {
      return "notes-" + Math.random().toString(36).substr(2, 16);
    }
  
    function showForm() {
      document.getElementById("popupForm").style.display = "block";
    }
  
    function closeForm() {
      document.getElementById("popupForm").style.display = "none";
    }
  
    const notes = [];
  
    class AddButton extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
          <style>
            button {
              padding: 10px 25px;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
              white-space: nowrap;
              box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
              background-color: #498479;
              color: white;
              border: none;
            }
            
            button:hover {
              opacity: 0.8;
            }
          </style>
          <button class="add">+ Add Note</button>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
          showForm();
        });
      }
    }
    customElements.define('add-button', AddButton);
  
    async function fetchNotes() {
      try {
        const response = await fetch(`${baseUrl}/notes`);
        const data = await response.json();
        notes.push(...data);
        renderNotes();
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
  
    function saveNote() {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const body = document.getElementById("body").value;
  
      const newNote = {
        id: generateId(),
        title: title,
        body: body,
        createdAt: getCurrentDate(),
        archived: false,
      };
  
      fetch(`${baseUrl}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to save note');
          }
          return response.json();
        })
        .then(() => {
          fetchNotes();
          closeForm();
          alert("Note Added!");
        })
        .catch(error => {
          console.error('Error saving note:', error);
        });
    }
  
    function getCurrentDate() {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const monthIndex = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const newDate = day + " " + (monthIndex + 1) + " " + year;
      return newDate;
    }
  
    function archiveNote(noteId) {
      const note = notes.find(note => note.id === noteId);
      if (note) {
        note.archived = !note.archived;
  
        fetch(`${baseUrl}/notes/${noteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to update note');
            }
            return response.json();
          })
          .then(() => {
            fetchNotes();
            alert("Note Archived!");
          })
          .catch(error => {
            console.error('Error archiving note:', error);
          });
      }
    }
  
    function deleteNote(noteId) {
      fetch(`${baseUrl}/notes/${noteId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete note');
          }
          return response.json();
        })
        .then(() => {
          notes.splice(notes.findIndex(note => note.id === noteId), 1);
          renderNotes();
          alert("Note Deleted!");
        })
        .catch(error => {
          console.error('Error deleting note:', error);
        });
    }
  
    function renderNotes() {
      const noteBox = document.getElementById("notesGrid");
      noteBox.innerHTML = "";
  
      notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        if (note.archived && !document.getElementById("showArchived").checked) {
          noteElement.style.display = "none";
        }
        noteElement.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <p class="date-created">${note.createdAt}</p>
          <div class="btn-note">
            <div class="btn-archive" onclick="archiveNote('${note.id}')">
              <!-- Icon for archive -->
            </div>
            <div class="btn-delete" onclick="deleteNote('${note.id}')">
              <!-- Icon for delete -->
            </div>
          </div>
        `;
        noteBox.appendChild(noteElement);
      });
    }
  
    window.onload = function () {
      fetchNotes();
    };
  }
  
  export default main;
  