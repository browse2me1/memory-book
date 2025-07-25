const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const photoInput = document.getElementById("photo");

const editIndex = localStorage.getItem("editIndex");
let memories = JSON.parse(localStorage.getItem("memories")) || [];

if (editIndex !== null && memories[editIndex]) {
    const mem = memories[editIndex];
    nameInput.value = mem.name;
    messageInput.value = mem.message;
    // Note: We can't set a file input directly for security reasons
}

document.getElementById("memoryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert("Please fill in both name and message.");
        return;
    }

    const reader = new FileReader();

    const handleSave = (photoData) => {
        const memory = {
            name,
            message,
            photo: photoData
        };

        if (editIndex !== null && memories[editIndex]) {
            memories[editIndex] = memory;
        } else {
            memories.push(memory);
        }

        localStorage.setItem("memories", JSON.stringify(memories));
        localStorage.removeItem("editIndex");
        window.location.href = "index.html";
    };

    // If a new photo is selected, use it
    if (photoInput.files && photoInput.files[0]) {
        reader.onload = function () {
            handleSave(reader.result); // Base64
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        // No new photo selected, keep the existing one
        const existingPhoto = (editIndex !== null && memories[editIndex]) ? memories[editIndex].photo : null;
        handleSave(existingPhoto);
    }
});