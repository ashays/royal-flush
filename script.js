var cards = [0, 0, 0, 0, 0, 0, 0];
var opponents = 2;
var randomAttempts = 10000;

var tableCards;
var selector;
var selectedCard = 0;

$(document).ready(function (){
	var pattern = Trianglify({
	  height: $('body').height(),
	  width: $('body').width(),
	  x_colors: "BrBG",
	  cell_size: 40});
	$(".background").append(pattern.canvas());
	tableCards = $(".table ul");
	tableCards.itemslide();
	createSelector();
	refresh();
	$('#selector').fadeOut();

	$(".selector .card").click(function() {
		if (calculator != undefined) {
			calculator.terminate();
			calculator = undefined;	
			console.log("calculator terminated");
		}
		cards[selectedCard] = selector.getActiveIndex();
		refresh();
		$('#selector').fadeOut();
		startComputation();
	});

	$("#cancel-select-btn").click(function() {
		$('#selector').fadeOut();
		$('.info').css('height', 80);
	});

	$(".selectableCard .card").click(function(event) {
		console.log("clicked a card");
		if ($(event.target).hasClass('card')) {
			selectedCard = $(event.target).attr('data-index');
		} else {
			selectedCard = $(event.target).parents('.card').attr('data-index');
		}
		console.log(selectedCard);
		$('.info').css('height', 0);
		$("#selector").fadeIn(); 
	});

	// tableCards.on('changePos', function(e) {
	// 	if (selectedCard != tableCards.getActiveIndex()) {
	// 		selectedCard = tableCards.getActiveIndex();
	// 		console.log("moved slider " + selectedCard);
	// 		$('.info').css('height', 0);
	// 		$("#selector").fadeIn(); 			
	// 	}
	// });

	$(".info").click(function() {
		if ($('.info').css('height') == "320px") {
			$('.info').css('height', 80);
		} else {
			$('.info').css('height', 320);
		}
	});

});

var calculator;

function startComputation() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(calculator) == "undefined") {
            calculator = new Worker("computation.js");
            calculator.postMessage(cards);
            console.log("calculator created");
        }
        calculator.onmessage = function(event) {
        	updateProbs(event.data);
        	$('.info').css('height', 80);
        };
    } else {
        document.getElementById("winPercents").innerHTML = "Sorry! No Web Worker support.";
    }
}

function refresh() {
	for (var i = 0; i < 7; i++) {
		num = cards[i];
		$($(".card")[i]).attr('data-card', num);
		if (num == 0) {
			$($(".card")[i]).removeClass('black red').html('<div class="logo">Royal Flush</div>');
		}
		else if (num <= 13 || (num > 26 && num <= 39)) {
			$($(".card")[i]).addClass('black').removeClass('red');
			$($(".card")[i]).html('<img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png"><span class="cardValue">' + getRank(cards[i]) + '</span><img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png">');

		} else {
			$($(".card")[i]).addClass('red').removeClass('black');
			$($(".card")[i]).html('<img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png"><span class="cardValue">' + getRank(cards[i]) + '</span><img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png">');
		}
	}
}

function createSelector() {
	$(".selector ul").append('<li><div class="card"><div class="logo">Royal Flush</div></div></li>');
	for (var i = 1; i <= 52; i++) {
		if (i <= 13 || (i > 26 && i <= 39)) {
			$(".selector ul").append('<li><div class="card black"><img class="suit" src="img/suits/' + getSuit(i) + '.png"><span class="cardValue">' + getRank(i) + '</span><img class="suit" src="img/suits/' + getSuit(i) + '.png"></div></li>');
		}
		else {
			$(".selector ul").append('<li><div class="card red"><img class="suit" src="img/suits/' + getSuit(i) + '.png"><span class="cardValue">' + getRank(i) + '</span><img class="suit" src="img/suits/' + getSuit(i) + '.png"></div></li>');
		}
	}
	selector = $(".selector ul");
	selector.itemslide({
		swipe_sensitivity: 400
	});
}

function getSuit(card) {
	if (card <= 13) {
		return "club";
	} else if (card <= 26) {
		return "diamond";
	} else if (card <= 39) {
		return "spade";
	} else if (card <= 52) {
		return "heart";
	}
}

function getRank(card) {
	num = card % 13;
	if (num > 1 && num <= 10) {
		return num;
	} else {
		if (num == 1) {
			return "A"
		}
		else if (num == 11) {
			return "J"
		}
		else if (num == 12) {
			return "Q"
		}
		else if (num == 0) {
			return "K"
		}
	}
}

// Prints probabilities to status page
function updateProbs(counters) {
	$("#royal-flush").text(formatNumber(counters[3]));
	$("#straight-flush").text(formatNumber(counters[4]));
	$("#four-of-a-kind").text(formatNumber(counters[5]));
	$("#full-house").text(formatNumber(counters[6]));
	$("#flush").text(formatNumber(counters[7]));
	$("#straight").text(formatNumber(counters[8]));
	$("#three-of-a-kind").text(formatNumber(counters[9]));
	$("#two-pair").text(formatNumber(counters[10]));
	$("#pair").text(formatNumber(counters[11]));
	$("#high-card").text(formatNumber(counters[12]));
	$("#you-win").text(formatNumber(counters[0]));
	$("#opp-win").text(formatNumber(counters[1]));
	$("#no-win").text(formatNumber(counters[2]));
	console.log("probabilities updated");
}

function formatNumber(counter) {
	var prob;
	prob = (counter / randomAttempts) * 100;
	if (prob > 0 && prob < 0.1) {
		prob = "< 0.1";
		return prob;
	}
	prob = Math.floor( 10 * (counter / randomAttempts) * 100) / 10;
	return prob;
	// takes in a number (like royalFlush) and returns the formatted percent chance
	// basically divides by the randomAttempts, multiplies by 100, and rounds it to the nearest tenth
	// also, if the final number is 0 but the counter isn't 0
	// (so it's like between 0 and .1) return "<.1" or something?
}