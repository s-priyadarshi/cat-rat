var x = 0;
var y = 0;
var score = 0;
var highScore = 0;
var time = 120;
var timer;
var ratTimer;
var inProcess;
var increment;
var gameOver = false;
var speed = 10;
var ease = 5000;
$("#highscore").text(highScore);
function start() {
  /* Rat Movement */
  $("html").focus();
  ratTimer = setInterval(function(){
    $('#rat').css({"left": Math.random() * 470 , "top": Math.random() * 435});
    $('#rat').css("display", "block");
  }, ease);

  if(!inProcess) {
    /* Increment Score */
    increment = setInterval(function(){
      $("#score").text(score);
      if(eaten(cat, rat)){
        score += 1;
        $('tongue').css("display", "block");
        setTimeout(function() {
          $('tongue').css("display", "none");
        }, 200);
        $('#rat').css("display", "none");
        if(score == 5) {
          clearInterval(ratTimer);
          inProcess = true;
          ease -= 1000;
          speed += 10;
          start(ease);
        }
        if(score == 10) {
          clearInterval(ratTimer);
          inProcess = true;
          ease -= 1000;
          speed += 10;
          start(ease);
        }
        if(score == 20) {
          clearInterval(ratTimer);
          inProcess = true;
          ease -= 500;
          speed += 10;
          start(ease);
        }
        if(score == 30) {
          clearInterval(ratTimer);
          inProcess = true;
          ease -= 500;
          speed += 10;
          start(ease);
        }
      }
    }, 0);  
    timer = setInterval(function() { 
      time -= 1;
      if(time === 0) {
        $("#result").text("Game over!");
        $('#result').css("display", "block");
        $("#result").css("color", "red");
        clearInterval(timer);
        clearInterval(ratTimer);
        clearInterval(increment);
        if(score > highScore) {
          highScore = score;
        }
        $("#highscore").text(highScore);

        gameOver = true;
      }
      $("#time").text(time);
    }, 1000);
    $("#start").prop('disabled', true);
    $("#reset").prop('disabled', false);
    inProcess = true;
  }
}
function reset() {
  $("#time").text("2:00");
  $("#reset").prop('disabled', true);
  $("#start").prop('disabled', false);
  clearInterval(timer);
  clearInterval(ratTimer);
  clearInterval(increment);
  time = 120;
  score = 0;
  ease = 5000;
  speed = 10; 
  x = 0;
  y = 0;
  inProcess = false;
  gameOver = false;
  $("#cat").css("background-color", "grey");
  $('#cat').css({"left": 0 , "top": 0});
  $('#rat').css("display", "none");
  $('#result').css("display", "none");
  $("#score").text(score);
}

$("html").keydown(function(event){
  if(!inProcess) {
    start();
  }
  if(!gameOver) {
    $("#cat").css("background-color", "rgb(126, 141, 255)");
    if(event.which == "39") {
      if(x>=470) {
        x = 0;
      } else {
        x += speed; 
      }
      $("#cat").css({"left": x}); 
      $("p").css("border-radius", "0px 50% 50% 0px"); 
    }
    if(event.which == "37") {
      if(x<0) {
        x = 470;
      } else {
        x -= speed; 
      }      
      $("#cat").css({"left": x});
      $("p").css("border-radius", "50% 0px 0% 50%");
    }
    if(event.which == "40") {
      if(y>470) {
        y = 0;
      } else {
        y += speed; 
      }  
      $("#cat").css({"top": y});
      $("p").css("border-radius", "0% 0% 50% 50%"); 
    }
    if(event.which == "38") {
      if(y<0) {
        y = 470;
      } else {
        y -= speed; 
      }
      $("#cat").css({"top": y});
      $("p").css("border-radius", "50% 50% 0% 0%"); 
    }
  }
});


function eaten(el1, el2) {
  el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
  el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
  el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
  el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

  return !((el1.offsetBottom < el2.offsetTop) ||
           (el1.offsetTop > el2.offsetBottom) ||
           (el1.offsetRight < el2.offsetLeft) ||
           (el1.offsetLeft > el2.offsetRight))
}