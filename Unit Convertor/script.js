const $numInput = document.getElementById("top-section__number-input");
const $length = document.getElementById("length");
const $volume = document.getElementById("volume");
const $mass = document.getElementById("mass");
let input = 20;

function length(input) {
  const metersToFeet = (input * 3.28084).toFixed(3);
  const feetToMeters = (input * 0.3048).toFixed(3);
  $length.textContent = `${input} meters = ${metersToFeet} feet | ${input} feet = ${feetToMeters} meters`;
}

function volume(input) {
  const litresToGallons = (input * 0.219969).toFixed(3);
  const gallonsToLitres = (input * 4.54608).toFixed(3);
  $volume.textContent = `${input} liters = ${litresToGallons} gallons | ${input} gallons = ${gallonsToLitres} liters`;
}

function mass(input) {
  const kilosToPounds = (input * 2.20462).toFixed(3);
  const poundsToKilo = (input * 0.45359).toFixed(3);
  $mass.textContent = `${input} kilos = ${kilosToPounds} pounds | ${input} pounds = ${poundsToKilo} kilos`;
}

$numInput.addEventListener("input", () => {
  length($numInput.value);
  volume($numInput.value);
  mass($numInput.value);
});
