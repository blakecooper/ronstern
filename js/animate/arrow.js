const arrowCanvas = document.getElementById("arrowCanvas");
const arrowImage = document.getElementById("arrowImg");

const arrowToScreenSizeFactor = 6;

let arrowPositionX = 0;
let arrowPositionY = 0;

let arrowHasBeenDrawn = false;

function sizePositionAndDisplayArrow(photo) {

	positionArrow(photo);

	drawArrow();
};


function positionArrow(photo) {
	//For centering:
	//arrowPositionX = (window.innerWidth / 2) - ((arrowImage.width / arrowToScreenSizeFactor) / 2);

	//For Right aligned:
	arrowPositionX = (window.innerWidth) - ((arrowImage.width / arrowToScreenSizeFactor)) - 35;
	
	//For inside photo:
	//arrowPositionY = photo.drawHeight - arrowImage.height / arrowToScreenSizeFactor;
	
	//For outside photo:
	arrowPositionY = photo.drawHeight + (arrowImage.height / arrowToScreenSizeFactor)/2;
};

function drawArrow() {

	if (!arrowHasBeenDrawn) {
		arrowCanvas.getContext("2d").globalAlpha = 0.2;
		arrowCanvas.getContext("2d").drawImage(
			arrowImage,
			arrowPositionX,
			arrowPositionY,
			arrowImage.width / arrowToScreenSizeFactor,
			arrowImage.height / arrowToScreenSizeFactor
		);
		arrowHasBeenDrawn = true;
	};
};

function hideArrow() {
	clearCanvas(arrowCanvas);
	arrowHasBeenDrawn = false;
};
