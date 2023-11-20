// Inisialisasi variabel
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Mulai permainan ketika tombol ditekan
$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

// Fungsi ketika tombol ditekan
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// Fungsi untuk menghasilkan urutan selanjutnya
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

// Fungsi untuk memutar suara
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Fungsi untuk animasi tekanan tombol
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Fungsi untuk memeriksa jawaban
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (gamePattern.length === userClickedPattern.length) {
      $("#level-title").text("Level " + level + " - Correct!");
      setTimeout(function() {
        nextSequence();
      }, 1000); 
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over!, press any key to Restart");
    startOver();
  }
}

// Fungsi untuk memulai ulang permainan
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
