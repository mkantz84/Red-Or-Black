// JavaScript source code
var clicks = 0;
var card;
var winCount = 1;
var lives = 2;
const gameLevels = 5;
var cards =
    ["Card_Black_01.png", "Card_Black_02.png", "Card_Black_03.png",
     "Card_Black_04.png", "Card_Black_05.png", "Card_Black_06.png",
     "Card_Red_01.png", "Card_Red_02.png", "Card_Red_03.png",
     "Card_Red_04.png", "Card_Red_05.png", "Card_Red_06.png"];

$(document).ready(function () {
    $('.loader').delay(500).fadeTo(0, 1, function () {
        $('.loader').hide();
    });
    $('.clrBtn').bind("mouseup touchend", (function () {
        if (clicks == 0) {
            $('#autoPlay').prop('disabled', true);
            $('#autoPlay').css('opacity', 0.7);
            clicks++;
        }
        $('#selectedCard').attr("src", "");
        $('#result').attr("src", "").hide();
        $('#card_container').show();
        card = cards[Math.floor(Math.random() * cards.length)];
        $('#selectedCard').attr("src", "images/cards/" + card);
        $('#selectedCard').css("visibility", "visible");
        $('#selectedCard').css("transform", "rotateY(360deg)");
        $(".clrBtn").prop('disabled', true);
    }));

    $('.clrBtn').bind("mousedown touchstart", (function () {
        $('#selectedCard').css("transform", "");
    }));

    $('#redBtn').bind("mousedown touchstart", (function () {
        $('#redBtn').attr("src", "images/Red_Selected.png");
        $('#blackBtn').attr('src', 'images/Black_disabled.png');
    }));

    $('#redBtn').bind("mouseup touchend", (function () {
        GameLogic("red");
        $('#redBtn').delay(2000).fadeTo(0, 1, function () {
            $('#redBtn').attr('src', 'images/Red_idle.png');
            $('#blackBtn').attr('src', 'images/Black_idle.png');
            $(".clrBtn").prop('disabled', false);
        });
    }));

    $('#blackBtn').bind("mousedown touchstart", (function () {
        $('#blackBtn').attr("src", "images/Black_Selected.png");
        $('#redBtn').attr('src', 'images/Red_disabled.png');
    }));

    $('#blackBtn').bind("mouseup touchend", (function () {
        GameLogic("black");
        $('#blackBtn').delay(2000).fadeTo(0, 1, function () {
            $('#blackBtn').attr('src', 'images/Black_idle.png');
            $('#redBtn').attr('src', 'images/Red_idle.png');
            $(".clrBtn").prop('disabled', false);
        });
    }));

    $('#hlpImg').on('click', function () {
        $(this).hide();
    });

    $('#inf').on('click', function () {
        $('#hlpImg').toggle();
    });

    $('#autoPlay').on('click', function () {
        $('#inf').prop('disabled', true);
        $('#autoPlay').prop('disabled', true);
        $('#autoPlay').css('opacity', 0.7);
        $('.clrBtn').prop('disabled', true);
        $('#redBtn').attr('src', 'images/Red_disabled.png');
        $('#blackBtn').attr('src', 'images/Black_disabled.png');
        for (var i = 0; i < gameLevels - 1; i++) {
            setTimeout(HandleWins(++winCount), 2000);
        }
    });
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
    HandleWins(winCount);
    console.log("lives = " + lives);
}

function HandleWins(wins) {
    switch (wins) {
        case 2:
        case 3:
        case 4:
        case 5:
            $('#level').delay(1000).fadeTo(0, 1, function () {
                $(window).width() < 480 ?
                $(this).attr("src", "images/RED_or_BLACK_Mobile_step_0" + wins + ".png") :
                $(this).attr("src", "images/RED_or_BLACK_PC_step_0" + wins + ".png");
            }).fadeIn(1000, function () {
                if ($('#level').attr('src').includes('5')) {
                    $('#win-lose-modal').html
                        ('CONGRATULATIONS!!<br /><input id="plyBtn" onclick="StartNewGame()" type="button" name="name" value="Play again" />');
                    $('.end-game-modal').fadeIn(500);
                }
            });
            break;
        default:
            lives--;
            $('#level').delay(1000).fadeOut(800);
            HandleLives();
            break;
    }
}

function HandleLives() {
    switch (lives) {
        case 1:
            $('#lives').delay(1000).fadeTo(0, 1, function () {
                $('#lives').attr('src', 'images/lives_01.png');
            });
            break;
        case 0:
            $('#lives').delay(1000).fadeTo(0, 1, function () {
                $('#lives').attr('src', 'images/lives_00.png');
            });
            $('#win-lose-modal').html
                ('GAME OVER...<br /><input id="plyBtn" onclick="StartNewGame()" type="button" name="name" value="Play again" />');
            $('.end-game-modal').delay(1000).fadeIn(500);
            winCount = 1;
            lives = 2;
        default:
            break;
    }
}

function StartNewGame() {
    winCount = 1;
    $('#lives').attr('src', 'images/lives_02.png');
    $(".clrBtn").prop('disabled', false);
    $('#inf').prop('disabled', false);
    $('#autoPlay').prop('disabled', false);
    $('#blackBtn').attr('src', 'images/Black_idle.png');
    $('#redBtn').attr('src', 'images/Red_idle.png');
    $('#level').attr("src", "").hide();
    $('#autoPlay').css('opacity', 'initial');
    $('.end-game-modal').hide();
}