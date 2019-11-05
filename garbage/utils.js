function getElements() 
{
	return	{
		"sky": {
			"canvas": document.getElementById("sky"),
			"context": document.getElementById("sky").getContext("2d"),
			"image": document.getElementById("imgTop"),
			"isBackground": true,
		},
		"line": {
			"canvas": document.getElementById("line"),
			"context": document.getElementById("line").getContext("2d"),
			"image": document.getElementById("imgMiddle"),
			"isBackground": true,
		},
		"road": {
			"canvas": document.getElementById("road"),
			"context": document.getElementById("road").getContext("2d"),
			"image": document.getElementById("imgBottom"),
			"isBackground": true,
		},
		"textTop": {
			"canvas": document.getElementById("textTop"),
			"context": document.getElementById("textTop").getContext("2d"),
			"image": document.getElementById("textTopImg"),
			"isBackground": false,
			"position": {
				X: document.getElementById("textTop").width/2-100,
				Y: document.getElementById("textTop").height
			},
			"isStillOnPage": true,
			"hasReachedBreakPoint": false,
		},
		"textBottom": {
			"canvas": document.getElementById("textBottom"),
			"context": document.getElementById("textBottom").getContext("2d"),
			"image": document.getElementById("underConstruction"),
			"isBackground": false,
            "hasBeenDrawn": false,
			"reachedBottomOfCanvas": false,
			"position": {
				X: (document.getElementById("textBottom").width/2 + 100),
				Y: document.getElementById("textBottom").height-130,
            },
            "width": 304,
			"height": 37,
            "rotationInDegrees": -10,
            "totalSwingCounter": 0,
			"degreesToSwing": 9,
			"hasBounced": false,
			"numberOfBounces": 0,
			"hasReachedBreakPoint": false,
		},
		"stencil": {
			"canvas": document.getElementById("stencilCanvas"),
			"context": document.getElementById("stencilCanvas").getContext("2d"),
			"image": document.getElementById("stencilImg"),
			"isBackground": false,
			"alpha": 0,
		},
		"bigRed": {
			"canvas": document.getElementById("bigRedCanvas"),
			"context": document.getElementById("bigRedCanvas").getContext("2d"),
			"image": document.getElementById("bigRedImg"),
			"isBackground": true,
		},
		"title": {
			"canvas": document.getElementById("titleCanvas"),
			"context": document.getElementById("titleCanvas").getContext("2d"),
			"image": document.getElementById("titleImg"),
			"isBackground": false,
			"alpha": 0,
		},
		"skySwing": {
			"canvas": document.getElementById("skySwingCanvas"),
			"context": document.getElementById("skySwingCanvas").getContext("2d"),
			"image": document.getElementById("photo1SwingTop"),
			"isBackground": true,
		},
		"roadSwing": {
			"canvas": document.getElementById("roadSwingCanvas"),
			"context": document.getElementById("roadSwingCanvas").getContext("2d"),
			"image": document.getElementById("photo1SwingBottom"),
			"isBackground": true,
		},
	};
};

/* ANIMATION UTILITIES: */
function clear(element) 
{
	element.context.clearRect(0,0,element.canvas.width, element.canvas.height);
};

function draw(element, posX, posY) 
{
	element.context.drawImage(element.image, posX, posY);
};

function draw(element, posX, posY, width, height) 
{
	element.context.drawImage(element.image, posX, posY, width, height);
};

function move (element, x, y)
{
	element.position.X += x;
	element.position.Y += y;
};

function tiltTextBottom()
{
	textBottom.context.translate(textBottom.position.X,textBottom.position.Y);
    textBottom.context.rotate(textBottom.rotationInDegrees * Math.PI / 180);
    textBottom.context.translate(-(textBottom.position.X),-(textBottom.position.Y));    
};

function updateTextBottomTilt(degrees) 
{
    textBottom.totalSwingCounter += textBottom.rotationInDegrees;
    textBottom.rotationInDegrees += degrees;    
};