console.log("test");

let theBody = document.querySelector("body");
const myButton = document.getElementById("theButton");
let clickArray = [];

myButton.addEventListener("click", magicClick);

function magicClick() {
  console.log("click!");
  theBody.style.backgroundColor = "beige";
}