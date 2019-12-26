
const OUT = 0;
const IN = 1;

let scottsTextSliding = 0;

const curtainDriftOffset = 1;

let photoCounter = 1;

let timer = 1;

let transitionIsComplete = true;

let musicPlayed = false;

let transitionState = IN;

let firstPhotoLoaded = false;

let animationStep = 0;

const OPAQUE = .99;
const TRANSPARENT = .01;

const totalPhotos = 18;

const LEFT = [-1,0];
const RIGHT = [1,0];
const UP = [0,-1];
const DOWN = [0,1];

const X = 0;
const Y = 1;

const LANDSCAPE = 0;
const PORTRAIT = 1;

let screenOrientation = LANDSCAPE;

let DEFAULT_PHOTO_DURATION = 500;

let DEFAULT_PHOTO_TRANSITION_SPEED = 1.15;

const textBuffer = 100;

let alpha = {
	"curtain": 1,
	"title": 1,
	"titleRealistic": 1,
};

let windPlayed = false;
let userClicked = false;
let musicIsFaded = false;

let contactIsShown = false;
let contactIsFaded = false;
let reverseContactIsFaded = false;
let reverseContactIsShown = false;

//Canvas objects
const canvas = {
    "scrollText": document.getElementById("scrollTextCanvas"),
    "curtain": document.getElementById("curtainCanvas"),
    "title": document.getElementById("titleCanvas"),
	"titleRealistic": document.getElementById("titleRealisticCanvas"),
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
		"timingOffset": 10,
    },
    "2": {
        "line": "Like Bert, Ron would blossom in commercial photography, often creating brilliant artistic images from seemingly mundane subjects. PARA Not afraid to experiment, Ron's work with Revlon using a holographic camera to create completely unique, never before seen imagery,  is still considered groundbreaking. Working side by side with celebrated fashion photographer David Steinberg, then under the direction of revered New York Art Director, Milton Green the team developed a new paradigm for modern photography - artistically capturing moments in three dimensions.",
        "alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": -60,
    },
    "3": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "4": {
        "line": "From his work on Madison ave, it wasn't long before Hollywood came calling. Like his Uncle's breathtaking portraits of Marilyn Monroe, Ron's photographic studies of celebrated actors and writers are often considered their finest photographs of their careers. PARA 90's Miramax film star Mel Gorham, believes her shoots with Ron to be her greatest.",
        "alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "5": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "6": {
        "line": "",
		"alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "7": {
        "line": "Writer/actor Scott Rubin, the longest serving Editor in Chief of National Lampoon, is convinced that Ron Stern is the finest portrait photographer he's ever worked with.",
        "alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 170,
    },
    "8": {
        "line": "",
		"alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "9": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "10": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "11": {
        "line": "After years of capturing magical imagery, Ron has decided to show his photographs at museums and festivals. You can view a select group of photos for the first time at the 2020 Allentown Art Festival -- America's largest regional art show.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "12": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "13": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "14": {
        "line": "",
		"alpha": 0,
        "widthInChars": 100,
        "x": 10,
        "y": 10,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": -10,
    },
    "15": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "16": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
    "17": {
        "line": "",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": 0,
    },
};

//Images that appear onscreen, and related properties
const image = {
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
		"duration": 20,  
    	"alpha": 1,
	},
	"titleRealistic": {
		"photo": document.getElementById("titleRealisticImg"),
		"duration": 35,
		"alpha": 1,
	},
	"slideshow": {
        "1": {
            "photo": document.getElementById("photo1"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo1").width,
            "drawHeight": document.getElementById("photo1").height,
            "initialPosition": RIGHT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": true,
			"textOnRight": true,
			"extraWide": true,
			"fullScreen": false,
            "centered": false,
			"hasCaption": false,
			"captionID": "",
		},
        "2": {
            "photo": document.getElementById("photo2"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo2").width,
            "drawHeight": document.getElementById("photo2").height,
            "initialPosition": LEFT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
            "centered": false,
			"hasCaption": false,
			"captionID": "",
			
        },
        "3": {
            "photo": document.getElementById("photo3"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo3").width,
            "drawHeight": document.getElementById("photo3").height,
            "initialPosition": RIGHT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
            "centered": true,
			"hasCaption": false,
			"captionID": "",
			
        },
        "4": {
            "photo": document.getElementById("photo4"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo4").width,
            "drawHeight": document.getElementById("photo4").height,
            "initialPosition": LEFT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION * .5,
			"hasText": true,
			"textOnRight": false,
			"extraWide": false,
			
			"fullScreen": false,
            "centered": true,
			"hasCaption": false,
			"captionID": "",
			
        },
        "5": {
            "photo": document.getElementById("photo5"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo5").width,
            "drawHeight": document.getElementById("photo5").height,
			"initialPosition": RIGHT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			
			"fullScreen": false,
			"centered": true,
			"hasCaption": false,
			"captionID": "",
			
        },
        "6": {
            "photo": document.getElementById("photo6"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo6").width,
            "drawHeight": document.getElementById("photo6").height,
            "initialPosition": LEFT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
			"fullScreen": false,
            "centered": true,
			"hasCaption": true,
			"captionID": "MelAndCole",
			
        },
        "7": {
            "photo": document.getElementById("photo7"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo7").width,
            "drawHeight": document.getElementById("photo7").height,
            "initialPosition": LEFT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION * .75,
			"hasText": true,
			"textOnRight": true,
			"extraWide": true,
			"fullScreen": false,
            "centered": false,
			"hasCaption": false,
			"captionID": "",
			
        },
        "8": {
            "photo": document.getElementById("photo8"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo8").width,
            "drawHeight": document.getElementById("photo8").height,
            "initialPosition": RIGHT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
            "centered": true,
			"hasCaption": true,
			"captionID": "Scott",
			
        },
        "9": {
            "photo": document.getElementById("photo9"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo9").width,
            "drawHeight": document.getElementById("photo9").height,
            "initialPosition": LEFT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
            "centered": true,
			"textOnRight": false,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Castle",
			
		},
        "10": {
            "photo": document.getElementById("photo10"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo10").width,
            "drawHeight": document.getElementById("photo10").height,
            "initialPosition": LEFT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": false,
			"captionID": "",
			
        },
        "11": {
            "photo": document.getElementById("photo11"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo11").width,
            "drawHeight": document.getElementById("photo11").height,
            "initialPosition": RIGHT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": true,
            "centered": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": false,
			"captionID": "",
			
        },
        "12": {
            "photo": document.getElementById("photo12"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo12").width,
            "drawHeight": document.getElementById("photo12").height,
            "initialPosition": RIGHT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
            "centered": true,
			"textOnRight": false,
			"extraWide": false,
			
			"fullScreen": false,
            "centered": true,
			"hasCaption": false,
			"captionID": "",
			
        },
        "13": {
            "photo": document.getElementById("photo13"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo13").width,
            "drawHeight": document.getElementById("photo13").height,
            "initialPosition": LEFT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Kids",
			
        },
        "14": {
            "photo": document.getElementById("photo14"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo14").width,
            "drawHeight": document.getElementById("photo14").height,
            "initialPosition": RIGHT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Don",
			
        },
        "15": {
            "photo": document.getElementById("photo15"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo15").width,
            "drawHeight": document.getElementById("photo15").height,
            "initialPosition": LEFT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Theatre",
			
        },
        "16": {
            "photo": document.getElementById("photo16"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo16").width,
            "drawHeight": document.getElementById("photo16").height,
            "initialPosition": RIGHT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
            "centered": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Family",
			
        },
        "17": {
            "photo": document.getElementById("photo17"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo17").width,
            "drawHeight": document.getElementById("photo17").height,
            "initialPosition": LEFT,
            "finalPosition": [canvas.slideshow.width, 0],
			"currentPosition": [0,0],
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
        	"duration": DEFAULT_PHOTO_DURATION / 2,
			"hasText": false,
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Flower",
			
        },
    },
};

window.onload = function() 
{
    if (window.innerHeight > window.innerWidth)
    {
        fontSize = fontSize /2;
        screenOrientation = PORTRAIT;
    };

    sizeCanvas();
	sizeText();
	drawTitleAndCurtains();
};

function startOnClick() 
{
	userClicked = true;
	playWind();
	window.requestAnimationFrame(animate);
};

function playWind()
{
	if (!windPlayed)
	{
		document.getElementById("camera").play();
		document.getElementById("wind").play();
		windPlayed = true;
	};
};

function drawTitleAndCurtains() {
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
    
    document.getElementById("skywritingCanvas").width = window.innerWidth;
    document.getElementById("skywritingCanvas").height = image.curtainTop.photo.height/(image.curtainBottom.photo.width/canvas.curtain.width);

	document.getElementById("skywritingTapCanvas").width = window.innerWidth;
    document.getElementById("skywritingTapCanvas").height = image.curtainTop.photo.height/(image.curtainBottom.photo.width/canvas.curtain.width);

    document.getElementById("skywritingTapCanvas").getContext("2d").globalAlpha = 0;
    document.getElementById("skywritingCanvas").getContext("2d").globalAlpha = 0;
	skywritingIsInstantiated = true;

	document.getElementById("titleCanvas").width = window.innerWidth;
    document.getElementById("titleCanvas").height = image.curtainTop.photo.height/(image.curtainBottom.photo.width/canvas.curtain.width);

    document.getElementById("titleRealisticCanvas").width = window.innerWidth;
    document.getElementById("titleRealisticCanvas").height = image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);
     
	document.getElementById("slideshowCanvas").width = window.innerWidth;
    document.getElementById("slideshowCanvas").height = window.innerHeight * 2;
    
    document.getElementById("textCanvas").width = window.innerWidth;
    document.getElementById("textCanvas").height = window.innerHeight * 2;

    document.getElementById("contact").width = window.innerWidth;
    document.getElementById("contact").height = window.innerHeight;

    document.getElementById("contactReversed").width = window.innerWidth;
    document.getElementById("contactReversed").height = window.innerHeight;

	document.getElementById("arrowCanvas").width = window.innerWidth;
	document.getElementById("arrowCanvas").height = window.innerHeight * 2;
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

window.requestAnimationFrame(animateSkywriting);

function pauseFor(time) 
{
	timer++;
		if (timer > time)
		{
			timer = 0;
			animationStep++;
		};
};
