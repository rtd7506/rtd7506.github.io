const theButton = $("#myButton").on("click", clickFunc);
let x;
let y;

let scene = 0; //0 = title screen //1 = game //2 = game over

// SCORE
let score = 0;

//Colors
let col1 = "#f00";
let col2 = "#ff0";

let difficulty = 0;
let diffText = ["Easy","Medium","Hard"];

let timeIndex = 1;
let timeText = ["0:15","0:30","1:00","2:00"];
let timeVal = [15,30,60,120,300];

//Time
let start = 0;

$( document ).on( "mousemove", function( e ) {
  x = e.pageX;
  y = e.pageY;
  //console.log(x,y)
  $("#redCir").css({top: e.pageY-10, left: e.pageX-12})
  $("#fMouse").css({top: e.pageY, right: e.pageX})
  $("#yelCir").css({top: e.pageY-10, right: e.pageX-12})
  

  if (overlapM($("#palSel")))
  {
    $("#palSel").css({transform: "scale(1.05)"})
  }
  else{
    $("#palSel").css({transform: "scale(1)"})
  }
  if (overlapM($("#diffSel")))
  {
    $("#diffSel").css({transform: "scale(1.05)"})
  }
  else{
    $("#diffSel").css({transform: "scale(1)"})
  }


  //$("body").css('cursor', 'none');
  //$( "#log" ).text( "pageX: " + e.pageX + ", pageY: " + e.pageY );
});

$(".redBox").click(function() {
  console.log("RED");
  score+=1;
  //$(".redBox").hide(100);
  $(".redBox").css({left: 50+Math.random()*(window.innerWidth-250), top: 50+Math.random()*(window.innerHeight-250)});
  //$(".redBox").show(100);
  updateScore();
});

$("body").click(function() {
  if (overlapM($(".yelBox")))
  {
    console.log("YELLOW");
    $(".yelBox").css({left: 50+Math.random()*(window.innerWidth-250), top: 50+Math.random()*(window.innerHeight-250)});
    score+=1;
    updateScore();
  }

  if (overlapM($("#diffSel")))
  {
    difficulty+=1;
    if (difficulty > 2){
      difficulty=0;
    }
    $("#diffSel").text(diffText[difficulty]);
  }
  //console.log(overlapM($(".yelBox")));
});

$("#timeSel").click(function() {
  timeIndex+=1;
  if (timeIndex > 3){
    timeIndex=0;
  }
  $("#timeSel").text(timeText[timeIndex]);
});

function overlapM(yBox) { //From: https://stackoverflow.com/questions/14012766/detecting-whether-two-divs-overlap
  let fx = parseInt($("#fMouse").css("left").replace(/px/,""))+9;
  let fy = parseInt($("#fMouse").css("top").replace(/px/,""));
  let bx1 = parseInt(yBox.css("left").replace(/px/,"")); //From: https://stackoverflow.com/questions/9333036/add-javascript-pixel-values
  let by1 = parseInt(yBox.css("top").replace(/px/,""));
  let bx2 = parseInt(yBox.css("left").replace(/px/,"")) + parseInt(yBox.css("width").replace(/px/,"")) + (parseInt(yBox.css("padding").replace(/px/,""))*2);
  let by2 = parseInt(yBox.css("top").replace(/px/,"")) + parseInt(yBox.css("height").replace(/px/,"")) + (parseInt(yBox.css("padding").replace(/px/,""))*2);
  if ((fx > bx1 && fx < bx2) && (fy > by1 && fy < by2)) {
    return true;
  }else{
    return false;
  }
}

function clickFunc(){
  console.log(event.pageX);
}

function updateScore(){
  $("#scoreKeeper").text("Score: "+score);
}

function stateCheck()
{
  if (scene==0){
    $(".game").hide(100);
    $(".title").show(100);
  } else if (scene==1){
    $(".game").show(100);
    $(".title").hide(100);
  }
}

stateCheck();

$("#start").click(function() {
  scene=1;
  start = new Date;
  start.setSeconds(start.getSeconds()+timeVal[timeIndex])
  $('.Timer').text("Timer: "+timeVal[timeIndex]);
  stateCheck();
})

setInterval(function() {
  if (scene==1)
  {
    if (Math.round((start-new Date) / 1000)==0)
    {
      console.log("END");
      scene=0;
      score=0;
      stateCheck();
    }
    $('.Timer').text("Timer: "+Math.round((start-new Date) / 1000));
    console.log(Math.round((start-new Date) / 1000));
    
  }
  
}, 1000);