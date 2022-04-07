const $colorInput = document.getElementById("color-input");
const $colorSchemeMode = document.getElementById("color-scheme-mode");
const $button = document.getElementById("button");
const $colorBlocks = document.querySelectorAll(".color-block");
const $colorNames = document.querySelectorAll(".color-name");
const $popUp = document.getElementById("pop-up");

function handleClick(e) {
  e.preventDefault();
  getColorScheme($colorInput.value, $colorSchemeMode.value);
}

function paint(colors) {
  for (let i = 0; i < colors.length; i++) {
    $colorBlocks[i].style.backgroundColor = colors[i];
    $colorNames[i].textContent = colors[i];
  }
}

function getColorScheme(_seedColor, _mode) {
  // don't fetch if seedColor and mode hasn't been changed
  if (seedColor === _seedColor && mode === _mode) {
    console.log("Seed color and mode hasn't been changed.");
    return;
  }

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${_seedColor.slice(
      1
    )}&mode=${_mode}`
  )
    .then((response) => response.json())
    .then((data) => {
      colors = data.colors.map((color) => color.hex.value);
      paint(colors);
    });

  //remember current seed color and mode for next fetch
  seedColor = _seedColor;
  mode = _mode;
}

function copyToClipboard(e) {
  const hex = e.target.textContent;
  navigator.clipboard.writeText(hex);

  //briefly show a popup to notify the user
  $popUp.textContent = `${hex} copied to clipboard`;
  clearTimeout(timeoutId);
  $popUp.style.opacity = 0.9;
  timeoutId = setTimeout(() => {
    $popUp.style.opacity = null;
  }, 2000);
}

let colors = ["#F55A5A", "#2B283A", "#FBF3AB", "#AAD1B6", "#A626D3"];
let seedColor = $colorInput.value;
let mode = $colorSchemeMode.value;
let timeoutId;

$button.addEventListener("click", handleClick);
$colorNames.forEach((button) => {
  button.addEventListener("click", copyToClipboard);
});

//Paint the initial colors
$colorInput.value = colors[0];
paint(colors);
