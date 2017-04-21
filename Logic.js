
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

    //*** delay loader a bit (just to be seen): 
    $('.loader').delay(TIME_SET / 2).fadeTo(0, 1, function () {
        $('.loader').hide();
    });

    //*** catch mouse down on any card button to change the tranform and make the card spin:
    $('.clrBtn').bind("mousedown touchstart", (function () {
        $('#selectedCard').css("transform", "");
    }));

    //*** catch mouse up on any card button and make animation:
    $('.clrBtn').bind("mouseup touchend", (function () {
        // disable auto play:
        if (clicks == 0) {
            $('#autoPlay').prop('disabled', true).prop('title', 'auto play not allowed').prop('alt', 'auto play not allowed');
            $('#autoPlay').css('opacity', 0.7).css('cursor', 'not-allowed');
            clicks++;
        }
        $('#selectedCard').attr("src", "");
        $('#result').attr("src", "").hide();
        $('.card-container').show();
        card = cards[Math.floor(Math.random() * cards.length)];
        $('#selectedCard').attr("src", "images/cards/" + card);
        $('#selectedCard').css("visibility", "visible");
        $('#selectedCard').css("transform", "rotateY(360deg)");
        $('.clrBtn').prop('disabled', true);
    }));

    //*** catch mouse down of a card, change visibility and disable other card:
    $('#redBtn').bind("mousedown touchstart", (function () {
        $(this).attr("src", "images/Red_Selected.png");
        $('#blackBtn').attr('src', 'images/Black_disabled.png');
    }));

    $('#blackBtn').bind("mousedown touchstart", (function () {
        $('#blackBtn').attr("src", "images/Black_Selected.png");
        $('#redBtn').attr('src', 'images/Red_disabled.png');
    }));

    //*** catch mouse up of a card, start logic and show card changing animation:
    $('#redBtn').bind("mouseup touchend", (function () {
        GameLogic("red");
        // a manipulation of a fake fade to activate a function after a delay:
        $('#redBtn').delay(TIME_SET * 2).fadeTo(0, 1, function () {
            $('#redBtn').attr('src', 'images/Red_idle.png');
            $('#blackBtn').attr('src', 'images/Black_idle.png');
            $(".clrBtn").prop('disabled', false);
        });
    }));

    $('#blackBtn').bind("mouseup touchend", (function () {
        GameLogic("black");
        $('#blackBtn').delay(TIME_SET * 2).fadeTo(0, 1, function () {
            $('#blackBtn').attr('src', 'images/Black_idle.png');
            $('#redBtn').attr('src', 'images/Red_idle.png');
            $(".clrBtn").prop('disabled', false);
        });
    }));

    //*** hiding the help image:
    $('#hlpImg').on('click', function () {
        $(this).hide();
    });

    //*** show/hide help image (always show):
    $('#inf').on('click', function () {
        $('#hlpImg').toggle();
    });

    //*** a manipulation to fix image competability for all browsers:
    $(window).resize(function () {
        CheckSizeAndFix();
    });

    //*** auto play logic
    $('#autoPlay').on('click', function () {
        AutoPlay();

        //** a solution for automtic values climbing the steps meter (automatic winning):
        //AutoWin();        
    });

    //*** opening the rules button and show info:
    $('.show-hide-rules').on('click', function () {
        if ($('.rules-info').css('display') == 'none') {
            $('.show-hide-rules .plus-minus').html('[-]');
            $('.rules-info').slideDown();
        }
        else {
            $('.show-hide-rules .plus-minus').html('[+]');
            $('.rules-info').slideUp();
        }
    });

    //*** opening the terms & condition button and show info:
    $('.show-hide-terms').on('click', function () {
        if ($('.terms-info').css('display') == 'none') {
            $('.show-hide-terms .plus-minus').html('[-]');
            $('.terms-info').slideDown();
        }
        else {
            $('.show-hide-terms .plus-minus').html('[+]');
            $('.terms-info').slideUp();
        }
    });
});

//*** change images src in html via js for FF and Edge competability:
function CheckSizeAndFix() {
    if ($(window).width() < PC_MIN_WIDTH) {
        if ($('.main-img img').attr('src').includes('PC')) {
            $('.main-img img').attr('src', 'images/RED_or_BLACK_Mobile_bg.jpg');
            $('#hlpImg').attr('src', 'images/RED_or_BLACK_Mobile_Help.png');
            if (winCount > 1) {
                $('#level').attr('src', "images/RED_or_BLACK_Mobile_step_0" + winCount + ".png");
            }
        }
    }
    else {
        if ($('.main-img img').attr('src').includes('Mobile')) {
            $('.main-img img').attr('src', 'images/RED_or_BLACK_PC_bg.jpg');
            $('#hlpImg').attr('src', 'images/RED_or_BLACK_PC_Help.png');
            if (winCount > 1) {
                $('#level').attr('src', "images/RED_or_BLACK_PC_step_0" + winCount + ".png");
            }
        }
    }
}

//*** automating the card button choosing:
function AutoPlay() {
    // picking between red or black randomaly:
    var colors = ["red", "black"];
    var color = colors[Math.floor(Math.random() * colors.length)];
    color += 'Btn';
    // triggering the click on the card we picked:
    $('#' + color).trigger('mousedown');
    $('#' + color).trigger('mouseup');
    // disabling the auto play button until the auto play logic and animation has done: 
    $('#autoPlay').delay(TIME_SET * 2).fadeTo(0, 1, function () {
        $(this).prop('disabled', false).prop('title', 'auto play').prop('alt', 'auto play');
        $(this).css('opacity', 'initial').css('cursor', 'auto');
    });
    clicks--;
}

//*** understanding the guess and acting accordingly:
function GameLogic(color) {
    // guess right:
    if (card.toLowerCase().includes(color)) {
        winCount++;
        $('#result').attr("src", "images/Card_V.png");
        $('#result').fadeIn(TIME_SET);
        $('.card-container').delay(TIME_SET).fadeOut(TIME_SET);
        HandleWins(winCount);
    }
        // guess wrong:
    else {
        lives--;
        $('#result').attr("src", "images/Card_X.png");
        $('#result').fadeIn(TIME_SET);
        $('.card-container').delay(TIME_SET).fadeOut(TIME_SET);
        HandleLives();
    }
}

function HandleWins(wins) {
    switch (wins) {
        case 2:
        case 3:
        case 4:
        case 5:
            //change the level image for all devices:
            $('#level').delay(TIME_SET).fadeTo(0, 1, function () {
                $(window).width() < PC_MIN_WIDTH ?
                $(this).attr("src", "images/RED_or_BLACK_Mobile_step_0" + wins + ".png") :
                $(this).attr("src", "images/RED_or_BLACK_PC_step_0" + wins + ".png");
                $(this).css('display', 'inline-table')
            }).fadeIn(TIME_SET, function () {
                // if its the last level, show winning modal:
                if ($('#level').attr('src').includes(GAME_LEVELS)) {
                    $('.end-game-modal div').html
                        ('CONGRATULATIONS!!<br /><input id="plyBtn" onclick="StartNewGame()" type="button" name="name" value="Play again" />');
                    $('.end-game-modal').delay(TIME_SET).fadeIn(TIME_SET / 2);
                }
            });
            break;
        default:
            break;
    }
}

//*** deal with the lives image and loose modal:
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
            $('.end-game-modal').delay(TIME_SET * 2).fadeIn(TIME_SET / 2);
        default:
            break;
    }
}

//*** reset all settings and variables to start a new and clean game:
function StartNewGame() {
    winCount = 1;
    lives = 2;
    clicks = 0;
    $('#lives').attr('src', 'images/lives_02.png');
    $(".clrBtn").prop('disabled', false);
    $('#inf').prop('disabled', false);
    $('#blackBtn').attr('src', 'images/Black_idle.png');
    $('#redBtn').attr('src', 'images/Red_idle.png');
    $('#level').attr("src", "").hide();
    $('#autoPlay').css('opacity', 'initial').css('cursor', 'auto');
    $('#autoPlay').prop('disabled', false).prop('title', 'auto play').prop('alt', 'auto play');
    $('.end-game-modal').hide();
}

// a none usable function for another logic for auto play:
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