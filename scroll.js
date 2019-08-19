const canvas = document.getElementById("layer2");
    
const lines = [
    "While I've",
    "down loads from the cloud,",
    "I'm not completely out of the",
    "woods just yet...",
    "(site coming soon)"
];
    
var font = {
    "type": "Arial",
    "size": 32,
    "padding": 0,
    "color": "#ffffff"
}

const roadLineColor = "#B89132";

var TEXT_X_INITIAL_POS = canvas.width;
var TEXT_Y_INITIAL_POS = canvas.height;


var context = canvas.getContext("2d");

context.font = font.size + "px " + font.type;
context.fillStyle = font.color;

setInterval(drawText,50);



function drawText() {

	context.clearRect(0,0,canvas.width, canvas.height);
	
	for (var x = 0; x < lines.length; x++) {
    	const line = lines[x];
	    const lineOffsetY = lines.length - x;
	    var fontX = TEXT_X_INITIAL_POS - context.measureText(line).width;
	    var fontY = TEXT_Y_INITIAL_POS - ((font.size + font.padding) * lineOffsetY);
		context.globalAlpha = fontY / canvas.height;
		if (x == (lines.length - 1)) {
			context.fillStyle = roadLineColor;
		}
	    context.fillText(line, fontX, fontY);

		context.fillStyle = font.color;
	};

	TEXT_Y_INITIAL_POS -= 1;
}
