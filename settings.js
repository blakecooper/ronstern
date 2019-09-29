//These are technical definitions to make the code more readable. Changing these could affect the app in weird ways!
const OUT = 0;
const IN = 1;

const LEFT = [-1,0];
const RIGHT = [1,0];
const UP = [0,-1];
const DOWN = [0,1];

const X = 0;
const Y = 1;

//Font
const font = "Merriweather";
const fontSize = "30";

//Curtain rising factor... higher number means faster reveal
const curtainDriftOffset = 4;

//Total number of slideshow photos
const totalPhotos = 17;

//How long are the photos on the screen once they transition in/out?
const photoDuration = 500;

//How long is the text visible? Note: should be less than photoDuration
const textDuration = 400;

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
        "line": "'Ron Stern is the finest portrait photographer I've ever known.' ~Scott Rubin, longest serving editor of the National Lampoon",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.text.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "2": {
        "line": "...the second line of text goes here.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "3": {
        "line": "And so on, and so on.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "4": {
        "line": "Hi Ron!",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "5": {
        "line": "I'm going to replace this with real text tomorrow.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "6": {
        "line": "You have no idea how hard it was to get the line breaks right, by the way.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "7": {
        "line": "Like I said, I'm putting things on the page first, then varying their position once everything is working.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "8": {
        "line": "You likely noticed how the text always shows up in the same place relative to the photos (which always show up on the left).",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "9": {
        "line": "In the future, text and photo locations will vary.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "10": {
        "line": "And so on, and so on.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "11": {
        "line": "And so on, and so on.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "12": {
        "line": "And so on, and so on.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "13": {
        "line": "And so on, and so on.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "14": {
        "line": "And so on, and so on.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "15": {
        "line": "And so on, and so on.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "16": {
        "line": "And so on, and so on.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
    },
    "17": {
        "line": "And so on, and so on.",
        "alpha": 0,
        "widthInChars": 100,
        "x": canvas.slideshow.width/2,
        "y": canvas.text.height/2,
        "transitionInIsComplete": false,
        "transitionOutIsComplete": false,
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
            "finalPosition": [0,0],
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
            "finalPosition": [0,0],
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
            "finalPosition": [0,0],
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
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
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
            "finalPosition": [0,0],
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
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
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
            "finalPosition": [0,0],
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
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
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
            "finalPosition": [0,0],
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
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
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
            "finalPosition": [0,0],
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
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
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
            "finalPosition": [0,0],
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
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
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
            "finalPosition": [0,0],
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
            "initialPosition": RIGHT,
            "finalPosition": [0,0],
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
            "finalPosition": [0,0],
            "x": 0,
            "y": 0,
            "transitionInIsComplete": false,
            "transitionOutIsComplete": false,
            "transitionSpeed": 30,
            "finalPosition": [canvas.slideshow.width, 0],
        },
    },
};
