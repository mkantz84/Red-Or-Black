const GAME_LEVELS = 5;
const TIME_SET = 1000;
const PC_MIN_WIDTH = 480;

var clicks = 0;
var card;
var winCount = 1;
var lives = 2;
var cards =
    ["Card_Black_01.png", "Card_Black_02.png", "Card_Black_03.png",
     "Card_Black_04.png", "Card_Black_05.png", "Card_Black_06.png",
     "Card_Red_01.png", "Card_Red_02.png", "Card_Red_03.png",
     "Card_Red_04.png", "Card_Red_05.png", "Card_Red_06.png"];

$(document).ready(function () {
    CheckSizeAndFix();
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
        $('.card-container').show();
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
        $('#redBtn').delay(TIME_SET * 2).fadeTo(0, 1, function () {
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
        $('#blackBtn').delay(TIME_SET * 2).fadeTo(0, 1, function () {
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

    $(window).resize(function () {
        CheckSizeAndFix();
    });

    $('#autoPlay').on('click', function () {
        AutoPlay();

        //*** a solution for automtic values climbing the steps meter (automatic winning):
        //AutoWin();        
    });

    $('.show-hide-rules').on('click', function () {
        if ($('.rules-info').css('display') == 'none') {
            $('.show-hide-rules .plus-minus').html('[-]');
            $('.rules-info').show();
        }
        else {
            $('.show-hide-rules .plus-minus').html('[+]');
            $('.rules-info').slideUp();
        }
        window.scrollTo(0, document.body.clientHeight);
    });

    $('.show-hide-terms').on('click', function () {
        if ($('.terms-info').css('display') == 'none') {
            $('.show-hide-terms .plus-minus').html('[-]');
            $('.terms-info').show();
        }
        else {
            $('.show-hide-terms .plus-minus').html('[+]');
            $('.terms-info').slideUp();
        }
        window.scrollTo(0, document.body.clientHeight);
    });
});

//*** a manipulation to fix competability for all browsers:
function CheckSizeAndFix() {
    if ($(window).width() < PC_MIN_WIDTH) {
        if ($('.main-img img').attr('src').includes('PC')) {
            $('.main-img img').attr('src', 'images/RED_or_BLACK_Mobile_bg.jpg');
            $('#hlpImg').attr('src', 'images/RED_or_BLACK_Mobile_Help.png');
            $('#level').attr('src', "images/RED_or_BLACK_Mobile_step_0" + winCount + ".png");
        }
    }
    else {
        if ($('.main-img img').attr('src').includes('Mobile')) {
            $('.main-img img').attr('src', 'images/RED_or_BLACK_PC_bg.jpg');
            $('#hlpImg').attr('src', 'images/RED_or_BLACK_PC_Help.png');
            $('#level').attr('src', "images/RED_or_BLACK_PC_step_0" + winCount + ".png");
        }
    }
}

function AutoPlay() {
    var colors = ["red", "black"];
    var color = colors[Math.floor(Math.random() * colors.length)];
    color += 'Btn';
    $('#' + color).trigger('mousedown');
    $('#' + color).trigger('mouseup');
    $('#autoPlay').delay(TIME_SET * 2).fadeTo(0, 1, function () {
        $(this).prop('disabled', false);
        $(this).css('opacity', 'initial');
    });
    clicks--;
}

function GameLogic(color) {
    if (card.toLowerCase().includes(color)) {
        winCount++;
        $('#result').attr("src", "images/Card_V.png");
        $('#result').fadeIn(800);
        $('.card-container').delay(TIME_SET).fadeOut(800);
        HandleWins(winCount);
    }
    else {
        lives--;
        $('#result').attr("src", "images/Card_X.png");
        $('#result').fadeIn(800);
        $('.card-container').delay(TIME_SET).fadeOut(800);
        HandleLives();
    }
}

function HandleWins(wins) {
    switch (wins) {
        case 2:
        case 3:
        case 4:
        case 5:
            $('#level').delay(TIME_SET).fadeTo(0, 1, function () {
                $(window).width() < PC_MIN_WIDTH ?
                $(this).attr("src", "images/RED_or_BLACK_Mobile_step_0" + wins + ".png") :
                $(this).attr("src", "images/RED_or_BLACK_PC_step_0" + wins + ".png");
                $(this).css('display', 'inline-table')
            }).fadeIn(TIME_SET, function () {
                if ($('#level').attr('src').includes('5')) {
                    $('.end-game-modal div').html
                        ('CONGRATULATIONS!!<br /><input id="plyBtn" onclick="StartNewGame()" type="button" name="name" value="Play again" />');
                    $('.end-game-modal').fadeIn(500);
                }
            });
            break;
        default:
            break;
    }
}

function HandleLives() {
    switch (lives) {
        case 1:
            $('#lives').delay(TIME_SET).fadeTo(0, 1, function () {
                $('#lives').attr('src', 'images/lives_01.png');
            });
            break;
        case 0:
            $('#lives').delay(TIME_SET).fadeTo(0, 1, function () {
                $('#lives').attr('src', 'images/lives_00.png');
            });
            $('.end-game-modal div').html
                ('GAME OVER...<br /><input id="plyBtn" onclick="StartNewGame()" type="button" name="name" value="Play again" />');
            $('.end-game-modal').delay(TIME_SET).fadeIn(500);


        default:
            break;
    }
}

function StartNewGame() {
    winCount = 1;
    lives = 2;
    clicks = 0;
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

function AutoWin() {
    $('#inf').prop('disabled', true);
    $('#autoPlay').prop('disabled', true);
    $('#autoPlay').css('opacity', 0.7);
    $('.clrBtn').prop('disabled', true);
    $('#redBtn').attr('src', 'images/Red_disabled.png');
    $('#blackBtn').attr('src', 'images/Black_disabled.png');
    for (var i = 0; i < GAME_LEVELS - 1; i++) {
        setTimeout(HandleWins(++winCount), TIME_SET * 2);
    }
}