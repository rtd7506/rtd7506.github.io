const theButton = $("#myButton").on("click", clickFunc);
let x;
let y;

let scene = 0; //0 = title screen //1 = game //2 = game over

// SCORE
let score = 0;
let highscore = 0;

//Colors
let col1 = "#f00";
let col2 = "#ff0";

let difficulty = 0;
let diffText = ["Easy","Medium","Hard"];

let timeIndex = 1;
let timeText = ["0:15","0:30","1:00","2:00"];
let timeVal = [15,30,60,120,300];

let axisIndex = 0;
let axisText = ["X Axis","Y Axis","Both"];

//Time
let start = 0;

$( document ).on( "mousemove", function( e ) {
  x = e.pageX;
  y = e.pageY;
  //console.log(x,y)
  $("#redCir").css({top: e.pageY-10, left: e.pageX-12})
  console.log(axisIndex);
  if(axisIndex==0){
    $("#fMouse").css({top: e.pageY, left: window.innerWidth-e.pageX})
    $("#yelCir").css({top: e.pageY-10, left: window.innerWidth-e.pageX-12})
  }else if(axisIndex==1){
    console.log(screen.availHeight);
    console.log(e.pageY);
    $("#fMouse").css({top: window.innerHeight-e.pageY, left: e.pageX});
    $("#yelCir").css({top: window.innerHeight-e.pageY-10, left: e.pageX-12});
  }else if(axisIndex==2){
    console.log("PLS")
    $("#fMouse").css({top: window.innerHeight-e.pageY, left: window.innerWidth-e.pageX});
    $("#yelCir").css({top: window.innerHeight-e.pageY-10, left: window.innerWidth-e.pageX-12});
  }
  
  

  if (overlapM($("#axisSel")))
  {
    $("#axisSel").css({transform: "scale(1.05)"})
  }
  else{
    $("#axisSel").css({transform: "scale(1)"})
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
  //$(".redBox").fadeOut('fast');
  $(".redBox").animate({ //From: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_animation1_relative and https://stackoverflow.com/questions/1065806/how-to-get-jquery-to-wait-until-an-effect-is-finished
    opacity: 0,
    left: "-="+$(this).width()/4,
    top: "-="+$(this).height()/4,
    height: ($(this).height()*1.5),
    width: ($(this).width()*1.5)
  },"fast");
  $(".redBox").promise().done(function(){
    $(".redBox").css({left: 50+Math.random()*(window.innerWidth-300), top: 50+Math.random()*(window.innerHeight-300)});
    $(".redBox").animate({
      opacity: 1,
      left: "+="+($(this).width()/4)*2/3,
      top: "+="+($(this).height()/4)*2/3,
      height: ($(this).height()*2/3),
      width: ($(this).width()*2/3)
    },"fast");
  })
  //$(".redBox").show(100);
  updateScore();
});

$("body").click(function() {
  if (overlapM($(".yelBox")))
  {
    console.log("YELLOW");

    $(".yelBox").animate({
      opacity: 0,
      left: "-="+$(".yelBox").width()/4,
      top: "-="+$(".yelBox").height()/4,
      height: ($(".yelBox").height()*1.5),
      width: ($(".yelBox").width()*1.5)
    },"fast");
    $(".yelBox").promise().done(function(){
      $(".yelBox").css({left: 50+Math.random()*(window.innerWidth-300), top: 50+Math.random()*(window.innerHeight-300)});
      $(".yelBox").animate({
        opacity: 1,
        left: "+="+($(this).width()/4)*2/3,
        top: "+="+($(this).height()/4)*2/3,
        height: ($(this).height()*2/3),
        width: ($(this).width()*2/3)
      },"fast");
    })
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
    $(".redBox").css({height: 200/(difficulty+1),width: 200/(difficulty+1)});
    $(".yelBox").css({height: 200/(difficulty+1),width: 200/(difficulty+1)});
  }

  if (overlapM($("#axisSel")))
  {
    axisIndex+=1;
    if (axisIndex > 2){
      axisIndex=0;
    }
    $("#axisSel").text(axisText[axisIndex]);

    if (axisIndex==0 || axisIndex==2)
    {
      $("#seperator").css({width: 2, height: innerHeight, top: 0, left: "50%"})
      $(".bluBox:nth-child(1)").css({left: "55%", top: "45%"});
      $(".bluBox:nth-child(3)").css({top: "60%", left: "5%"});
      $("#diffSel").css({top: "45%", left: "72%"});
      $("#timeSel").css({top: "60%", left: "22%"});
    }else if (axisIndex==1){
      $("#seperator").css({width: innerWidth, height: 2, top: innerHeight/2, left: 0})
      $(".bluBox:nth-child(1)").css({left: "5%", top: "75%"});
      $(".bluBox:nth-child(3)").css({top: "30%", left: "55%"});
      $("#diffSel").css({top: "75%", left: "21%"});
      $("#timeSel").css({top: "30%", left: "72%"});
    }
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
    $("#highscore").text("Highscore: "+highscore);
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
      if (score>highscore){
        highscore=score;
      }
      score=0;
      stateCheck();
    }
    $('.Timer').text("Timer: "+Math.round((start-new Date) / 1000));
    console.log(Math.round((start-new Date) / 1000));
    
  }
  
}, 1000);