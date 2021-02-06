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
	document.getElementsByClassName("MuiListItem-root")[2].click()
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

function readCards(cardEls) {
	cardEls = document.getElementsByClassName(cardClass);
	cards = [];
	this.stringToEl = new Map();
	for (cardEl of cardEls) {
		let card = "";
		let mark = cardEl.firstChild.innerHTML;

		card += cardEl.childElementCount % 3;

		for(att of attributes) {
			for (let i = 0; i < attributes.length; i++) {
				if (mark.includes(att[i])) {
					card += i;
					break;
				}
			}
		}

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
	let count = 0;
	let cards = readCards();

	for(let i = 0; i < cards.length; i++){
		for(let j = i+1; j < cards.length; j++){
			let third = conjugate(cards[i], cards[j]);
			count++;
			if(cards.includes(third)) {
				clickSet([third, cards[i], cards[j]]);
				return;
			}
		}
	}
}

function clickSet(l) {
	for(card of l) {
		stringToEl.get(card).click();
	}
}
