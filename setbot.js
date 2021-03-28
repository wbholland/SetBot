const shapes = ["oval","diamond","squiggle"];
const fills = ["transparent","stripe","fill=\"#"];
var colors = [];
var attributes = [shapes, fills, colors];

var cardClass;
var stringToEl;

document.addEventListener("keydown", event => {
	switch (event.key) {
		case "i":
		initialize();
		break;

		case "j":
		findSet();
		break;

		case "k":
		findUltraSet();
		break;
	}
});

function setColors() {
	document.getElementsByClassName("MuiListItem-root")[3].click()
	for(colorDisplay of document.getElementsByClassName("MuiDialogContent-root")[0].firstChild.children) {
		colors.push(colorDisplay.firstChild.firstChild.firstChild.getAttribute("fill"));
	}
	document.activeElement.firstChild.dispatchEvent(new KeyboardEvent('keydown',{key: 'Escape', bubbles:true}));
}

function initialize() {
	cardClass = Array.from(
			document.getElementsByClassName("MuiPaper-root")[3].
			children
			).
		find(el => el.attributes.style.value.includes("visible")).
		firstChild.className;

	setColors();
}

function parseCard(cardEl) {
	let card = "";
	let mark = cardEl.firstChild.innerHTML;

	card += cardEl.childElementCount % 3;

	for(att of attributes) {
		for (let i = 0; i < att.length; i++) {
			if (mark.includes(att[i])) {
				card += i;
				break;
			}
		}
	}

	return card;
}

function chainCards() {
	let chainCards = [];
	let barRect = document.getElementsByClassName("MuiDivider-root MuiDivider-absolute")[0].getBoundingClientRect();
	let unit = barRect.width/6;
	for(let i = 0; i < 3; i++) {
		let targetEl = document.elementFromPoint(barRect.x + (1+ i*2)*unit, barRect.y - unit);
		while(targetEl.className != cardClass) {
			targetEl = targetEl.parentElement;
		}
		chainCards.push(parseCard(targetEl));
	}
	return chainCards;
}

function readCards() {
	let cards = [];
	this.stringToEl = new Map();
	for (cardEl of document.getElementsByClassName(cardClass)) {
		let card = parseCard(cardEl);
		stringToEl.set(card, cardEl);
		cards.push(card);
	}

	return cards;
}

function conjugate(a, b) {
	let c = "";
	for(let i = 0; i < 4; i++) {
		c += (3- ((parseInt(a[i]) + parseInt(b[i])) % 3)) %3;
	}
	return c;
}

function findUltraSet() {
	let cards = readCards();
	let conjugateToPair = new Map();
	for(let i = 0; i < cards.length; i++){
		for(let j = i+1; j < cards.length; j++){
			let fifth = conjugate(cards[i], cards[j]);
			if(conjugateToPair.has(fifth)) {
				clickSet([...conjugateToPair.get(fifth), cards[i], cards[j]]);
				return;
			}
			conjugateToPair.set(fifth, [cards[i], cards[j]]);
		}
	}
}

function findSet() {
	let cards = readCards();
	let isChain = document.getElementsByClassName("MuiDivider-root MuiDivider-absolute").length;

	for(let i = 0; i < cards.length; i++){
		for(let j = i+1; j < cards.length; j++){
			let third = conjugate(cards[i], cards[j]);
			if(cards.includes(third)) {
				let set = [third, cards[i], cards[j]];
				if(isChain && listOverlap(set, chainCards()) != 1) {
					continue;
				}
				clickSet(set);
				return;
			}
		}
	}
}

function listOverlap(a, b) {
	let overlap = 0;
	for(card of a) {
		if (b.includes(card)) {
			overlap++;
		}
	}
	return overlap;
}

function clickSet(l) {
	for(card of l) {
		stringToEl.get(card).click();
	}
}
