document.addEventListener("DOMContentLoaded", function () {
    const boxContainer = document.getElementById("box-container");
    const newBoxBtn = document.getElementById("new-box-button");
    const colorForm = document.getElementById("color-form");
    const colorInput = document.getElementById("color-input");

    let boxIdCounter = 0; // Counter for id assignment
    let boxColor = null; //Store the color client set in form
    // - The user should be able to set a color for boxes (this affects both current boxes and new boxes).
    function addNewBox() {
        const newBox = document.createElement("div");
        newBox.style.borderColor = boxColor;
        newBox.textContent = `Box ${boxIdCounter.toString()}`;
        newBox.id = boxIdCounter++;
        newBox.classList.add("box");
        boxContainer.appendChild(newBox);
    }

    colorForm.addEventListener("submit", function (e) {
        e.preventDefault();
        boxColor = colorInput.value.trim();
        boxContainer.querySelectorAll(".box").forEach((box) => {
            box.style.borderColor = boxColor;
        });
        colorInput.value = "";
    });

    newBoxBtn.addEventListener("click", function (e) {
        addNewBox();
    });

    document.addEventListener("keydown", function (e) {
        const target = e.target;

        const isTyping =
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "isContentEditable";

        if (isTyping) return;

        switch (e.key) {
            case "N":
            case "n":
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

    // - Each box should display its boxIdCounter.
    // - Each box should display its page coordinates when hovered (when the mouse leaves, it displays its boxIdCounter back).
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
});
