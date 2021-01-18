const shapes = ["oval","diamond","squiggle"];
const fills = ["transparent","stripe","fill=\"#"];
const colors = ["ff47ff","00b803","ffb047"];

var cardClass;

document.addEventListener("keydown", event => {
	switch (event.keyCode) {
		case 73: // i
		initialize();
		break;

		case 32: //space
		findSet();
		break;
	}
});

function initialize() {
	cardClass = Array.from(
			document.getElementsByClassName("MuiPaper-root")[3].
			children
			).
		find(el =>
			el.attributes.style.value.includes("visible")
		).
		firstChild.
		className;
}

function findSet() {
	cardEls = document.getElementsByClassName(cardClass);
	cards = [];
	for (cardEl of cardEls) {
		let card = {};
		let mark = cardEl.firstChild.innerHTML;

		card.el = cardEl;
		card.num = cardEl.childElementCount;

		for (shape of shapes) {
			if (mark.includes(shape)) {
				card.shape = shape;
				break;
			}
		}
		for (fill of fills) {
			if (mark.includes(fill)) {
				card.fill = fill;
				break;
			}
		}
		for (color of colors) {
			if (mark.includes(color)) {
				card.color = color;
				break;
			}
		}

		cards.push(card)
	}
	
	for(let i = 0; i < cards.length; i++){
		for(let j = i+1; j < cards.length; j++){
			for(let k = j+1; k < cards.length; k++){
				if(isSetValid(cards[i], cards[j], cards[k])){
					cards[i].el.click();
					cards[j].el.click();
					cards[k].el.click();
					i = cards.length;
					j = cards.length;
					k = cards.length;
				}
			}
		}
	}
}


function isSetValid(c1, c2, c3) {
	if(	(!allEqual(c1.num, c2.num, c3.num) &&
			!allDifferent(c1.num, c2.num, c3.num)) ||

		(!allEqual(c1.shape, c2.shape, c3.shape) &&
			!allDifferent(c1.shape, c2.shape, c3.shape)) ||

		(!allEqual(c1.fill, c2.fill, c3.fill) &&
			!allDifferent(c1.fill, c2.fill, c3.fill)) ||
	
		(!allEqual(c1.color, c2.color, c3.color) &&
			!allDifferent(c1.color, c2.color, c3.color))
		
	) return false;

	return true;
}

function allEqual(a, b, c) {
	return a == b && b == c;
}

function allDifferent(a, b, c) {
	return a != b && b != c && a != c;
}
