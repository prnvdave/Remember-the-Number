
var buttonname = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosennumber = $(this).attr("id");
  userClickedPattern.push(userChosennumber);

  playSound(userChosennumber);
  animatePress(userChosennumber);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 9);
  var randomChosennumber = buttonname[randomNumber];
  gamePattern.push(randomChosennumber);

  $("#" + randomChosennumber).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosennumber);
}

function animatePress(currentnumber) {
  $("#" + currentnumber).addClass("pressed");
  setTimeout(function () {
    $("#" + currentnumber).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
