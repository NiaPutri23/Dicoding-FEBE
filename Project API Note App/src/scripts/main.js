const { animate } = require('motion')

function main() {
  const baseUrl = 'https://notes-api.dicoding.dev/v2'

  // nampilin pop up form
  function showForm() {
    const popupForm = document.getElementById('popupForm')
    popupForm.style.opacity = 1;
    popupForm.style.display = 'block'
    animate(popupForm, { opacity: 1, top: ['51%', '50%'] }, { duration: 0.5 })
  }

  // tutup pop up form
  function closeForm() {
    const popupForm = document.getElementById('popupForm')
    animate(
      popupForm,
      { opacity: 0, top: ['50%', '51%'] },
      {
        duration: 0.5,
      },
    )
    popupForm.style.display = 'none';
  }

  class AddButton extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      const template = document.createElement('template')
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
      `
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.shadowRoot.querySelector('button').addEventListener('click', () => {
        showForm()
      })
    }
  }
  customElements.define('add-button', AddButton)

  class CancelButton extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      const template = document.createElement('template')
      template.innerHTML = `
        <style>
          button {
            padding: 10px 25px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            white-space: nowrap;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
            background-color: grey;
            color: white;
            border: none;
          }
          
          button:hover {
            opacity: 0.8;
          }
        </style>
        <button class="cancel">Cancel</button>
      `
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.shadowRoot.querySelector('button').addEventListener('click', () => {
        closeForm()
      })
    }
  }
  customElements.define('cancel-button', CancelButton)

  class SearchNote extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      const template = document.createElement('template')
      template.innerHTML = `
        <style>
          input[type="text"] {
            padding: 10px;
            margin-right: 20px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 16px;
            box-sizing: border-box;
            width: 95%
          }
        </style>
        <input type="text" id="searchInput" placeholder="Search notes...">
      `
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.shadowRoot.getElementById('searchInput').addEventListener('input', () => {
        this.searchNotes()
      })
    }

    searchNotes() {
      const searchTerm = this.shadowRoot.getElementById('searchInput').value.toLowerCase()
      const noteBox = document.getElementById('notesGrid')
      const notes = noteBox.getElementsByClassName('note')
      Array.from(notes).forEach(note => {
        const title = note.getElementsByTagName('h3')[0].innerText.toLowerCase()
        const body = note.getElementsByTagName('p')[0].innerText.toLowerCase()
        if (title.includes(searchTerm) || body.includes(searchTerm)) {
          note.style.display = 'block'
        } else {
          note.style.display = 'none'
        }
      })
    }
  }
  customElements.define('search-note', SearchNote)

  // loading
  class LoadingIndicator extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = `
      <style>
      .loading-container {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          background-color: rgba(255, 255, 255, 0.8); 
          backdrop-filter: blur(5px);
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 5); /* Shadow untuk efek pop-up */
          display: none; /* Awalnya di-hide */
      }
      h1{
        margin: 0 auto;
        margin-top: 50vh;
      }
  </style>
  <div class="loading-container">
      <h1>Loading..</h1>
  </div>
  `
    }

    connectedCallback() {
      this.show()
    }

    disconnectedCallback() {
      this.hide()
    }

    show() {
      this.shadowRoot.querySelector('.loading-container').style.display = 'flex'
    }

    hide() {
      this.shadowRoot.querySelector('.loading-container').style.display = 'none'
    }
  }
  customElements.define('loading-indicator', LoadingIndicator)

  // menampilkan loading indicator
  function showLoadingIndicator() {
    const loadingIndicator = document.querySelector('loading-indicator')
    loadingIndicator.style.display = 'block'
  }

  // menyembunyikan loading indicator
  function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('loading-indicator')
    loadingIndicator.style.display = 'none'
  }

  //Fungsi API
  // Mendapatkan daftar notes non-archived
  const getUnarchivedNotes = () => {
    showLoadingIndicator();
    console.log('loading indicator showed');
    fetch(`${baseUrl}/notes`, {
      method: 'GET',
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message)
        } else {
          renderNotes(responseJson.data)
          const showArchived = document.getElementById('showArchived')
          if (showArchived) {
            showArchived.checked = false
          }
        }
      })
      .catch(error => {
        showResponseMessage(error)
      })
    hideLoadingIndicator();
    console.log('loading indicator closed');
  }

  // Mendapatkan daftar notes archived
  const getArchivedNotes = () => {
    showLoadingIndicator();
    fetch(`${baseUrl}/notes/archived`, {
      method: 'GET',
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message)
        } else {
          renderNotes(responseJson.data)
        }
      })
      .catch(error => {
        showResponseMessage(error)
      })
      hideLoadingIndicator();
  }

  // Menambah note
  const createNote = note => {
    fetch(`${baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        showResponseMessage(responseJson.message)
        getUnarchivedNotes()
      })
      .catch(error => {
        showResponseMessage(error)
      })
  }

  const archiveNote = noteId => {
    fetch(`${baseUrl}/notes/${noteId}/archive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        showResponseMessage(responseJson.message)
        getUnarchivedNotes()
      })
      .catch(error => {
        showResponseMessage(error)
      })
  }

  const unarchiveNote = noteId => {
    fetch(`${baseUrl}/notes/${noteId}/unarchive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        showResponseMessage(responseJson.message)
        getUnarchivedNotes()
      })
      .catch(error => {
        showResponseMessage(error)
      })
  }

  const deleteNote = noteId => {
    console.log('Deleting note with ID:', noteId) // Debugging log
    fetch(`${baseUrl}/notes/${noteId}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        console.log('Delete response:', responseJson) // Debugging log
        showResponseMessage(responseJson.message)
        getUnarchivedNotes()
      })
      .catch(error => {
        console.error('Delete error:', error) // Debugging log
        showResponseMessage(error)
      })
  }

  const renderNotes = data => {
    const noteBox = document.getElementById('notesGrid')
    noteBox.innerHTML = ''

    data.forEach(note => {
      const noteElement = document.createElement('div')
      noteElement.classList.add('note')

      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <p class="date-created">${note.createdAt}</p>
        <div class="btn-note">
        <div class="btn-archive" id="${note.id}">
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
        
        <div class="btn-delete" id="${note.id}">
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
        </div>
        </div>
      `
      noteBox.appendChild(noteElement)
    })

    const archButton = document.querySelectorAll('.btn-archive')
    archButton.forEach(button => {
      button.addEventListener('click', () => {
        const noteId = button.id
        console.log('note element:', noteId)
        const note = data.find(note => note.id === noteId)
        if (note.archived) {
          unarchiveNote(noteId)
        } else {
          archiveNote(noteId)
          console.log('note element:', noteId, 'archived')
        }
      })
    })

    const deleteButton = document.querySelectorAll('.btn-delete')
    deleteButton.forEach(button => {
      button.addEventListener('click', () => {
        const noteId = button.id
        console.log('note element:', noteId)
        deleteNote(noteId)
      })
    })
  }

  document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('#title')
    const body = document.querySelector('#body')
    const SaveButton = document.querySelector('#saveButton')

    SaveButton.addEventListener('click', function () {
      if (!title.value || !body.value) {
        alert('Title and Body cannot be empty!')
        return
      }
      const note = {
        // id: generateId(), //ini bakal digenerate otomatis dari API jadi gausah
        title: title.value,
        body: body.value,
        // createdAt: getCurrentDate(),
        // archived: false,
      }
      createNote(note)
      document.getElementById('noteForm').reset() //reset form biar isinya keapus
      closeForm()
    })

    const showArchived = document.getElementById('showArchived')
    showArchived.addEventListener('change', function () {
      if (showArchived.checked) {
        getArchivedNotes()
      } else {
        getUnarchivedNotes()
      }
    })
  })

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message)
  }

  const notesData = [
    {
      id: 'notes-jT-jjsyz61J8XKiI',
      title: 'Welcome to Notes, Dimas!',
      body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
      createdAt: '2022-07-28T10:03:12.594Z',
      archived: false,
    },
    {
      id: 'notes-aB-cdefg12345',
      title: 'Meeting Agenda',
      body: 'Discuss project updates and assign tasks for the upcoming week.',
      createdAt: '2022-08-05T15:30:00.000Z',
      archived: false,
    },
    {
      id: 'notes-XyZ-789012345',
      title: 'Shopping List',
      body: 'Milk, eggs, bread, fruits, and vegetables.',
      createdAt: '2022-08-10T08:45:23.120Z',
      archived: false,
    },
    {
      id: 'notes-1a-2b3c4d5e6f',
      title: 'Personal Goals',
      body: 'Read two books per month, exercise three times a week, learn a new language.',
      createdAt: '2022-08-15T18:12:55.789Z',
      archived: false,
    },
    {
      id: 'notes-LMN-456789',
      title: 'Recipe: Spaghetti Bolognese',
      body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
      createdAt: '2022-08-20T12:30:40.200Z',
      archived: false,
    },
    {
      id: 'notes-QwErTyUiOp',
      title: 'Workout Routine',
      body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
      createdAt: '2022-08-25T09:15:17.890Z',
      archived: false,
    },
    {
      id: 'notes-abcdef-987654',
      title: 'Book Recommendations',
      body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
      createdAt: '2022-09-01T14:20:05.321Z',
      archived: false,
    },
    {
      id: 'notes-zyxwv-54321',
      title: 'Daily Reflections',
      body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
      createdAt: '2022-09-07T20:40:30.150Z',
      archived: false,
    },
    {
      id: 'notes-poiuyt-987654',
      title: 'Travel Bucket List',
      body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
      createdAt: '2022-09-15T11:55:44.678Z',
      archived: false,
    },
    {
      id: 'notes-asdfgh-123456',
      title: 'Coding Projects',
      body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
      createdAt: '2022-09-20T17:10:12.987Z',
      archived: false,
    },
    {
      id: 'notes-5678-abcd-efgh',
      title: 'Project Deadline',
      body: 'Complete project tasks by the deadline on October 1st.',
      createdAt: '2022-09-28T14:00:00.000Z',
      archived: false,
    },
    {
      id: 'notes-9876-wxyz-1234',
      title: 'Health Checkup',
      body: 'Schedule a routine health checkup with the doctor.',
      createdAt: '2022-10-05T09:30:45.600Z',
      archived: false,
    },
    {
      id: 'notes-qwerty-8765-4321',
      title: 'Financial Goals',
      body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
      createdAt: '2022-10-12T12:15:30.890Z',
      archived: false,
    },
    {
      id: 'notes-98765-54321-12345',
      title: 'Holiday Plans',
      body: 'Research and plan for the upcoming holiday destination.',
      createdAt: '2022-10-20T16:45:00.000Z',
      archived: false,
    },
    {
      id: 'notes-1234-abcd-5678',
      title: 'Language Learning',
      body: 'Practice Spanish vocabulary for 30 minutes every day.',
      createdAt: '2022-10-28T08:00:20.120Z',
      archived: false,
    },
  ]
  console.log(notesData)

  // Inisialisasi: Render catatan dari local storage saat halaman dimuat
  window.onload = function () {
    getUnarchivedNotes()
  }
}

module.exports = main
