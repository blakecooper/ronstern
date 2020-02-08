/* HTML DOM UTILITIES */
function display(elementId) {
	if (document.getElementById(elementId).style.display === "none")
	{
		document.getElementById(elementId).style.display = "inline";
	};
};

function hide(elementId) {
	if (document.getElementById(elementId).style.display === "inline")
	{
		document.getElementById(elementId).style.display = "none";
	};
};

/* HTML CANVAS UTILITIES */
function clearCanvas(canvas) {
   	canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
};

function fadeCanvas(canvas, amountFaded) {
	canvas.getContext("2d").globalAlpha += amountFaded;
};

function getCanvasOpacity(canvas) {
	return canvas.getContext("2d").globalAlpha;
};

function setCanvasOpacityToTransparent(canvas) {
	canvas.getContext("2d").globalAlpha = TRANSPARENT;
};

function setCanvasOpacityToOpaque(canvas) {
	canvas.getContext("2d").globalAlpha = OPAQUE;
};
function canvasIsOpaque(canvas) {
	return getCanvasOpacity(canvas) > OPAQUE;
};

function canvasIsTransparent(canvas) {
	return getCanvasOpacity(canvas) < TRANSPARENT;
};


/* ANIMATION UTILITIES: */

function move (element, x, y)
{
	element.position.X += x;
	element.position.Y += y;
};

/* TEXT */
function wrapText(text, size, width)
{
	let lines = [""];
	let lineNumber = 0;

	let spaceLeft = width;

	let words = text.split(" ");
	let spaceWidth = 1 * size;
	let word;
	for (word of words)
	{
		if (word !== "PARA") {
			if (((word.length * size) + spaceWidth) > spaceLeft)
			{
				lineNumber++;
				lines[lineNumber] = "";
				spaceLeft = width;
			};

			spaceLeft = spaceLeft - ((word.length * size) + spaceWidth);
			lines[lineNumber] = lines[lineNumber] + word + " ";
		} else {
			lineNumber++;
			lines[lineNumber] = "";
			lineNumber++;
			lines[lineNumber] = "";
			spaceLeft = width;
		};
	};
	
	return lines;
};
