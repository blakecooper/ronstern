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
const canvasComingSoon = document.getElementById("textBottom");

var skyCanvas = document.getElementById("sky");
var roadCanvas = document.getElementById("road");

const context = setInitialContext(canvas);
const contextComingSoon = setInitialContext(canvasComingSoon);

var img = document.getElementById("textTopImg");
var imgComingSoon = document.getElementById("textBottomImg");

var TEXT_X_INITIAL_POS = canvas.width/2;
var TEXT_Y_INITIAL_POS = canvas.height;

var COMING_SOON_X_INITIAL_POS = (canvas.width/2)+100;
var COMING_SOON_Y_INITIAL_POS = canvas.height-150;

//var TEXT_Y_INITIAL_POS = canvas.height + ((font.size + font.padding) * text.length);

setInterval(drawText,30);

function setInitialContext(canvas) {

	var canvas = canvas
	var ctx = canvas.getContext("2d");

	ctx.font = font.size + "px " + font.type;
	ctx.fillStyle = font.color;

	return ctx;
}

function drawText() {

	clearCanvas(canvas, context);

	context.drawImage(img,TEXT_X_INITIAL_POS-100,TEXT_Y_INITIAL_POS);
//	for (var x = 0; x < text.length; x++) {
//    	const textLine = text[x];		
//		const textLinePosition = getTextPosition(textLine, x, justify.CENTER);

		setGlobalAlpha(TEXT_Y_INITIAL_POS);

//	    context.fillText(textLine, textLinePosition.X, textLinePosition.Y);

//		context.fillStyle = font.color;
//	};

	TEXT_X_INITIAL_POS -= 0.1;
	TEXT_Y_INITIAL_POS -= 1.1;

	if (TEXT_Y_INITIAL_POS < 1) {
		skyCanvas.style.zIndex = "6";
		roadCanvas.style.zIndex = "2";

		clearCanvas(canvasComingSoon, contextComingSoon);

		if (canvas.height - COMING_SOON_Y_INITIAL_POS > 90) {
			var comingSoonContext = canvasComingSoon.getContext("2d");
				comingSoonContext.drawImage(imgComingSoon,COMING_SOON_X_INITIAL_POS,COMING_SOON_Y_INITIAL_POS);

				COMING_SOON_Y_INITIAL_POS += .2;
		} else {
			var comingSoonContext = canvasComingSoon.getContext("2d");
				comingSoonContext.drawImage(imgComingSoon,COMING_SOON_X_INITIAL_POS,COMING_SOON_Y_INITIAL_POS);
		}
	}
			
}

function clearCanvas(canvasToClear, contextToClear) {
	contextToClear.clearRect(0,0,canvasToClear.width, canvasToClear.height);
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
	context.globalAlpha = textLinePosition / canvas.height;
}

function isLastLineOfText(text, textLineNumber) {
	return textLineNumber == text.length - 1;
}
