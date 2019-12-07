let photoCounter = 1;
let timer = 1;
let textTimer = 1;
let transitionIsComplete = true;


let transitionState = IN;

const animationElements = getElements();
let textTop = animationElements["textTop"];
let firstPhotoLoaded = false;
let animationStep = 0;
const scrollingText = document.getElementById("scrollText");

window.onload = function() 
{
    if (window.innerHeight > window.innerWidth)
    {
        fontSize = fontSize /2;
        screenOrientation = PORTRAIT;
    };

	if (DEMOMODE === true)
	{
		DEFAULT_PHOTO_DURATION = DEFAULT_PHOTO_DURATION / 2;
		DEFAULT_PHOTO_TRANSITION_SPEED = DEFAULT_PHOTO_TRANSITION_SPEED / 2;
		textDuration = textDuration / 2;

	};
    sizeCanvas();
	sizeText();
	drawTitleAndCurtains();
};


let animateCurtainVar;

function drawTitleAndCurtains()
{
    canvas.curtain.getContext("2d").drawImage(image.curtainTop.photo,0,0,canvas.curtain.width,image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    canvas.curtainBottom.getContext("2d").drawImage(image.curtainBottom.photo,0,0,canvas.curtain.width,image.curtainBottom.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    canvas.title.getContext("2d").drawImage(image.title.photo,0,0,canvas.curtain.width,image.title.photo.height/(image.title.photo.width/canvas.title.width));
	canvas.titleRealistic.getContext("2d").drawImage(image.titleRealistic.photo,0,0,canvas.curtain.width,image.titleRealistic.photo.height/(image.titleRealistic.photo.width/canvas.titleRealistic.width));
};

function sizeCanvas()
{
    
    document.getElementById("curtainCanvas").width = window.innerWidth;
    document.getElementById("curtainCanvas").height = image.curtainBottom.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);
 
    document.getElementById("curtainBottomCanvas").width = window.innerWidth;
    document.getElementById("curtainBottomCanvas").height = image.curtainTop.photo.height/(image.curtainBottom.photo.width/canvas.curtain.width);
    
    document.getElementById("titleCanvas").width = window.innerWidth;
    document.getElementById("titleCanvas").height = image.curtainTop.photo.height/(image.curtainBottom.photo.width/canvas.curtain.width);

    document.getElementById("titleRealisticCanvas").width = window.innerWidth;
    document.getElementById("titleRealisticCanvas").height = image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);
    
	document.getElementById("scrollTextCanvas").width = window.innerWidth;
    document.getElementById("scrollTextCanvas").height = image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);
    document.getElementById("slideshowCanvas").width = window.innerWidth;
    document.getElementById("slideshowCanvas").height = window.innerHeight;
    
    document.getElementById("textCanvas").width = window.innerWidth;
    document.getElementById("textCanvas").height = window.innerHeight * 2;
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

function wrapText(line, photoWidth)
{
	let lines = [""];
	let lineNumber = 0;
    //TODO: find out why this needs the extra 100?
	let lineWidth = window.innerWidth + 100;

    
    if (screenOrientation == LANDSCAPE)
    {
        lineWidth = lineWidth - photoWidth;
    };

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
				spaceLeft = lineWidth;
			};

			spaceLeft = spaceLeft - ((word.length * fontSize) + spaceWidth);
			lines[lineNumber] = lines[lineNumber] + word + " ";
		} else {
			lineNumber++;
			lines[lineNumber] = "";
			lineNumber++;
			lines[lineNumber] = "";
			spaceLeft = lineWidth;
		};
	};
	
	return lines;
};

function sizeText()
{
	if (screenOrientation == PORTRAIT)
	{
		fontSize = window.innerHeight / 39;
	};

	if (screenOrientation == LANDSCAPE)
	{
		fontSize = window.innerWidth / 50;
	};
};

//TODO: Refactor so this is a generic "fade out" function that came take any image/canvas and redraw it while fading
function fadeTitle() 
{
	if (alpha.titleRealistic > 0)
	{

    	canvas.titleRealistic.getContext("2d").clearRect(0,0,canvas.title.width,canvas.title.height);
		
		let alphaRealisticTemp = alpha.titleRealistic;
		alpha.titleRealistic -= .002;
		canvas.titleRealistic.getContext("2d").globalAlpha = alphaRealisticTemp;
		canvas.titleRealistic.getContext("2d").drawImage(image.titleRealistic.photo,0,0,canvas.titleRealistic.width,image.titleRealistic.photo.height/(image.titleRealistic.photo.width/canvas.titleRealistic.width));

    		canvas.titleRealistic.getContext("2d").restore();
	} else {

		timer++;
    	if (timer > image.title.duration) 
    	{
    		canvas.title.getContext("2d").clearRect(0,0,canvas.title.width,canvas.title.height);

			let alphaTemp = alpha.title;
			alpha.title -= .005;
			canvas.title.getContext("2d").globalAlpha = alphaTemp;

			if (alpha.title < 0)
			{
				document.getElementById("titleCanvas").style="display: none";
				document.getElementById("titleRealisticCanvas").style="display: none";
				animationStep++;
        		timer = 0;
    		};
    
			//redraw
    	
			canvas.title.getContext("2d").drawImage(image.title.photo,0,0,canvas.title.width,image.title.photo.height/(image.title.photo.width/canvas.title.width));

    		canvas.title.getContext("2d").restore();
    	};
	};
};
