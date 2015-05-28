var cards = [0, 0, 0, 0, 0, 0, 0];
var straightFlush = 0;
var fourOfKind = 0;
var flush = 0;
var twoPair = 0;
var royalFlush = 0;
var oenPair = 0;
var highCard = 0;


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
	for (var i = 0; i < 1; i++) {
		bestHand(randomCombo());
	}
}

function randomCombo() {
	cardCombo = cards.slice(0);
	for (var i = 0; i < cardCombo.length; i++) {
		if (cardCombo[i] == 0) {
			var randCard = Math.floor((Math.random() * 52) + 1);
			while (cardCombo.indexOf(randCard) != -1) {
				randCard = Math.floor((Math.random() * 52) + 1);
			}
			cardCombo[i] = randCard;			
		}
	}
	return cardCombo;
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
	var max = 0;
	console.log(combo);
	for (var a = 0; a <= 2; a++) {
		for (var b = a+1; b <= 3; b++) {
			for (var c = b+1; c <= 4; c++) {
				for (var d = c+1; d <= 5; d++) {
					for (var e = d+1; e <= 6; e++) {
						var value = handValue([combo[a], combo[b], combo[c], combo[d], combo[e]]);
						if (value > max) {
							max = value;
						}
					}
				}
			}
		}
	}
	if (afladldakflajdf) }
		royalFlush++;
	if (400000 < max < 1040000) {
		straightFlush++;
	}
	/*var h = getHighest(combo);
	var l = getLowest(combo);
	var p = getSecondLowest(combo);

	if ((h - l == 5) && (h % 13 > l % 13)) {
		x = h % 13;
		if (x == 0) {
			x = 13;
		}
	}
	else if (((h - p == 4) && (h % 13 == 0) && (l % 13 == 1)) && (h % 13 > l % 13)) {
		x = 14;
	}
	return (80000*x) + getSuit(h);
	*/
}

function handValue(hand) {
	hand.sort();
	var modded = [hand[0]%13, hand[1]%13, hand[2]%13, hand[3]%13, hand[4]%13];
	// Straight flush
	if (sameSuit && ((hand[4] - hand[0] == 4) || (hand[4] - hand[0] == 12 && hand[4] - hand[1] == 3))) {
		console.log("straight flush");
	} else {
		console.log("high card " + hand[4]);
	}
}
function sameSuit(hand) {
	if (hand[0] >= 1 && hand[4] <= 13) {
		return true;
	}
	if (hand[0] >= 14 && hand[4] <= 26) {
		return true;
	}
	if (hand[27] >= 1 && hand[4] <= 39) {
		return true;
	}
	if (hand[0] >= 40 && hand[4] <= 52) {
		return true;
	}
	else {
		return false;
	}
}