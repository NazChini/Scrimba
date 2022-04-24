const $btn = document.getElementById("btn");
const $passwordContainers = document.querySelectorAll(".password-container");
const $popUp = document.getElementById("pop-up");
const $length = document.getElementById("password-length");
const $lightmode = document.getElementById("lightmode-toggle");
let timeoutId;

const generatePassword = (
  length = 8,
  wishlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$"
) => {
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join("");
};

function copyToClipboard(e) {
  const copiedPassword = e.target.textContent;
  navigator.clipboard.write(copiedPassword);

  //briefly show a popup to notify the user
  $popUp.textContent = `${copiedPassword} copied to clipboard`;
  clearTimeout(timeoutId);
  $popUp.style.opacity = 0.9;
  timeoutId = setTimeout(() => {
    $popUp.style.opacity = null;
  }, 2000);
}

function renderPassword() {
  $passwordContainers.forEach((container) => {
    const password = generatePassword($length.value);
    container.innerHTML = `<p>${password}</p>`;
  });
}

function toggleDisplayMode() {
  document.querySelector(".container").classList.toggle("lightmode");
  document.querySelector(".header--tagline").classList.toggle("lightmode");
  document.querySelector(".btn--text").classList.toggle("white-text");
  document.querySelector("header").classList.toggle("lightmode");
  document
    .querySelectorAll(".dots")
    .forEach((dot) => dot.classList.toggle("dots-light"));
}

$btn.addEventListener("click", renderPassword);
$passwordContainers.forEach((container) => {
  container.addEventListener("click", copyToClipboard);
});
$lightmode.addEventListener("click", toggleDisplayMode);
