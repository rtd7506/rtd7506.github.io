let theBody = document.querySelector("body");
//const debugText = document.getElementById("debug_text");
const p_text = document.getElementsByClassName("l_text");
let massage = p_text[4].innerHTML;
console.log("CHANGE THE WIDTH OF THE CONSOLE TO SOLVE THE PUZZLE")
window.onresize = test;
let lockValue;
let solved = false;
const rainbow = 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'; //Rainbow syling from https://www.codegrepper.com/code-examples/javascript/how+to+bold+text+in+console.log
const bigText = 'font-weight: bold; font-size: 30px;'
const smallText = 'font-size: 7px;'
const fillSpace = 'font-size: 30px;'
const quote = 'font-weight: bold; font-size: 20px; text-align: center;'
const cookie = 'display:block; font-size: 75px; text-align: center;'
function test()
{
  //console.log("TESTEST");
  //theBody.style.backgroundColor = "rgb("+ window.innerWidth/(window.screen.width/255)+",0,0"+")";
  lockValue = Math.round(window.innerWidth/10);
  if (lockValue == 67)
  {
    if (solved == false)
    {
      message();
    }
    solved = true;
    p_text[4].innerHTML = "           as  g ";
  }
  else
  {
    //solved = false;
    p_text[4].innerHTML = "           es  g ";
  }
  if (solved == true)
  {

  }

  //console.log(lockValue);
  //window.screen.width);
  //console.log(Math.round(window.innerWidth/10));
  //debugText.innerHTML = titleText[Math.ceil((window.innerWidth/(window.screen.width-400))*4)-1];
  //debugText.style.fontSize = Math.ceil((window.innerWidth/(window.screen.width-400))*100);
}

function message()
{
  console.clear();
  console.log("%c CONGRATULATIONS!", rainbow)
  console.log("%cHere, have a cookie", quote)
  console.log("%c🍪", cookie);
  console.log("%c You found the message in the medium", bigText);
  console.log("Or is it the medium in the message");
  console.log("%c or is it the medium in the massage", smallText);
  console.log("food for thought")
  console.log("%c ", fillSpace);
  console.log("%c Hey good job solving that puzzle by the way", bigText);
  console.log("It's kinda crazy how random symbols can be put together to suddenly have meaning")
  console.log("Explaining it like that makes the alphabet seem a lot more complex than we give it credit for")
  console.log("After all...");
  console.log('%c "The alphabet is a construct of fragmented bits and parts which have no semantic meaning in themselves"', quote); //page 44
  console.log("Written language, though built on letters, is so heavily reliant on the words they spell")
  console.log("It makes sentences with letters missing pr tty h rd to d cyp er")
  console.log("I think that's pretty cool ")
}

