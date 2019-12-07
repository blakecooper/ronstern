let scottsTextSliding = 0;

const DEMOMODE = 0;

//This is a (temporary?) global variable used to reference the width of a line of text on the canvas. We need it to move photos out of the way in a few instances
let textLineWidth = 0;

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

const FONT_COLOR = 'white';
//Curtain rising factor... higher number means faster reveal
const curtainDriftOffset = 1;

//Total number of slideshow photos
const totalPhotos = 19;

let textCanvasLocation = 0;

let screenOrientation = LANDSCAPE;

//Captions
let captionLocation = 0;

//How long are the photos on the screen once they transition in/out?
const photoDuration = 500;
let DEFAULT_PHOTO_DURATION = 500;

let DEFAULT_PHOTO_TRANSITION_SPEED = 1.15;
//How long is the text visible? Note: should be less than photoDuration
let textTimingOffset = -200;
const TEXT_FADE_SPEED = .003;

//Pixels between each photo and text
const textBuffer = 100;
//How opaque do the curtain and title appear at first? 1 = totally opaque, 2 = totally transparent
let alpha = {
	"curtain": 1,
	"title": 1,
	"titleRealistic": 1,
};

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
		"timingOffset": 0,
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
        "line": "After years of capturing magical imagery, Ron has decided to show his photographs at museums and festivals. You can view a select group of photos for the first time at the 2019 Allentown Art Festival -- America's largest regional art show.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
		"timingOffset": -30,
    },
    "11": {
        "line": "",
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
		"duration": 40,  
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
			"hasCaption": false,
			"captionID": "",
			"slowTextTransition": false,
			"longDurationForText": true,
		},
        "2": {
            "photo": document.getElementById("photo2"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo2").width,
            "drawHeight": document.getElementById("photo2").height,
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
			"fullScreen": false,
            "centered": false,
			"hasCaption": false,
			"captionID": "",
			"longDurationForText": false,
        },
        "3": {
            "photo": document.getElementById("photo3"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo3").width,
            "drawHeight": document.getElementById("photo3").height,
            "initialPosition": RIGHT,
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
            "centered": true,
			"hasCaption": false,
			"captionID": "",
			"longDurationForText": false,
        },
        "4": {
            "photo": document.getElementById("photo4"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo4").width,
            "drawHeight": document.getElementById("photo4").height,
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
			"extraTall": false,
			"fullScreen": false,
            "centered": true,
			"hasCaption": false,
			"captionID": "",
			"longDurationForText": false,
        },
        "5": {
            "photo": document.getElementById("photo5"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo5").width,
            "drawHeight": document.getElementById("photo5").height,
			"initialPosition": RIGHT,
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
			"extraTall": true,
			"fullScreen": false,
			"centered": true,
			"hasCaption": false,
			"captionID": "",
			"longDurationForText": false,
        },
        "6": {
            "photo": document.getElementById("photo6"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo6").width,
            "drawHeight": document.getElementById("photo6").height,
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
            "centered": true,
			"hasCaption": true,
			"captionID": "MelAndCole",
			"longDurationForText": false,
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
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": true,
			"textOnRight": true,
			"extraWide": true,
			"fullScreen": false,
            "centered": false,
			"hasCaption": false,
			"captionID": "",
			"longDurationForText": false,
        },
        "8": {
            "photo": document.getElementById("photo8"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo8").width,
            "drawHeight": document.getElementById("photo8").height,
            "initialPosition": RIGHT,
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
            "centered": true,
			"hasCaption": true,
			"captionID": "Scott",
			"longDurationForText": false,
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
            "centered": true,
			"textOnRight": false,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": false,
			"captionID": "",
			"longDurationForText": false,
		},
        "10": {
            "photo": document.getElementById("photo10"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo10").width,
            "drawHeight": document.getElementById("photo10").height,
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": true,
            "centered": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": false,
			"captionID": "",
			"longDurationForText": false,
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
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": false,
			"captionID": "",
			"longDurationForText": false,
        },
        "12": {
            "photo": document.getElementById("photo12"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo12").width,
            "drawHeight": document.getElementById("photo12").height,
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
            "centered": true,
			"textOnRight": false,
			"extraWide": false,
			"extraTall": false,
			"fullScreen": false,
            "centered": true,
			"hasCaption": false,
			"captionID": "",
			"longDurationForText": false,
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
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Kids",
			"longDurationForText": false,
        },
        "14": {
            "photo": document.getElementById("photo14"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo9").width,
            "drawHeight": document.getElementById("photo9").height,
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Don",
			"longDurationForText": false,
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
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Theatre",
			"longDurationForText": false,
        },
        "16": {
            "photo": document.getElementById("photo16"),
            "hasNotBeenDrawnYet": true,
            "drawWidth": document.getElementById("photo16").width,
            "drawHeight": document.getElementById("photo16").height,
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": DEFAULT_PHOTO_TRANSITION_SPEED,
            "finalPosition": [canvas.slideshow.width, 0],
        	"duration": DEFAULT_PHOTO_DURATION,
			"hasText": false,
            "centered": false,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Family",
			"longDurationForText": false,
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
            "centered": true,
			"textOnRight": true,
			"extraWide": false,
			"fullScreen": false,
			"hasCaption": true,
			"captionID": "Flower",
			"longDurationForText": false,
        },
    },
};
