const buttonColours = ["red","blue","green","yellow"];
var start = true;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var HighScore = 0;

$(".btn").on("click",function (){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
    userClickedPattern = [];
    console.log(userClickedPattern);
    console.log(gamePattern);
    level++;
    HighScore = Math.max(HighScore,level-1);
    $("h1").text(`Level : ${level}`);
    $("span").text(`${HighScore}`);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        playSound(wrong);
    }
}
function startOver()
{
    level = 0;
    gamePattern = [];
    start = true;
}

function playSound(name){
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.muted = false;
    audio.play();
}

function animatePress(currentColour)
{
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(()=>{
        $(`#${currentColour}`).removeClass("pressed");
    },100);
}

$("body").on("keydown",()=>{
    if(start) {
        $("span").text(`${HighScore}`);
        start = false;
        $("h1").text(`Level : ${level}`);
        nextSequence();
    }
   
});


