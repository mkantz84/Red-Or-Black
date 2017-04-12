// JavaScript source code
var card;
var winCount = 1;
var lives = 2;
var cards =
    ["Card_Black_01.png", "Card_Black_02.png", "Card_Black_03.png",
     "Card_Black_04.png", "Card_Black_05.png", "Card_Black_06.png",
     "Card_Red_01.png", "Card_Red_02.png", "Card_Red_03.png",
     "Card_Red_04.png", "Card_Red_05.png", "Card_Red_06.png"];

$(document).ready(function () {
    $('.clrBtn').on("click", function () {
        $('#selectedCard').attr("src", "");
        $('#result').attr("src", "").hide();
        $('#card_container').show();
        card = cards[Math.floor(Math.random() * cards.length)];
        $('#selectedCard').attr("src", "images/cards/" + card);
        $('#selectedCard').css("visibility", "visible");
    });
    $('#redBtn').on("click", function () {
        GameLogic("red");
    });
    $('#blackBtn').on("click", function () {
        GameLogic("black");
    });


    $('.clrBtn').bind("mouseup touchend", (function () {
        $('#selectedCard').css("transform", "rotateY(360deg)");
    }));
    $('.clrBtn').bind("mousedown touchstart", (function () {
        $('#selectedCard').css("transform", "");
    }));
});

function GameLogic(color) {
    if (card.toLowerCase().includes(color)) {
        winCount++;
        $('#result').attr("src", "images/Card_V.png");
        $('#result').fadeIn(800);
        $('#card_container').delay(1000).fadeOut(800);
    }
    else {
        winCount = 1;
        $('#result').attr("src", "images/Card_X.png");
        $('#result').fadeIn(800);
        $('#card_container').delay(1000).fadeOut(800);
    }
    console.clear();
    console.log("wining = " + (winCount - 1));
    HandleWins();
    console.log("lives = " + lives);
}

function HandleWins() {
    switch (winCount) {
        case 2:
            $(window).width() < 480 ?
            $('#level').attr("src", "images/RED_or_BLACK_Mobile_step_02.png") :
            $('#level').attr("src", "images/RED_or_BLACK_PC_step_02.png");
            $('#level').delay(1000).fadeIn(800);
            break;
        case 3:
            $('#level').delay(1000).fadeTo(0, 1, function () {
                $(window).width() < 480 ?
                $('#level').attr("src", "images/RED_or_BLACK_Mobile_step_03.png") :
                $('#level').attr("src", "images/RED_or_BLACK_PC_step_03.png")
            }).fadeTo(800, 1);
            break;
        case 4:
            $('#level').delay(1000).fadeTo(0, 1, function () {
                $(window).width() < 480 ?
                $('#level').attr("src", "images/RED_or_BLACK_Mobile_step_04.png") :
                $('#level').attr("src", "images/RED_or_BLACK_PC_step_04.png");
            }).fadeTo(800, 1);
            break;
        case 5:
            $('#level').delay(1000).fadeTo(0, 1, function () {
                $(window).width() < 480 ?
                $('#level').attr("src", "images/RED_or_BLACK_Mobile_step_05.png") :
                $('#level').attr("src", "images/RED_or_BLACK_PC_step_05.png");
            }).fadeTo(800, 1);
            //todo: show winning
            break;
        default:
            lives--;
            //$('#level').attr("src", "").hide();
            $('#level').delay(1000).fadeOut(800);
            //todo: show lives
            HandleLives();
            break;
    }
}

function HandleLives() {
    switch (lives) {
        case 1:
            $('#lives').delay(1000).fadeTo(0,1,  function () {
                $('#lives').attr('src', 'images/lives_01.png');
            });
            break;
        case 0:
            $('#lives').delay(1000).fadeTo(0, 1, function () {
                $('#lives').attr('src', 'images/lives_00.png');
            });
            //todo: show game over
            winCount = 1;
            lives = 2;
        default:
            break;
    }
}