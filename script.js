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