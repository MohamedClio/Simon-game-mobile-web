var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var timeoutInMilliSec = 100;
var didGameStart = false;
var lvlNumber = 0;
var score = 1;
///////////On Any key press////////////////////////
// $("body").on("keypress", function () {
//   if (!didGameStart) {
//     nextSequence();
//     didGameStart = true;
//   }
// });
$("button").on("click", function () {
  // $("button").addClass("pressed");
  // setTimeout(function () {
  //   $("button").removeClass("pressed");
  // }, timeoutInMilliSec);
  if (!didGameStart) {
    $("button").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
    setTimeout(function () {
      nextSequence();
      didGameStart = true;
    }, 500);
  }
});
/////////////////Next Sequence function///////////////
function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

  lvlNumber++;
  $("#title-lvl").text(`level ${lvlNumber}`);

  playSound(randomChosenColor);
}

//////////////////Click button///////////////////
$(`.btn`).on("click", function () {
  var userChosenColor = this.getAttribute("id");
  //var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
  if (!didGameStart) {
    gameOver();
  }
});

//////////////Animating buttons/////////////////////
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, timeoutInMilliSec);
}

////////////////checking answer logic//////////////
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        if (score < lvlNumber) {
          score++;
          $("#score").text(`score: ${score}`);
        }
      }, 1000);
    }
  } else {
    gameOver();
  }
}
function gameOver() {
  $("#title-lvl").text("Game Over, Press Start Game button to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, timeoutInMilliSec);
  playSound("wrong");
  startOver();
  $("button").fadeIn(100);
}
///////////////play sound function////////////////////
function playSound(colorSound) {
  var buttonSound = new Audio(`./sounds/${colorSound}.mp3`);
  buttonSound.play();
}
function startOver() {
  gamePattern = [];
  didGameStart = false;
  lvlNumber = 0;
}
