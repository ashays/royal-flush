
var selector;
var selectedCard; 


$(document).ready(function (){
	var pattern = Trianglify({
	  height: $('body').height(),
	  width: $('body').width(),
	  //x_colors: "Spectral",
	  cell_size: 40});
	$(".background").append(pattern.canvas());
	tableCards = $(".table ul");
	tableCards.itemslide();
	createSelector();

$("#select-card-btn").click(function() {
	cards[selectedCard] = selector.getActiveIndex();
	refresh();
	makeCombos();
	$('.selector').hide();
	$('#handPercents').show();
	$('#winPercents').show();
});

$(".selectableCard .card").click(function(event) {
	console.log("clicked a card");
	if ($(event.target).hasClass('card')) {
		selectedCard = $(event.target).attr('data-index');
	} else {
		selectedCard = $(event.target).parents('.card').attr('data-index');
	}
	console.log(selectedCard);
	$('#handPercents').hide();
	$('#winPercents').hide();
	$(".selector").show(); 
});

tableCards.on('changePos', function(e) {
	selectedCard = tableCards.getActiveIndex();
	console.log("moved slider " + selectedCard);
	$('#handPercents').hide();
	$('#winPercents').hide();
	$(".selector").show(); 
});

});


function refresh() {
	for (var i = 0; i < 7; i++) {
		num = cards[i];
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
	selector.itemslide();
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