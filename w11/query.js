const theButton = $("#myButton").on("click", clickFunc);
let x;
let y;

$( document ).on( "mousemove", function( e ) {
  x = e.pageX;
  y = e.pageY;
  //console.log(x,y)
  $("#redCir").css({top: e.pageY-10, left: e.pageX-12})

  $("#fMouse").css({top: e.pageY, right: e.pageX})
  $("#yelCir").css({top: e.pageY-10, right: e.pageX-12})
  
  //$("body").css('cursor', 'none');
  //$( "#log" ).text( "pageX: " + e.pageX + ", pageY: " + e.pageY );
});

$(".redBox").click(function() {
  console.log("RED");
  $(".redBox").css({left: Math.random()*(window.innerWidth-200), top: Math.random()*(window.innerHeight-200)});
});

$("body").click(function() {
  if (overlapM($(".yelBox")))
  {
    console.log("YELLOW");
    $(".yelBox").css({left: Math.random()*(window.innerWidth-200), top: Math.random()*(window.innerHeight-200)});
  }
  //console.log(overlapM($(".yelBox")));
});

function overlapM(yBox) { //From: https://stackoverflow.com/questions/14012766/detecting-whether-two-divs-overlap
  let fx = parseInt($("#fMouse").css("left").replace(/px/,""))+9;
  let fy = parseInt($("#fMouse").css("top").replace(/px/,""));
  let bx1 = parseInt(yBox.css("left").replace(/px/,"")); //From: https://stackoverflow.com/questions/9333036/add-javascript-pixel-values
  let by1 = parseInt(yBox.css("top").replace(/px/,""));
  let bx2 = parseInt(yBox.css("left").replace(/px/,"")) + parseInt(yBox.css("width").replace(/px/,""));
  let by2 = parseInt(yBox.css("top").replace(/px/,"")) + parseInt(yBox.css("height").replace(/px/,""));
  if ((fx > bx1 && fx < bx2) && (fy > by1 && fy < by2)) {
    return true;
  }else{
    return false;
  }
}

function clickFunc(){
  console.log(event.pageX);
}