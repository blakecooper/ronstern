const justify = {
	LEFT: 0,
	CENTER: 1,
	RIGHT: 2,
};

const text = [
    "While I've",
    "down loads from the cloud,",
    "I'm not completely out of the",
    "woods just yet...",
];

const comingSoonText = "(Site coming soon)";
    
var font = {
    "type": "Open Sans Condensed",
    "size": 48,
    "padding": 12,
    "color": "#ffffff"
}

const fadeOffset = 0;
const roadLineColor = "#A27E26";

const canvas = document.getElementById("textTop"); 
const context = setInitialContext();

var TEXT_X_INITIAL_POS = canvas.width;
var TEXT_Y_INITIAL_POS = canvas.height + ((font.size + font.padding) * text.length);

setInterval(drawText,50);

function setInitialContext() {

	var ctx = canvas.getContext("2d");

	ctx.font = font.size + "px " + font.type;
	ctx.fillStyle = font.color;

	return ctx;
}

function drawText() {

	clearCanvas();
	
	for (var x = 0; x < text.length; x++) {
    	const textLine = text[x];		
		const textLinePosition = getTextPosition(textLine, x, justify.CENTER);

		setGlobalAlpha(textLinePosition);

	    context.fillText(textLine, textLinePosition.X, textLinePosition.Y);

		context.fillStyle = font.color;
	};

	TEXT_Y_INITIAL_POS -= 1;
}

function clearCanvas() {
	context.clearRect(0,0,canvas.width, canvas.height);
}

function getTextPosition(textLine, textLineNumber, justified) {
	
    var textX = 0;

	switch(justified) {
		case (justify.LEFT):
			textX = 0;
			break;
		case (justify.CENTER):
			textX = (canvas.width / 2) - (context.measureText(textLine).width / 2);
			break;
		case (justify.RIGHT):
			textX = TEXT_X_INITIAL_POS - context.measureText(textLine).width;
	}	
	
	var textLineOffsetY = text.length - textLineNumber;
	
    var textY = TEXT_Y_INITIAL_POS - ((font.size + font.padding) * textLineOffsetY);

	return {"X": textX, "Y": textY};
}

function setGlobalAlpha(textLinePosition) {
	context.globalAlpha = ((textLinePosition.Y - fadeOffset) / canvas.height);
}

function isLastLineOfText(text, textLineNumber) {
	return textLineNumber == text.length - 1;
}
