let WELCOME_TO_MY_WEBSITE = 1;
let TO_GET_WIND_OF_MY_WORK = 2;

let skywritingCanvas = document.getElementById("skywritingCanvas");
let skywritingContext = skywritingCanvas.getContext("2d");

let tapSkywritingCanvas = document.getElementById("skywritingTapCanvas");
let tapSkywritingContext = tapSkywritingCanvas.getContext("2d");

let skywritingIsFadedIn = false;
let skywritingIsFadedOut = true;

let skywritingDuration = 125;
let skywritingTimer = 0;

let skywritingXPlacement = (window.innerWidth/2) - ((window.innerWidth * .80)/2);
let skywritingYPlacement = document.getElementById("skywritingCanvas").height/5 - 10;

let skywritingTapXPlacement = (window.innerWidth/2) - ((window.innerWidth * .80)/2);
let skywritingTapYPlacement = document.getElementById("skywritingCanvas").height/5;

//Bottom right
let skywritingTapSpeedupXPlacement = (window.innerWidth) - ((window.innerWidth * .20)) - 25;
let skywritingTapSpeedupYPlacement = ((document.getElementById("skywritingTapCanvas").height) * 2);


let skywritingIsInstantiated = false;

let skywritingText = WELCOME_TO_MY_WEBSITE;

function animateSkywriting() {

	clearCanvas(skywritingCanvas);
	clearCanvas(tapSkywritingCanvas);
   		
	if (!userClicked) {
		
		if (skywritingIsFadedOut) {
			fadeCanvas(skywritingCanvas, .006);
			
			if (skywritingIsInstantiated && canvasIsOpaque(skywritingCanvas)) {
				skywritingIsFadedIn = true;
				skywritingIsFadedOut = false;
			};
		
		};
		
		if (skywritingIsFadedIn) {
			if (skywritingTimer < skywritingDuration) {
				skywritingTimer++;
			} else {
			
				if (!canvasIsTransparent(skywritingCanvas)) {
					fadeCanvas(skywritingCanvas, -.006);
					
					if (skywritingText === TO_GET_WIND_OF_MY_WORK && !canvasIsOpaque(tapSkywritingCanvas)) {
						fadeCanvas(tapSkywritingCanvas, .006);
					};
				} else {
					if (skywritingText === WELCOME_TO_MY_WEBSITE) {
						skywritingText++;
						skywritingIsFadedOut = true;
						skywritingIsFadedIn = false;
						skywritingTimer = 0;
					};
				};
			};
		};		
		
		drawSkywriting(skywritingText);
		
		window.requestAnimationFrame(animateSkywriting);
		
	} else {
		
		if (!canvasIsTransparent(tapSkywritingCanvas) || !canvasIsTransparent(skywritingCanvas)) {
			fadeCanvas(tapSkywritingCanvas, -.06);
			fadeCanvas(skywritingCanvas, -.06);

			drawSkywriting(skywritingText);

			window.requestAnimationFrame(animateSkywriting);
		} else {
			clearCanvas(skywritingCanvas);
			clearCanvas(tapSkywritingCanvas);
		};
	
	};
};

function drawSkywriting(text) {


	const skywritingImage = document.getElementById(getSkywritingImageId(text));
	const tapSkywritingImage = document.getElementById("skywritingTap");
	const tapSpeedupSkywritingImage = document.getElementById("skywritingTapSpeedup");

	const skywritingOriginalWidth = skywritingImage.width;
	const skywritingTapOriginalWidth = tapSkywritingImage.width;
	const skywritingTapSpeedupOriginalWidth = tapSpeedupSkywritingImage.width;

	const skywritingTapNewHeight = tapSkywritingImage.height * ((tapSkywritingCanvas.width * .60)/skywritingTapOriginalWidth);

	const skywritingTapSpeedupNewHeight = tapSpeedupSkywritingImage.height * ((tapSkywritingCanvas.width * .2)/skywritingTapSpeedupOriginalWidth);
	skywritingContext.drawImage(
		skywritingImage,
		skywritingXPlacement,
		skywritingYPlacement + 15,
		skywritingCanvas.width * .80,
		skywritingImage.height * (skywritingCanvas.width * .80)/skywritingOriginalWidth,
	);
  	
	tapSkywritingContext.drawImage(
		tapSkywritingImage,
		skywritingTapXPlacement,
		skywritingTapYPlacement + 5,
		tapSkywritingCanvas.width * .80,
		skywritingTapNewHeight,
	);

	tapSkywritingContext.drawImage(
		tapSpeedupSkywritingImage,
		skywritingTapSpeedupXPlacement,
		skywritingTapSpeedupYPlacement - skywritingTapSpeedupNewHeight - 15,
		skywritingCanvas.width * .20,
		skywritingTapSpeedupNewHeight,
	);
};

function getSkywritingImageId(text) {
	if (text === WELCOME_TO_MY_WEBSITE) {
		return "skywriting1";
	} else {
		return "skywriting2";
	};
};
