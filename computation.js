var randomAttempts = 10000;

var opponents = 2;

// Counters
var youWin = 0;
var oppWin = 0;
var noWin = 0;
var royalFlush = 0;
var straightFlush = 0;
var fourOfKind = 0;
var fullHouse = 0;
var flush = 0;
var straight = 0;
var threeOfKind = 0;
var twoPair = 0;
var pair = 0;
var highCard = 0;

onmessage = function(event) {
	cards = event.data;
	console.log(cards);
	makeCombos();
	var counters = [youWin, oppWin, noWin, royalFlush, straightFlush, fourOfKind, fullHouse, flush, straight, threeOfKind, twoPair, pair, highCard];
	postMessage(counters);
}

function makeCombos() {
	for (var i = 0; i < randomAttempts; i++) {
		updateCounter(winnerCalc(randomCombo()));
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
	for (var j = 0; j < opponents * 2; j++) {
		var randCard = Math.floor((Math.random() * 52) + 1);
		while (cardCombo.indexOf(randCard) != -1) {
			randCard = Math.floor((Math.random() * 52) + 1);
		}
		cardCombo[7 + j] = randCard;
	}
	return cardCombo;
}

function winnerCalc(everyone) {
	var table = [everyone[0], everyone[1], everyone[2], everyone[3], everyone[4]];
	var you = bestHand(table.concat([everyone[5], everyone[6]]));
	var opp = 0;
	var isTie = false;
	for (var oppNum = 0; oppNum < opponents * 2 && !(opp > you); oppNum+=2) {
		opp = bestHand(table.concat([everyone[7 + oppNum], everyone[8 + oppNum]]));
		if (opp == you) {
			isTie = true;
		}
	}
	if (opp > you) {
		oppWin++;
	} else if (isTie) {
		noWin++;
	} else if (you > opp) {
		youWin++;
	}
	return you;
}

function updateCounter(num) {
	if (num == 1260000 ) {
		royalFlush++;
	} else if (num >= 450000) {
		straightFlush++;
	} else if (num >= 60000) {
		fourOfKind++;
	} else if (num >= 3770) {
		fullHouse++;
	} else if (num >= 1500) {
		flush++;
	} else if (num >= 150) {
		straight++;
	} else if (num >= 8.0090) {
		threeOfKind++;
	} else if (num >= 1.077) {
		twoPair++;
	} else if (num >= .1353) {
		pair++;
	} else {
		highCard++;
	}
}


// Takes in 7-card combo and returns best hand value
function bestHand(combo) {
	var max = 0;
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
	return max;
}

function handValue(hand) {
	hand.sort(function(a, b){return a-b});
	var modded = [hand[0]%13, hand[1]%13, hand[2]%13, hand[3]%13, hand[4]%13];
	modded.sort(function(a, b){return a-b});
	var calc = modded.slice(0);
	var kicker = (calc[4] * (38416) + calc[3] * (2744) + calc[2] * (196) + calc[1] * (14) + calc[0]) / (9600.2);
	for (var i = 0; i <= 4; i++) {
		if ((calc[i] == 0) || (calc[i] == 1)) {
			calc[i] += 13;
		}
	}
	calc.sort(function(a, b){return a-b});
	if (sameSuit(hand) && isStraight(modded)) {
		// Straight flush
		if (calc[0] == 2) {
			return calc[3] * 90000;
		} else {
			return calc[4] * 90000;
		}
	} else if (modded[1] == modded[2] && modded[1] == modded[3] && (modded[1] == modded[0] || modded[1] == modded[4])) {
		// Four of a kind
		return calc[1] * 30000;
	} else if (modded[0] == modded[1] && modded[3] == modded[4] && (modded[2] == modded[0] || modded[2] == modded[4])) {
		// Full house
		return 10 * (calc[2] * 169 + calc[0] * 13);
	} else if (sameSuit(hand)) {
		// Flush
		return calc[4] * 250 + kicker * .01;
	} else if (isStraight(modded)) {
		// Straight
		if (calc[0] == 2) {
			return calc[3] * 30;
		} else {
			return calc[4] * 30;
		}
	} else if ((modded[2] == modded[0] && modded[2] == modded[1]) || (modded[2] == modded[1] && modded[2] == modded[3]) || (modded[2] == modded[3] && modded[2] == modded[4]) ) {
		// Three of a kind
		return calc[2] * 4 + kicker * .001;
	} else if ((modded[1] == modded[0] || modded[1] == modded[2]) && (modded[3] == modded[2] || modded[3] == modded[4])) {
		// Two Pair
		return (1/350) * (calc[3]*169+calc[1] * 13 + (.01) * kicker);
	} else if (calc[0] == calc[1]) {
		// Pair
		return (1/60) * (calc[0] * 4 + kicker * 0.01);
	} else if (calc[1] == calc[2]) {
		// Pair
		return (1/60) * (calc[1] * 4 + kicker * 0.01);
	} else if (calc[2] == calc[3]) {
		// Pair
		return (1/60) * (calc[2] * 4 + kicker * 0.01);
	} else if (calc[3] == calc[4]) {
		// Pair
		return (1/60) * (calc[3] * 4 + kicker * 0.01);
	} else {
		// High card
		return (.001) * (calc[4] + kicker);
	}
}

// helper functions for figuring out the hand
function sameSuit(hand) {
	if (hand[0] >= 1 && hand[4] <= 13) {
		return true;
	}
	else if (hand[0] >= 14 && hand[4] <= 26) {
		return true;
	}
	else if (hand[27] >= 1 && hand[4] <= 39) {
		return true;
	}
	else if (hand[0] >= 40 && hand[4] <= 52) {
		return true;
	}
	else {
		return false;
	}
}

function isStraight(hand) {
	if ((hand[4] - hand[0] == 4) && (hand[4] - hand[1] == 3) && (hand[4] - hand[2] == 2) && (hand[4] - hand[3] == 1)) {
		return true;
	} else if (hand == [0, 9, 10, 11, 12]) {
		// King high
		return true;
	} else if (hand == [0, 1, 10, 11, 12]) {
		// Royal straight
		return true;
	} else {
		return false;
	}
}


// the tostring (for debugging)
function printHand(toPrint) {
	var newPrint = [];
	for (var i = 0; i < toPrint.length; i++) {
		newPrint[i] = toPrint[i] % 13 + whatSuit(toPrint[i]);
	}
	console.log(newPrint);
}

function whatSuit(card) {
	if (card <= 13) {
		return "C";
	} else if (card <= 26) {
		return "D";
	} else if (card <= 39) {
		return "H";
	} else if (card <= 52) {
		return "S"
	}
}

function handValueToo(hand) {
	hand.sort(function(a, b){return a-b});
	var modded = [hand[0]%13, hand[1]%13, hand[2]%13, hand[3]%13, hand[4]%13];
	modded.sort(function(a, b){return a-b});
	var calc = modded.slice(0);
	for (var i = 0; i <= 4; i++) {
		if (calc[i] == 0 || calc[i] == 1) {
			calc[i] += 13;
		}
	}
	if (isPair(calc)) {
        if (isTwoPair(calc)) {
        	if (isFullHouse(calc)) {
        		return FULL_HOUSE_VALUE;
        	}
        	else if (isFourOfAKind(calc)) {
                return FOUR_KIND_VALUE;
        	}
        	else {
        		return TWO_PAIR_VALUE;
        	}
        }
        else if (isThreeOfAKind(calc)) {
        	return THREE_KIND_VALUE;
        }
        else {
        	return PAIR_VALUE;
        }
	}

	else if (isStraight(modded)) {
		if (isFlush(hand)) {
			return STRAIGHT_FLUSH_VALUE;
		}
		else {
			return STRAIGHT_VALUE;
		}
	}

	else if (isFlush(hand)) {
		return FLUSH_VALUE;
	}
	else {
		return HIGH_CARD_VALUE;
	}
}

function isTwoPair(calc) {
	return ((calc[1] == calc[0] || calc[1] == calc[2]) && (calc[3] == calc[2] || calc[3] == calc[4]));
}

function isFullHouse(modded) {
	return (modded[0] == modded[1] && modded[3] == modded[4] && (modded[2] == modded[0] || modded[2] == modded[4]));
}

function isFourOfAKind(modded) {
	return (modded[1] == modded[2] && modded[1] == modded[3] && (modded[1] == modded[0] || modded[1] == modded[4]));
}

function isThreeOfAKind(calc) {
	return (calc[2] == calc[0] || calc[2] == calc[4] || (calc[2] == calc[3] && calc[2] == calc[1]));
}

function isPair(calc) {
	return (calc[0] == calc[1] || calc[1]==calc[2] || calc[2] == calc[3] || calc[3] == calc[4]);
}

function pairValue(hand) {
	if (hand[0] == hand[1]) {
		return PAIR_VALUE_ONE;
	}
	else if (hand[1] == hand[2]) {
		return PAIR_VALUE_TWO;
	}
	else if (hand[2] == hand[3]) {
		return PAIR_VALUE_THREE;
	}
	else {
		return PAIR_VALUE_FOUR;
	}
}