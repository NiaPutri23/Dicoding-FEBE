function showForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

function saveNote() {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    const noteBox = document.getElementById("notesGrid");

    // elemen baru new note
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.innerHTML = `
        <h3>${title}</h3>
        <p>${body}</p>
        <p class="date-created">${getCurrentDate()}</p>
    `;

    noteBox.appendChild(noteElement);

    closeForm();

    alert("Note saved successfully!");
}

function getCurrentDate() {
    const currentDate = new Date();

    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const newDate = day + ' ' + months[monthIndex] + ' ' + year;

    return newDate;
}
