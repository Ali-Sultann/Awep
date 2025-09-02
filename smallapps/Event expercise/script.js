let id = 0;
let boxColor = "green";
//NOTE - Should I make the variable boxContainer globle?
let boxContainer = document.getElementById("box-container");
let newBoxBtn = document.getElementById("new-box-button");
let colorForm = document.getElementById("color-form");
// - The user should be able to set a color for boxes (this affects both current boxes and new boxes).
function setAllBoxesColor(color) {
    boxColor = color;
    boxContainer.querySelectorAll(".box").forEach((box) => {
        box.style.borderColor = color;
    });
}
colorForm.addEventListener("submit", function (e) {
    e.preventDefault();
    setAllBoxesColor(colorForm.elements["color-input"].value);
});

// - The user should be able to add boxes with the set color to the div with the ID `box-container`:
//     - When the button with the ID `new-box-button` is clicked.
//     - When the `N` key is pressed.
function addNewBox() {
    let newBox = document.createElement("div");
    newBox.id = id++;
    newBox.style.borderColor = boxColor;
    newBox.textContent = newBox.id;
    newBox.classList.add("box");
    boxContainer.appendChild(newBox);
}

newBoxBtn.addEventListener("click", function (e) {
    addNewBox();
});

document.addEventListener("keypress", function (e) {
    const target = e.target;

    const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "isContentEditable";

    if (isTyping) return;

    switch (e.key) {
        case "N":
            addNewBox();
            break;
        default:
            break;
    }
});

// - The user should be able to remove a box when the box is double-clicked on.
boxContainer.addEventListener("dblclick", function (e) {
    e.target.remove();
});

// - Each box should display its ID.
// - Each box should display its page coordinates when hovered (when the mouse leaves, it displays its ID back).
boxContainer.addEventListener("mouseover", function (e) {
    let target = e.target;
    if (target.classList.contains("box")) {
        target.textContent = `(${target.offsetLeft}, ${target.offsetTop})`;
    }
});
boxContainer.addEventListener("mouseout", function (e) {
    let target = e.target;
    if (target.classList.contains("box")) {
        target.textContent = target.id;
    }
});

// - Each box should have a class `box` for styling and selecting.
