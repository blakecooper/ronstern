let photoCounter = 1;
let timer = 1;
let transitionIsComplete = true;

const OUT = 0;
const IN = 1;

let transitionState = IN;

let photoCanvas = document.getElementById("left");
let textCanvas = document.getElementById("right");

const totalPhotos = 17;

const photoDuration = 100;

const text = [
    "Ron Stern is a master photographer and the nephew & protege of famed 20th century photographer, Bert Stern.",
    "...the second line of text goes here.",
    "And so on, and so on."
];

function getElements() 
{
	return	{
        "textElement": {
            "canvas": textCanvas,
            "context": textCanvas.getContext("2d"),
            "alpha": 0,
        },
        "photo1": {
            "canvas": document.getElementById("photo1Canvas"),
            "context": document.getElementById("photo1Canvas").getContext("2d"),
            "image": document.getElementById("photo1"),
            "alpha": 0,
            "heightRatio": .5943,
            },
	    "slideshowPhoto": {
            "canvas": photoCanvas,
            "context": photoCanvas.getContext("2d"),
            "image": document.getElementById("photo2"),
            "alpha": 0,
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
