document.addEventListener("DOMContentLoaded", () => {
    const notesContainer = document.querySelector(".notes-container");
    const createBtn = document.querySelector(".btn");

    function loadNotes() {
        notesContainer.innerHTML = localStorage.getItem("notes") || "";
        attachEventListeners();
    }

    function saveNotes() {
        localStorage.setItem("notes", notesContainer.innerHTML);
    }

    function attachEventListeners() {
        document.querySelectorAll(".input-box").forEach((note) => {
            note.addEventListener("keyup", saveNotes);
        });

        document.querySelectorAll(".input-box img").forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", (e) => {
                e.target.parentElement.remove();
                saveNotes();
            });
        });
    }

    createBtn.addEventListener("click", () => {
        let note = document.createElement("div");
        note.className = "input-box";
        note.setAttribute("contenteditable", "true");

        let deleteIcon = document.createElement("img");
        deleteIcon.src = "/images/delete.png";
        deleteIcon.alt = "Delete";

        note.appendChild(deleteIcon);
        notesContainer.appendChild(note);

        attachEventListeners();
        saveNotes();
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Enter" &&
            document.activeElement.classList.contains("input-box")
        ) {
            event.preventDefault();
            document.execCommand("insertHTML", false, "<br>");
        }
    });

    loadNotes();
});
