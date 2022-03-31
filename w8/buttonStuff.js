console.log("test");

let theBody = document.querySelector("body");
const myButton = document.getElementById("theButton");
const myText = document.getElementById("theText");
let textArray = ["Don't press that button","No seriously stop", "Stop it!","You're really pushin' my buttons","get it?", "because buttons", "...", "oh look a box", "Hey don't move that!", "Oh look some more boxes", "Hey you should seriously stop", "I don't think you should move these", "They look pretty heavy", "I mean what're the chances there would be a button under here?", "JUST STOP", "Oh so you think you're so clever", "How about THIS!", "This enough boxes for you?!","Because you seem to LOVE moving them around!","Just TRY finding that button!","HA! GOTCHA", "IT WAS ACTUALLY OVER HERE!", "WAIT NO!", "I bet you think you're clever", "Well, I'm all out of boxes", "NOW THERE'S NO BUTTON! IS THIS WHAT YOU WANT?! YOU DID THIS TO ME!!!"];
let textTransformsY = ["10%","10%","15%","10%","15%","20%","20%","40%","30%","20%","20%","20%","20%","20%","20%","10%","10%","10%","10%","10%","20%","70%"]
let i = 0;
let boxes;
let boxes2;
let scene1;
let scene2;
let scene3;


myButton.addEventListener("click", magicClick);

function magicClick() {
  i += 1;
  if (i>10 && i<14)
  {
    i=15;
  }
  if (i>16 && i<23)
  {
    i=23;
  }
  console.log("click!");
  theBody.style.backgroundColor = "beige";
  myText.style.top = textTransformsY[i];
  displayText();
  progressionCheck();
}

function displayText() {
  myText.innerHTML = textArray[i];
  if (i>15 && i<22)
  {
    myButton.style.left = "14%";
    myButton.style.top = "76%";
  }
  if (i>22)
  {
    myButton.style.left = "51%";
    myButton.style.top = "51%";
  }
  if (i>24)
  {
    myButton.style.visibility = "hidden";
  }
  if (i>20 && i<23)
  {
    boxes2[9].style.backgroundColor = "red";
  }
}

function progressionCheck() {
  if (i==7 || i==8)
  {
    box_initial.style.visibility = "visible";
  }
  else
  {
    box_initial.style.visibility = "hidden";
  }
  if (i>8 && i<15)
  {
    boxes.forEach(box => {
      box.style.visibility = "visible";
    })
  }
  else
  {
    boxes.forEach(box => {
      box.style.visibility = "hidden";
    })
  }

  if (i>15 && i<23)
  {
    boxes2.forEach(box => {
      box.style.visibility = "visible";
    })
  }
  else
  {
    boxes2.forEach(box => {
      box.style.visibility = "hidden";
    })
  }
}

function moveProg() {
  if (i<8 || (i>8 && i<14) || (i>15 && i<19) || (i>19 && i<21))
  {
    i+=1;
  }
  displayText();
  progressionCheck();
}

function trickCheck() {
  if (i>17 && i<20 && (boxes2[0].offsetTop<(innerHeight/2)-10 || boxes2[0].offsetTop>(innerHeight/2)+10)) /* 1/2 = 414 full = 418*/
  {
    console.log("TRICKED");
    /*console.log(boxes2[0].innerHTML);
    console.log(boxes2[0].offsetLeft);*/
    i=20;
    displayText();
    progressionCheck();
  }
}

function endCheck()
{
  if (i==21 && ((boxes2[9].offsetTop<(innerHeight*0.75)-20 || boxes2[9].offsetTop>(innerHeight*0.75)+20)))
  {
    console.log("GSFGRHSDFHGSGSGV");
    console.log(boxes2[9].offsetTop);
    i=22;
    displayText();
    progressionCheck();
  }
}

/* BOX DRAGGING CODE */
/* Code from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable */

scene1 = document.getElementById("scene1")
box_initial = scene1.querySelector(".box")
dragElement(box_initial);

scene2 = document.getElementById("scene2")
boxes = scene2.querySelectorAll(".box")
boxes.forEach(box => {
  dragElement(box);
})

scene3 = document.getElementById("scene3")
boxes2 = scene3.querySelectorAll(".box")
boxes2.forEach(box => {
  dragElement(box);
})

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }
  

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    console.log("TESTIN STUFF");
    moveProg();
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    trickCheck();
    endCheck();
  }
}