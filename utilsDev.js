let photoCounter = 1;
let timer = 1;
let textTimer = 1;
let transitionIsComplete = true;

const OUT = 0;
const IN = 1;

const LEFT = [-1,0];
const RIGHT = [1,0];
const UP = [0,-1];
const DOWN = [0,1];

const X = 0;
const Y = 1;

let transitionState = IN;

const totalPhotos = 17;

const photoDuration = 500;
const textDuration = 200;

const canvas = {
    "curtain": document.getElementById("curtainCanvas"),
    "title": document.getElementById("titleCanvas"),
    "slideshow": document.getElementById("slideshowCanvas"), 
    "text": document.getElementById("textCanvas"),
};

const text = {
    "1": {
        "line": "'Ron Stern is the finest portrait photographer I've ever known.' ~Scott Rubin, longest serving editor of the National Lampoon",
        "alpha": 1,
        "widthInChars": 100,
        "x": canvas.text.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "2": {
        "line": "...the second line of text goes here.",
        "alpha": 1,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "3": {
        "line": "And so on, and so on.",
        "alpha": 1,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
};

const image = {
    "curtainTop": {
        "photo": document.getElementById("curtainTopImg"),
        "offsetPosition": 0,
    },
    "curtainBottom": {
        "photo": document.getElementById("curtainBottomImg"),
        "offsetPosition": 0,
    },
    "title": document.getElementById("titleImg"),
    "slideshow": {
        "1": {
            "photo": document.getElementById("photo1"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo1").width,
            "drawHeight": document.getElementById("photo1").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "2": {
            "photo": document.getElementById("photo2"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo2").width,
            "drawHeight": document.getElementById("photo2").height,
            "initialPosition": RIGHT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "3": {
            "photo": document.getElementById("photo3"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo3").width,
            "drawHeight": document.getElementById("photo3").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "4": {
            "photo": document.getElementById("photo4"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo4").width,
            "drawHeight": document.getElementById("photo4").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "5": {
            "photo": document.getElementById("photo5"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo5").width,
            "drawHeight": document.getElementById("photo5").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "6": {
            "photo": document.getElementById("photo6"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo6").width,
            "drawHeight": document.getElementById("photo6").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "7": {
            "photo": document.getElementById("photo7"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo7").width,
            "drawHeight": document.getElementById("photo7").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "8": {
            "photo": document.getElementById("photo8"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo8").width,
            "drawHeight": document.getElementById("photo8").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "9": {
            "photo": document.getElementById("photo9"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo9").width,
            "drawHeight": document.getElementById("photo9").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "10": {
            "photo": document.getElementById("photo10"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo10").width,
            "drawHeight": document.getElementById("photo10").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "11": {
            "photo": document.getElementById("photo11"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo11").width,
            "drawHeight": document.getElementById("photo11").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "12": {
            "photo": document.getElementById("photo12"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo12").width,
            "drawHeight": document.getElementById("photo12").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "13": {
            "photo": document.getElementById("photo13"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo13").width,
            "drawHeight": document.getElementById("photo13").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "14": {
            "photo": document.getElementById("photo14"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo14").width,
            "drawHeight": document.getElementById("photo14").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "15": {
            "photo": document.getElementById("photo15"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo15").width,
            "drawHeight": document.getElementById("photo15").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "16": {
            "photo": document.getElementById("photo16"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo16").width,
            "drawHeight": document.getElementById("photo16").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
        "17": {
            "photo": document.getElementById("photo17"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo17").width,
            "drawHeight": document.getElementById("photo17").height,
            "initialPosition": LEFT,
            "finalPosition": RIGHT,
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
    },
};

const curtainDriftOffset = 4;

let alpha = {
	"curtain": 1,
	"title": 1,
};

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
