let level = 1
let gameOn = false
let wrong = false
blocIds = ["green", "yellow", "red", "blue"]
let currentPattern = []
let currentBlockId
let index = 0

$(".block").on("click", function(event){
    currentBlockId = event.target.id
    if (gameOn === true)
    {
        let lastBloc = currentPattern[index++]
        if(lastBloc !== currentBlockId)
        {
            wrong = true
            gameOn = false
            make_sound(currentBlockId)
        }
        else{
            make_sound(currentBlockId)
        }
        console.log("Index: "+index)
        if(wrong !== true && index === currentPattern.length){

            //ToDo: nextLevel Function 
            level++
            $("#titel").text("Level "+level)   
            //Select random bloc
            let randomBlock = Math.floor(Math.random()*4)
            setTimeout(make_sound, 800, blocIds[randomBlock])
            currentPattern.push(blocIds[randomBlock])
            index = 0
            console.log("Current Pattern: "+currentPattern)
        }
    }
    else {
        make_sound(currentBlockId)
    }
  
}) 

function make_sound(elementId)
{
    if (gameOn === true)
    {
        new Audio("./sounds/"+elementId+".mp3").play(); 
        $("#"+elementId).css("border-color", "white")
        setTimeout(() => {
        $("#"+elementId).css("border-color", "black")
    }, 200);
    }

    if(wrong === true || gameOn === false){
        new Audio("./sounds/wrong.mp3").play();
        $("#titel").text("Game Over, Press Any Key to Restart")
        $("body").css("background-color", "red")
        setTimeout(() => {
            $("body").css("background-color", "rgb(9, 30, 61)")
        }, 200);

        //ToDo: Start function
        $(document).on( "keydown", startFunction)
    }
}


$(document).on( "keydown",startFunction)

function startFunction() {
    gameOn = true
    level = 1
    index = 0
    currentPattern = []
    wrong = false
    $("#titel").text("Level "+level)   

    //Select random bloc
    let randomBlock = Math.floor(Math.random()*4)
    make_sound(blocIds[randomBlock]); 
    currentPattern.push(blocIds[randomBlock])
    $(document).off("keydown")
}