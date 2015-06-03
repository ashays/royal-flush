function refresh() {
	$(".table .card")
}

function getSuit(card) {
	if (card <= 13) {
		return "club";
	} else if (card <= 26) {
		return "diamond";
	} else if (card <= 39) {
		return "heart";
	} else if (card <= 52) {
		return "spade"
	}
}

function getRank(card) {
	num = card % 13;
	if (num != 1 && num <= 10) {
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
		else if (num == 13) {
			return "K"
		}
	}
}
