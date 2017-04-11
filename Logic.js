// JavaScript source code
var clr;
var winCount = 1;
var lives = 2;

$(document).ready(function () {
    $('.clrBtn').on("click", function () {
        clr = Math.round(Math.random());
        clr == 0 ? clr = 'red' : clr = 'black';
        $('#clr').val(clr);
        //todo: show card
    });
    $('#redBtn').on("click", function () {
        GameLogic("red");
    });
    $('#blackBtn').on("click", function () {
        GameLogic("black");
    });
});

function GameLogic(color) {
    if (clr == color) {
        winCount++;
    }
    else {
        winCount = 1;
    }
    console.clear();
    console.log("wining = " + (winCount - 1));
    HandleWins();
    console.log("lives = " + lives);
}

function HandleWins() {
    switch (winCount) {
        case 2:
            //todo: go to step 2
            break;
        case 3:
            //todo: show step 3
            break;
        case 4:
            //todo: show step 4
            break;
        case 5:
            //todo: show step 5
            //todo: show winning
            break;
        default:
            lives--;
            //todo: show starting point
            //todo: show lives
            HandleLives();
            break;
    }
}

function HandleLives() {
    switch (lives) {
        case 1:
            //todo: show lives 1
            break;
        case 0:
            //todo: show lives 0
            //todo: show game over
            winCount = 1;
            lives = 2;
        default:
            break;
    }
}