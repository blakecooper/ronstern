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
	arrowPositionX = (window.innerWidth / 2) - ((arrowImage.width / arrowToScreenSizeFactor) / 2);

	arrowPositionY = photo.drawHeight - arrowImage.height / arrowToScreenSizeFactor;
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
