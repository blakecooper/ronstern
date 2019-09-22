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

const totalPhotos = 3;
//const totalPhotos = 17;

const photoDuration = 200;
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
            "finalPosition": [canvas.slideshow.width/2, 0],
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
            "finalPosition": [canvas.slideshow.width/2, 0],
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
            "finalPosition": [canvas.slideshow.width/2, 0],
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
