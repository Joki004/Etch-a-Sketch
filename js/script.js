let pencilMode = "color";
let selectedColor = "black";
let gridSize = 10;
let isMouseDown = false;
const widthValue = 80;

function applyStyles(element, styles) {
  Object.assign(element.style, styles);
}

function clearGrid() {
  document.querySelectorAll(".square").forEach((square) => {
    square.style.backgroundColor = "white";
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  do {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
  } while (color === "#FFFFFF");
  return color;
}

function handleSquareClick(event) {
  if (pencilMode === "eraser") {
  }
}

function handleButtonClick(event) {
  const button = event.currentTarget;
  const mode = document.querySelector(".mode");

  if (button.classList.contains("colorMode")) {
    pencilMode = "color";
    mode.textContent = "Color Mode";
  } else if (button.classList.contains("rainbowMode")) {
    mode.textContent = "Rainbow Mode";
    pencilMode = "rainbow";
  } else if (button.classList.contains("eraser")) {
    pencilMode = "eraser";
    mode.textContent = "Eraser Mode";
  } else if (button.classList.contains("clearButton")) {
    console.log("Clearing grid");
    clearGrid();
  }
}

function handleSquareHover(event) {
  if (!isMouseDown) return;
  handleDrawing(event.currentTarget);
}

document.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("square")) {
    isMouseDown = true;
    handleDrawing(e.target);
  }
});

document.addEventListener("mouseup", function () {
  isMouseDown = false;
});

function handleDrawing(square) {
  if (pencilMode === "color") {
    square.style.backgroundColor = selectedColor;
  } else if (pencilMode === "rainbow") {
    square.style.backgroundColor = getRandomColor();
  } else if (pencilMode === "eraser") {
    square.style.backgroundColor = "white";
  }
}

function makeBox() {
  const box = document.querySelector(".box");
  const mode = document.querySelector(".mode");
  if (box) {
    box.style.width = "100%";
    box.style.height = "100vh";
    box.style.backgroundColor = "black";
    box.style.display = "flex";
    box.style.justifyContent = "center";
    box.style.alignItems = "center";
    box.style.border = "1px solid white";
    box.style.gap = "10px";
    box.style.padding = "10px";
    mode.style.color = "white";
  } else {
    console.log("No element with class box found");
  }
}

function makePad() {
  const pad = document.querySelector(".pad");
  const sizeSelector = document.querySelector(".size");
  if (pad) {
    pad.style.width = "20vh";
    pad.style.height = `${widthValue}vh`;
    pad.style.backgroundColor = "blue";
    pad.style.display = "flex";
    pad.style.justifyContent = "center";
    pad.style.alignItems = "center";
    pad.style.flexDirection = "column";
    pad.style.gap = "10px";
    pad.style.border = "1px solid white";
    pad.style.borderRadius = "10px";
    sizeSelector.style.width = "100%";

    sizeSelector.style.border = "1px solid white";

  } else {
    console.log("No element with class pad found");
  }
}

function makeGrid() {
  const grid = document.querySelector(".grid");
  if (grid) {
    grid.style.width = `${widthValue}vh`;
    grid.style.height = `${widthValue}vh`;
    grid.style.backgroundColor = "white";
    grid.style.display = "flex";
    grid.style.flexWrap = "wrap";
    grid.style.justifyContent = "center";
    grid.style.alignItems = "center";
    grid.style.border = "20px solid red";
    grid.innerHTML = ""; // Clear existing grid
  } else {
    console.log("No element with class grid found");
  }
}

function createGridSquares(gridSize) {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
  const GRID_SIZE = gridSize;

  for (let i = 0; i < GRID_SIZE; i++) {
    const row = document.createElement("div");
    applyStyles(row, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: `${100 / GRID_SIZE}%`,
    });
    grid.appendChild(row);
    for (let j = 0; j < GRID_SIZE; j++) {
      const square = document.createElement("div");
      applyStyles(square, {
        width: `${widthValue / GRID_SIZE}vh`,
        height: `${widthValue / GRID_SIZE}vh`,
        border: "1px solid black",
      });

      square.classList.add("square");
      square.addEventListener("mousedown", function (event) {
        handleDrawing(event.target);
      });
      square.addEventListener("mouseover", handleSquareHover);
      row.appendChild(square);
    }
  }
}

function makeColorPicker() {
  const colorPicker = document.querySelector("#colorPicker");

  if (colorPicker) {
    colorPicker.style.width = "80px";
    colorPicker.style.height = "80px";
    
    colorPicker.style.display = "flex";
    colorPicker.style.justifyContent = "center";
    colorPicker.style.alignItems = "center";
    colorPicker.style.border = "1px solid white";
    console.log(colorPicker.value);
    selectedColor = colorPicker.value;
  }

  colorPicker.addEventListener("change", function (event) {
    const color = event.target.value;
    selectedColor = color;
    colorPicker.style.backgroundColor = color;
    console.log(selectedColor);
  });
}

function makeButtons() {
  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {
    button.style.width = "80%";
    button.style.height = "50px";
    button.style.backgroundColor = "grey";
    button.style.display = "flex";
    button.style.justifyContent = "center";
    button.style.alignItems = "center";
    button.style.border = "1px solid white";
    button.textContent = button.dataset.text; // Assuming you have data-text attribute for each button
    button.style.cursor = "pointer";
    button.style.borderRadius = "10px";
  });
}

const buttons = document.querySelectorAll(".button");
const squares = document.querySelectorAll(".square");

function getGridSize() {
  const input = document.querySelector(".size");
  const size = parseInt(input.value, 10);
  if (!isNaN(size) && size >= 1 && size <= 200) {
    gridSize = size;
    createGridSquares(gridSize);
  } else {
    alert("Please enter a number between 1 and 200.");
  }
}

function setup() {
  makeBox();
  makePad();
  makeGrid();

  const input = document.querySelector(".size");
  if (input) {
    input.addEventListener("change", getGridSize); // Update grid size when input changes
  }
  console.log(gridSize);
  createGridSquares(gridSize);
  makeColorPicker();
  makeButtons();

  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });
}

setup();
