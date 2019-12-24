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

function canvasIsOpaque(canvas) {
	return getCanvasOpacity(canvas) > OPAQUE;
};

function canvasIsTransparent(canvas) {
	return getCanvasOpacity(canvas) < TRANSPARENT;
};

/* ANIMATION UTILITIES */
function pauseFor(time) 
{
	timer++;
		if (timer > time)
		{
			timer = 0;
		};
};

//TODO: remove and refactor code accordingly. This is deprecated!
function getElements() 
{
	return	{
        "textElement": {
            "canvas": document.getElementById("slideshowCanvas"),
            "context": document.getElementById("slideshowCanvas").getContext("2d"),
            "alpha": 0,
        },
        "photo1": {
            "canvas": document.getElementById("curtainCanvas"),
            "context": document.getElementById("curtainCanvas").getContext("2d"),
            "image": document.getElementById("photo1"),
            "alpha": 0,
            "heightRatio": .5943,
            },
	    "slideshowPhoto": {
            "canvas": document.getElementById("slideshowCanvas"),
            "context": document.getElementById("slideshowCanvas").getContext("2d"),
            "image": document.getElementById("photo2"),
            "alpha": 0,
        },
		"textTop": {
			"canvas": document.getElementById("scrollTextCanvas"),
			"context": document.getElementById("scrollTextCanvas").getContext("2d"),
			"image": document.getElementById("scrollText"),
			"isBackground": false,
			"position": {
				X: document.getElementById("scrollTextCanvas").width/2-100,
				Y: document.getElementById("scrollTextCanvas").height
			},
			"isStillOnPage": true,
			"hasReachedBreakPoint": false,
		},
	};
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
