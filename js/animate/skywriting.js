let skywritingCanvas = document.getElementById("skywritingCanvas");
let skywritingContext = skywritingCanvas.getContext("2d");

let tapSkywritingCanvas = document.getElementById("skywritingTapCanvas");
let tapSkywritingContext = tapSkywritingCanvas.getContext("2d");

function sizeSkywritingText() {
	let skywritingImage = docuent.getElementById("skywriting");


	let skywritingOriginalWidth = skywritingImage.width;
	let skywritingOriginalHeight = skywritingImage.height;
	
	skywritingImage.width = skywritingCanvas.width * .6;
	skywritingImage.height = (skywritingOriginalHeight * (skywritingCanvas.width * .6))/skywritingOriginalWidth;
};

function animateSkywriting() {

	clearCanvas(skywritingCanvas);
	clearCanvas(tapSkywritingCanvas);
   		
	if (!userClicked) {
		
		if (skywritingIsFadedOut) {
			fadeCanvas(skywritingCanvas, .004);
			
			if (skywritingIsInstantiated && canvasIsOpaque(skywritingCanvas)) {
				skywritingIsFadedIn = true;
				skywritingIsFadedOut = false;
			};
		
		};
		
		if (skywritingIsFadedIn) {
			if (skywritingTimer < skywritingDuration) {
				skywritingTimer++;
			} else {
			
				if (!canvasIsOpaque(tapSkywritingCanvas)) {
					fadeCanvas(skywritingCanvas, -.004);
					fadeCanvas(tapSkywritingCanvas, .004);
				};
			
			};
		};		
		
		drawSkywriting();
		
		window.requestAnimationFrame(animateSkywriting);
		
	} else {
		
		if (!canvasIsTransparent(tapSkywritingCanvas) || !canvasIsTransparent(skywritingCanvas)) {
			fadeCanvas(tapSkywritingCanvas, -.008);
			fadeCanvas(skywritingCanvas, -.008);

			drawSkywriting();

			window.requestAnimationFrame(animateSkywriting);
		} else {
			clearCanvas(skywritingCanvas);
			clearCanvas(tapSkywritingCanvas);
		};
	
	};
};

function drawSkywriting() {
	const skywritingImage = document.getElementById("skywriting");
	const tapSkywritingImage = document.getElementById("skywritingTap");

	const skywritingOriginalWidth = skywritingImage.width;
	const skywritingTapOriginalWidth = tapSkywritingImage.width;
	
  	skywritingContext.drawImage(
		skywritingImage,
		skywritingXPlacement,
		skywritingYPlacement + 15,
		skywritingCanvas.width * .80,
		skywritingImage.height * (skywritingCanvas.width * .60)/skywritingOriginalWidth,
	);
  	
	tapSkywritingContext.drawImage(
		tapSkywritingImage,
		skywritingXPlacement,
		skywritingYPlacement,
		tapSkywritingCanvas.width * .80,
		tapSkywritingImage.height * (tapSkywritingCanvas.width * .60)/skywritingTapOriginalWidth,
	);
};
