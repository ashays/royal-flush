var cards = [0, 0, 0, 0, 0, 0, 0];
var opponents = 2;
var randomAttempts = 10000;

// Counters
var straightFlush = 0;
var fourOfKind = 0;
var flush = 0;
var twoPair = 0;
var royalFlush = 0;
var pair = 0;
var highCard = 0;
var fullHouse = 0;
var straight = 0;
var threeOfKind = 0;

var youWin = 0;
var oppWin = 0;
var noWin = 0;

function makeCombos() {
	for (var i = 0; i < randomAttempts; i++) {
		updateCounter(winnerCalc(randomCombo()));
	}
	updateProbs();
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
		cardCombo[4 + j] = randCard;
	}
	return cardCombo;
}

function winnerCalc(everyone) {
	var table = [everyone[0], everyone[1], everyone[2], everyone[3], everyone[4]];
	var you = bestHand(table.concat([everyone[5], everyone[6]]));
	var opp = 0;
	for (var oppNum = 0; oppNum < opponents && you > opp; oppNum++) {
		opp = bestHand(table.concat([everyone[7 + oppNum], everyone[8 + oppNum]]));
	}
	if (you > opp) {
		youWin++;
	} else if (opp > you) {
		oppWin++;
	} else {
		noWin++;
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
	} else if (num >= 8) {
		threeOfKind++;
	} else if (num >= 1.077) {
		twoPair++;
	} else if (num >= .14167) {
		pair++;
	} else {
		highCard++;
	}
}

function updateProbs() {
	$("#royal-flush").text((royalFlush / randomAttempts) * 100);
	$("#straight-flush").text((straightFlush / randomAttempts) * 100);
	$("#four-of-a-kind").text((fourOfKind / randomAttempts) * 100);
	$("#full-house").text((fullHouse / randomAttempts) * 100);
	$("#flush").text((flush / randomAttempts) * 100);
	$("#straight").text((straight / randomAttempts) * 100);
	$("#three-of-a-kind").text((threeOfKind / randomAttempts) * 100);
	$("#two-pair").text((twoPair / randomAttempts) * 100);
	$("#pair").text((pair / randomAttempts) * 100);
	$("#high-card").text(Math.floor( 10 * (highCard / randomAttempts) * 100) / 10);
	$("#you-win").text((youWin / randomAttempts) * 100);
	$("#opp-win").text((oppWin / randomAttempts) * 100);
	$("#no-win").text(Math.floor( 10 * (noWin / randomAttempts) * 100) / 10);
}

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
	for (var i = 0; i <= 4; i++) {
		if ((calc[i] == 0) || (calc[i] == 1)) {
			calc[i] += 13;
		}
	}
	calc.sort(function(a, b){return a-b});
	if (sameSuit(hand) && isStraight(modded)) {
		if (calc[0] == 2) {
			return calc[3] * 90000;
		} else {
			return calc[4] * 90000;
		}
	} else if (modded[1] == modded[2] && modded[1] == modded[3] && (modded[1] == modded[0] || modded[1] == modded[4])) {
		return calc[1] * 30000;
	} else if (modded[0] == modded[1] && modded[3] == modded[4] && (modded[2] == modded[0] || modded[2] == modded[4])) {
		return 10 * (calc[4] * 169 + calc[0] * 13);
	} else if (sameSuit(hand)) {
		return calc[4] * 250;
	} else if (isStraight(modded)) {
		if (calc[0] == 2) {
			return calc[3] * 30;
		} else {
			return calc[4] * 30;
		}
	} else if ((modded[2] == modded[0] && modded[2] == modded[1]) || (modded[2] == modded[1] && modded[2] == modded[3]) || (modded[2] == modded[3] && modded[2] == modded[4]) ) {
		return calc[2] * 4;
	} else if ((modded[1] == modded[0] || modded[1] == modded[2]) && (modded[3] == modded[2] || modded[3] == modded[4])) {
		return (1/350) * (calc[3]*169+calc[1] * 13 + (.01) * (calc[0] + calc[1] + calc[2] + calc[3] + calc[4]));
	} else if (modded[0] == modded[1]) {
		return (1/60) * (calc[0] * 4 + calc[4] * 0.1);
	} else if (modded[1] == modded[2]) {
		return (1/60) * (calc[1] * 4 + calc[4] * 0.1);
	} else if (modded[2] == modded[3]) {
		return (1/60) * (calc[2] * 4 + calc[4] * 0.1);
	} else if (modded[3] == modded[4]) {
		return (1/60) * (calc[3] * 4 + calc[2] * 0.1);
	} else {
		return (.01) * calc[4];
	}
}

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
	return ((hand[4] - hand[0] == 4) || (hand[4] - hand[0] == 12 && hand[4] - hand[1] == 3) || (hand[4] - hand[0] == 12 && hand[4] - hand[1] == 11 && hand[4] - hand[2] == 2) );
}