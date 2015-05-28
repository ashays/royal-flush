var cards = [0, 0, 0, 0, 0, 0, 0];

function meRoyalFlush() {
	if (status == 1) {
		var usingA, usingB, usingBoth, usingNone;
		if (CardA.rank > 9 || CardA.rank == 1) { usingA = factorial(47) / factorial(50); }
		if (CardB.rank > 9 || CardB.rank == 1) { usingA = factorial(47) / factorial(50); }
		return usingA + usingB + usingBoth + usingNone;
	}
}

//recursive
var factorial = function(n) {
    if(n == 0) {
        return 1
    } else {
        return n * factorial(n - 1);
    }
}

function makeCombos() {
	cardCombo = [0, 0, 0, 0, 0, 0, 0];
	var a = cardCombo[0] = cards[0];
	var b = cardCombo[1] = cards[1];

	for (var c = 1; c <= 52; c++) {
		if (cards[2] != 0) { c = cards[2]; }
		if (cardCombo.indexOf(c) != -1) { continue; }
		cardCombo[2] = c;
		for (var d = 1; d <= 52; d++) {
			if (cards[3] != 0) { d = cards[3]; }
			if (cardCombo.indexOf(d) != -1) { continue; }
			cardCombo[3] = d;
			for (var e = 1; e <= 52; e++) {
				if (cards[4] != 0) { e = cards[4]; }
				if (cardCombo.indexOf(e) != -1) { continue; }
				cardCombo[4] = e;
				for (var f = 1; f <= 52; f++) {
					if (cards[5] != 0) { f = cards[5]; }
					if (cardCombo.indexOf(f) != -1) { continue; }
					cardCombo[5] = f;
					for (var g = 1; g <= 52; g++) {
						if (cards[6] != 0) { g = cards[6]; }
						if (cardCombo.indexOf(g) != -1) { continue; }
						cardCombo[6] = g;
						console.log(a + " " + b + " " + c + " " + d + " " + e + " " + f + " " + g);
						if (cards[6] != 0) { break; }
					}
					if (cards[5] != 0) { break; }
				}
				if (cards[4] != 0) { break; }
			}
			if (cards[3] != 0) { break; }
		}
		if (cards[2] != 0) { break; }
	}
}

function getHighest(combo) {
	max = combo[0];
	for (var i = 1; i < 7; i++) {
		if (combo[i] > min) {
			max = combo[i];
		}
	}
	return max;
} 

function getLowest(combo) {
	min = combo[0];
	for (var i = 1; i < 7; i++) {
		if (combo[i] < min) {
			min = combo[i];
		}
	}
	return min;
}

function getSecondLowest(combo) {
	min = getLowest(combo);
	secondLowest = combo[0];
	for (var i = 0; i < 7; i++) {
		if (combo[i] == min) {
			continue;
		}
		if (combo[i] < secondLowest) {
			secondLowest = combo[i];
		}
	}
	return secondLowest;
}

function getSuit(card) {
	var suit;

	if (0 < card < 14) {
		suit = 1;
	}
	else if (13 < card < 27) {
		suit = 2;
	}
	else if (26 < card < 40) {
		suit = 3;
	}
	else if (39 < card < 53) {
		suit = 4;
	}
	return suit;
}

function bestHand(combo) {
	var h = getHighest(combo);
	var l = getLowest(combo);
	var p = getSecondLowest(combo);

	if ((h - l = 5) && (h % 13 > l % 13)) {
		x = h % 13;
		if (x == 0) {
			x = 13;
		}
	}
	else if (((h - p = 4) && (h % 13 = 0) && (l % 13 = 1)) && (h % 13 > l % 13)) {
		x = 14;
	}
	return (80000*x) + getSuit(h);

}