const animationElements = getElements();

function getElements() {
	return	{
		"sky": {
			"canvas": document.getElementById("sky"),
			"context": document.getElementById("sky").getContext("2d"),
			"image": document.getElementById("imgTop"),
			"isText": false,
		},
		"line": {
			"canvas": document.getElementById("line"),
			"context": document.getElementById("line").getContext("2d"),
			"image": document.getElementById("imgMiddle"),
			"isText": false,
		},
		"road": {
			"canvas": document.getElementById("road"),
			"context": document.getElementById("road").getContext("2d"),
			"image": document.getElementById("imgBottom"),
			"isText": false,
		},
		"textTop": {
			"canvas": document.getElementById("textTop"),
			"context": document.getElementById("textTop").getContext("2d"),
			"image": document.getElementById("textTopImg"),
			"isText": true,
			"position": {
				X: document.getElementById("textTop").width/2-100,
				Y: document.getElementById("textTop").height
			},
		},
		"textBottom": {
			"canvas": document.getElementById("textBottom"),
			"context": document.getElementById("textBottom").getContext("2d"),
			"image": document.getElementById("textBottomImg"),
			"isText": true,
			"reachedBottomOfCanvas": false,
			"speedUpFactor": .01,
			"pauseCounter": 100,
			"width": document.getElementById("textBottomImg").width,
			"height": document.getElementById("textBottomImg").height,
			"position": {
				X: (document.getElementById("textBottom").width/2)+100,
				Y: document.getElementById("textBottom").height-130,
			},
		},
	};
};

window.onload = function() {
		
	for (var element in animationElements) {
		if (!animationElements[element].isText) {
			animationElements[element].context.drawImage(animationElements[element].image,0,0);
		};
	};
};


setInterval(animate,30);

function animate() {
	
	var upText = animationElements["textTop"];
	var bottomText = animationElements["textBottom"];

	if (upText.position.Y > -500) {

		clearCanvas(upText);

		upText.context.drawImage(upText.image,upText.position.X-100,upText.position.Y);
		
		setTopTextAlphaForFade(upText);

		upText.position.X -= 0.1;
		upText.position.Y -= 1.1;
		
		if (upText.position.Y < upText.canvas.height/2) {
		
			animationElements.sky.canvas.style.zIndex = "4";
			animationElements.road.canvas.style.zIndex = "2";

			clearCanvas(bottomText);

			bottomText.context.drawImage(bottomText.image,bottomText.position.X,bottomText.position.Y,bottomText.width,bottomText.height);

			if (!bottomText.reachedBottomOfCanvas && bottomText.canvas.height - bottomText.position.Y > 90) {
				bottomText.position.Y += .3;
			} else {
				bottomText.reachedBottomOfCanvas = true;
				if (bottomText.pauseCounter > 0) {
					bottomText.pauseCounter--;
				} else {
					animationElements.sky.canvas.style.zIndex = "2";
					animationElements.road.canvas.style.zIndex = "4";
					animationElements.line.canvas.style.zIndex = "4";
					bottomText.canvas.style.zIndex = "4";

					bottomText.position.X -= .5 + bottomText.speedUpFactor;
					bottomText.position.Y -= .5 + bottomText.speedUpFactor;

					bottomText.speedUpFactor = bottomText.speedUpFactor * 1.01;

					bottomText.width = bottomText.width * 1.001;
					bottomText.height = bottomText.height * 1.001;
				};
			};
		};
	};
};

function clearCanvas(element) {
	element.context.clearRect(0,0,element.canvas.width, element.canvas.height);
};

function setTopTextAlphaForFade(text) {
	text.context.globalAlpha = text.position.Y / text.canvas.height;
};
