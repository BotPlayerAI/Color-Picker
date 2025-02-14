const colorInput = document.getElementById("colorInput");
const colorDisplay = document.getElementById("colorDisplay");
const saveColorButton = document.getElementById("saveColor");
const colorHistory = document.getElementById("colorHistory");

// Load saved colors when page loads
document.addEventListener("DOMContentLoaded", loadSavedColors);

colorInput.addEventListener("input", function () {
  updateColorDisplay(colorInput.value);
});

saveColorButton.addEventListener("click", function () {
  const color = colorInput.value;

  // Save color to localStorage
  saveColorToStorage(color);

  // Add color to history section
  addColorToHistory(color);
});

function updateColorDisplay(color) {
  colorDisplay.style.backgroundColor = color;
  colorDisplay.textContent = color;
  colorDisplay.style.color = getTextColor(color);
}

// Determine text color (white for dark backgrounds, black for light)
function getTextColor(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
  return brightness < 128 ? "#ffffff" : "#000000";
}

// Save color in localStorage
function saveColorToStorage(color) {
  let colors = JSON.parse(localStorage.getItem("savedColors")) || [];
  if (!colors.includes(color)) {
    colors.push(color);
    localStorage.setItem("savedColors", JSON.stringify(colors));
  }
}

// Load colors from localStorage
function loadSavedColors() {
  let colors = JSON.parse(localStorage.getItem("savedColors")) || [];
  colors.forEach(addColorToHistory);
}

// Add a saved color to the history section
function addColorToHistory(color) {
  const colorBox = document.createElement("div");
  colorBox.classList.add("saved-color");
  colorBox.style.backgroundColor = color;
  colorBox.setAttribute("data-color", color);

  // Clicking the saved color restores it
  colorBox.addEventListener("click", function () {
    updateColorDisplay(color);
    colorInput.value = color;
  });

  colorHistory.appendChild(colorBox);
}