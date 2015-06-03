function refresh() {
	for (var i = 0; i < 7; i++) {
		num = cards[i];
		if (num == 0) {
			$($(".card")[i]).removeClass('black red').html('<div class="logo">Royal Flush</div>');
		}
		else if (num <= 26) {
			$($(".card")[i]).addClass('black').removeClass('red');
			$($(".card")[i]).html('<img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png"><span class="cardValue">' + getRank(cards[i]) + '</span><img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png">');

		} else {
			$($(".card")[i]).addClass('red').removeClass('black');
			$($(".card")[i]).html('<img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png"><span class="cardValue">' + getRank(cards[i]) + '</span><img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png">');
		}
	}
}

function selector() {
	$(".selector ul").append('<li><div class="card"><div class="logo">Royal Flush</div></div></li>');
	for (var i = 0; i < 52; i++) {
		$(".selector ul").append('<li><div class="card black"><img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png"><span class="cardValue">' + getRank(cards[i]) + '</span><img class="suit" src="img/suits/' + getSuit(cards[i]) + '.png"></div></li>');
	}
}

function getSuit(card) {
	if (card <= 13) {
		return "club";
	} else if (card <= 26) {
		return "spade";
	} else if (card <= 39) {
		return "heart";
	} else if (card <= 52) {
		return "diamond"
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
