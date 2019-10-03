let photoCounter = 1;
let timer = 1;
let textTimer = 1;
let transitionIsComplete = true;


let transitionState = IN;

const animationElements = getElements();
let textTop = animationElements["textTop"];
let firstPhotoLoaded = false;
let animationStep = 1;
const scrollingText = document.getElementById("scrollText");

window.onload = function() 
{
    sizeCanvas();
    drawTitleAndCurtains();
};

let animateCurtainVar;

function drawTitleAndCurtains()
{
    canvas.curtain.getContext("2d").drawImage(image.curtainTop.photo,0,0,canvas.curtain.width,image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    canvas.curtainBottom.getContext("2d").drawImage(image.curtainBottom.photo,0,0,canvas.curtain.width,image.curtainBottom.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    canvas.title.getContext("2d").drawImage(image.title,0,0,canvas.curtain.width,image.title.height/(image.title.width/canvas.title.width));
};

function sizeCanvas()
{
    document.getElementById("curtainCanvas").width = window.innerWidth;
    document.getElementById("curtainCanvas").height = image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);
 
    document.getElementById("curtainBottomCanvas").width = window.innerWidth;
    document.getElementById("curtainBottomCanvas").height = image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);
    
    document.getElementById("titleCanvas").width = window.innerWidth;
    document.getElementById("titleCanvas").height = image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);

    document.getElementById("scrollTextCanvas").width = window.innerWidth;
    document.getElementById("scrollTextCanvas").height = image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);
    document.getElementById("slideshowCanvas").width = window.innerWidth;
    document.getElementById("slideshowCanvas").height = window.innerHeight;
    
    document.getElementById("textCanvas").width = window.innerWidth;
    document.getElementById("textCanvas").height = window.innerHeight;
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
function clear(element) 
{
	element.getContext("2d").clearRect(0,0,element.canvas.width, element.canvas.height);
};

//These two draw functions below don't work... not sure why.
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

function wrapText(line)
{
	let lines = [""];
	let lineNumber = 0;

	let lineWidth = canvas.text.width - text[photoCounter].x;
	let spaceLeft = lineWidth;

	let words = line.split(" ");
	let spaceWidth = 1 * fontSize;
	let word;
	for (word of words)
	{
		if (word !== "PARA") {
			if (((word.length * fontSize) + spaceWidth) > spaceLeft)
			{
				lineNumber++;
				lines[lineNumber] = "";
				spaceLeft = lineWidth - ((word.length * fontSize) + spaceWidth);
			} else {
				spaceLeft = spaceLeft - ((word.length * fontSize) + spaceWidth);
			};

			lines[lineNumber] = lines[lineNumber] + word + " ";
		} else {
			lineNumber++;
			lines[lineNumber] = "";
			lineNumber++;
			lines[lineNumber] = "";
		};
	};
	
	return lines;
};
