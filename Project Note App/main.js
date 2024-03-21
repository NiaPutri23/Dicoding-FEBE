// Define custom element for app bar
class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header>
          <h1>Notes App</h1>
        </header>
      `;
  }
}
customElements.define("app-bar", AppBar);

// Define custom element for note form
class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="note-form">
        <input type="text" name="title" placeholder="Title" required>
        <textarea name="body" placeholder="Your note here" required></textarea>
        <button type="submit">Add Note</button>
      </form>
    `;
    this.querySelector("form").addEventListener("submit", this.addNote);
  }

  addNote(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const body = form.body.value;

    if (title && body) {
      const noteList = document.querySelector("note-list");
      const noteItem = document.createElement("note-item");
      noteItem.setAttribute("title", title);
      noteItem.setAttribute("body", body);
      noteList.appendChild(noteItem);
      form.reset();
    } else {
      alert("Please enter both title and body for the note.");
    }
  }
}
customElements.define("note-form", NoteForm);

// Define custom element for note list
class NoteList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<div id="notes"></div>';
  }
}
customElements.define("note-list", NoteList);

// Define custom element for note item
class NoteItem extends HTMLElement {
  connectedCallback() {
    const { title, body } = this.attributes;
    this.innerHTML = `
      <div class="note-item">
        <h3>${title.value}</h3>
        <p>${body.value}</p>
      </div>
    `;
  }
}
customElements.define("note-item", NoteItem);
