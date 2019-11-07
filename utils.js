
const DEMOMODE = 0;

//These are technical definitions to make the code more readable. Changing these could affect the app in weird ways!
const OUT = 0;
const IN = 1;

const LEFT = [-1,0];
const RIGHT = [1,0];
const UP = [0,-1];
const DOWN = [0,1];

const X = 0;
const Y = 1;

const LANDSCAPE = 0;
const PORTRAIT = 1;

//Font
const FONT = "Merriweather";
let fontSize = "48";

const TEXT_FADE_SPEED = .006;
const FONT_COLOR = 'white';
//Curtain rising factor... higher number means faster reveal
const curtainDriftOffset = 2;

//Total number of slideshow photos
const totalPhotos = 18;

let textCanvasLocation = 0;

let screenOrientation = LANDSCAPE;

//How long are the photos on the screen once they transition in/out?
const photoDuration = 500;
let DEFAULT_PHOTO_DURATION = 250;

let DEFAULT_PHOTO_TRANSITION_SPEED = 10;
//How long is the text visible? Note: should be less than photoDuration
let textTimingOffset = -95;

//Pixels between each photo and text
const textBuffer = 100;
//How opaque do the curtain and title appear at first? 1 = totally opaque, 2 = totally transparent
let alpha = {
	"curtain": 1,
	"title": 1,
};

//Canvas objects
const canvas = {
    "scrollText": document.getElementById("scrollTextCanvas"),
    "curtain": document.getElementById("curtainCanvas"),
    "title": document.getElementById("titleCanvas"),
    "curtainBottom": document.getElementById("curtainBottomCanvas"),
    "slideshow": document.getElementById("slideshowCanvas"), 
    "text": document.getElementById("textCanvas"),
};

//Text to appear onscreen, and associated properties
//There has to be a number of these equal to the totalPhotos... in the future, these objects should be combined with the photos to avoid bugs.
let text = {
    "1": {
        "line": "Ron Stern is a master photographer and the nephew & protege of famed 20th century photographer, Bert Stern. PARA At the peak of Bert's career, Ron apprenticed under the legendary commercial photographer. Soon, the young Stern would develop a keen eye for wondrous photographic composition and a unique style that even his Uncle envied.", 
        "alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "2": {
        "line": "Like Bert, Ron would blossom in commercial photography, often creating brilliant artistic images from seemingly mundane subjects. PARA Not afraid to experiment, Ron's work with Revlon using a holographic camera to create completely unique, never before seen imagery,  is still considered groundbreaking. Working side by side with celebrated fashion photographer David Steinberg, then under the direction of revered New York Art Director, Milton Green the team developed a new paradigm for modern photography - artistically capturing moments in three dimensions.",
        "alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "3": {
        "line": "From his work on Madison ave, it wasn't long before Hollywood came calling. Like his Uncle's breathtaking portraits of Marilyn Monroe, Ron's photographic studies of celebrated actors and writers are often considered their finest photographs of their careers. PARA 90's Miramax film star Mel Gorham, believes her shoots with Ron to be her greatest.",
        "alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "4": {
        "line": "",
		"alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "5": {
        "line": "Writer/actor Scott Rubin, the longest serving Editor in Chief of National Lampoon, is convinced that Ron Stern is the finest portrait photographer he's ever worked with.",
        "alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "6": {
        "line": "",
		"alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "7": {
        "line": "After years of capturing magical imagery, Ron has decided to show his photographs at museums and festivals.",
        "alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "8": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "9": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "10": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "11": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "12": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "13": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "14": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "15": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "16": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "17": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
};


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

function $(element)
{
	return document.getElementById(element);
};

let image;
document.addEventListener("DOMContentLoaded", function() {

	let photoElements = $("photoContainer").innerHTML;;
	
	for (let i = 1; i < totalPhotos; i++) 
	{
		photoElements += "<img id='photo" + i + "' src='assets/photos/" + i + ".jpg'></img>";
	};

	$("photoContainer").innerHTML = photoElements;


//Images that appear onscreen, and related properties
image = {
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
        "initialPositionHasBeenSet": false,
    },
    "curtainTop": {
        "photo": document.getElementById("curtainTopImg"),
        "offsetPosition": 0,
		"alpha": 1,
    },
    "curtainBottom": {
        "photo": document.getElementById("curtainBottomImg"),
        "offsetPosition": 0,
		"alpha": 1,
    },
    "title": {
		"photo": document.getElementById("titleImg"),
		"duration": 50, //"three Blake Coopers" 
    	"alpha": 1,
	},
	"slideshow": {
        "1": {
            "photo": document.getElementById("photo1"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo1").width,
            "drawHeight": document.getElementById("photo1").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": 250,
			"hasText": true,
			"textOnRight": true,
			"extraWide": true,
			"fullScreen": false,
            "centered": false,
		},
        "2": {
            "photo": document.getElementById("photo2"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo2").width,
            "drawHeight": document.getElementById("photo2").height,
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION + 165,
			"hasText": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
            "centered": false,
        },
        "3": {
            "photo": document.getElementById("photo3"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo3").width,
            "drawHeight": document.getElementById("photo3").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": true,
			"textOnRight": false,
			"extraWide": false,
			"fullScreen": false,
            "centered": false,
        },
        "4": {
            "photo": document.getElementById("photo4"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo4").width,
            "drawHeight": document.getElementById("photo4").height,
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED*1.2,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION/3,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
            "centered": true,
        },
        "5": {
            "photo": document.getElementById("photo5"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo5").width,
            "drawHeight": document.getElementById("photo5").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": true,
			"textOnRight": true,
			"extraWide": true,
			"fullScreen": false,
            "centered": false,
        },
        "6": {
            "photo": document.getElementById("photo6"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo6").width,
            "drawHeight": document.getElementById("photo6").height,
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED*1.2,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION/2,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
            "centered": true,
        },
        "7": {
            "photo": document.getElementById("photo7"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo7").width,
            "drawHeight": document.getElementById("photo7").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED*.8,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
        "8": {
            "photo": document.getElementById("photo8"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo8").width,
            "drawHeight": document.getElementById("photo8").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": true,
		},
        "9": {
            "photo": document.getElementById("photo9"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo9").width,
            "drawHeight": document.getElementById("photo9").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
        "10": {
            "photo": document.getElementById("photo10"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo10").width,
            "drawHeight": document.getElementById("photo10").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
        "11": {
            "photo": document.getElementById("photo11"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo11").width,
            "drawHeight": document.getElementById("photo11").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
        "12": {
            "photo": document.getElementById("photo12"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo12").width,
            "drawHeight": document.getElementById("photo12").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
        "13": {
            "photo": document.getElementById("photo13"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo13").width,
            "drawHeight": document.getElementById("photo13").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
        "14": {
            "photo": document.getElementById("photo14"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo14").width,
            "drawHeight": document.getElementById("photo14").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
        "15": {
            "photo": document.getElementById("photo15"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo15").width,
            "drawHeight": document.getElementById("photo15").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
        "16": {
            "photo": document.getElementById("photo16"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo16").width,
            "drawHeight": document.getElementById("photo16").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
        "17": {
            "photo": document.getElementById("photo17"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo17").width,
            "drawHeight": document.getElementById("photo17").height,
            "initialPosition": LEFT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
        },
    },
};
});

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
		fontSize = window.innerHeight / 35;
	};

	if (screenOrientation == LANDSCAPE)
	{
		fontSize = window.innerWidth / 50;
	};
};

//TODO: Refactor so this is a generic "fade out" function that came take any image/canvas and redraw it while fading
function fadeTitle() 
{
    timer++;

    if (timer > image.title.duration) 
    {
    	canvas.title.getContext("2d").clearRect(0,0,canvas.title.width,canvas.title.height);

		let alphaTemp = alpha.title;
		alpha.title -= .01;
		canvas.title.getContext("2d").globalAlpha = alphaTemp;

		if (alpha.title < 0)
		{
			document.getElementById("titleCanvas").style="display: none";
			animationStep++;
        	timer = 0;
    	};
    
		//redraw
    	canvas.title.getContext("2d").drawImage(image.title.photo,0,0,canvas.title.width,image.title.photo.height/(image.title.photo.width/canvas.title.width));

    	canvas.title.getContext("2d").restore();
    };
};
