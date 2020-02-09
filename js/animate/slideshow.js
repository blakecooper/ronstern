function slideShow()
{
	clearCanvas(canvas.slideshow);

    var photo = image.slideshow[photoCounter];

    if (photo.hasNotBeenDrawnYet) {
		sizeAndPositionPhoto(photo);
	};
 
	if (!image.slideshow[photoCounter].hasText) {		
		text[photoCounter].transitionOutIsComplete = true;
	} else {
		if (!photo.hasNotBeenDrawnYet) {
			drawText(photo);
		};
	};

	drawPhoto(photo);

    if (photo.transitionInIsComplete) {	
        timer++;
    
		if (photoCounter === 2) {
			sizePositionAndDisplayArrow(photo);
		};
		
		if (photo.hasCaption) {
			positionAndDisplayCaption(photo);
		};

	} else {
        updatePhotoTransition(photo);

		checkForCompletedTransition(photo);
    };

    if (timer > photo.duration && !photo.transitionOutIsComplete) {

		photo.hasDisplayed = true;

		if (photoCounter === 2) {
			hideArrow();
		};

		if (!photo.transitionOutChanged && photo.fastTransitionOut) {
			photo.transitionSpeed = photo.transitionSpeed * 1.25;
			photo.transitionOutChanged = true;
		};
		
		if (photo.hasCaption) {
			hide("caption" + photo.captionID);
		};

        if ((photo.transitionType === SLIDE_IN_AND_OUT && photo.currentPosition[X] > (0-canvas.slideshow.width-100) && photo.currentPosition[X] < canvas.slideshow.width) || (photo.transitionType !== SLIDE_IN_AND_OUT && canvas.slideshow.getContext("2d").globalAlpha >= TRANSPARENT)) {
			updatePhotoTransition(photo);
		} else {
			if (photo.hasText) {	
				if (text[photoCounter].transitionOutIsComplete === true) {
            		photo.transitionOutIsComplete = true;
				};
			} else {
				photo.transitionOutIsComplete = true;
			};
		};
    };

    if (photo.transitionOutIsComplete) {
        if (photoCounter < totalPhotos) {
    	    photoCounter++;
        	timer = 0;
        };
    };
	
	if (photoCounter === totalPhotos) {
		animationStep++;
	};
};

function sizeAndPositionPhoto(photo) {
	if (screenOrientation === PORTRAIT) {
		if (photo.fullScreen === true) {
			photo.drawHeight = canvas.slideshow.height;
			photo.drawWidth = photo.photo.width/(photo.photo.height/canvas.slideshow.height);
		} else {
			photo.drawWidth = canvas.slideshow.width;
           	photo.drawHeight = photo.photo.height/(photo.photo.width/canvas.slideshow.width);
		};
	} else {
        if (photo.fullScreen === true) {
			photo.drawWidth = canvas.slideshow.width;
           	photo.drawHeight = photo.photo.height/(photo.photo.width/canvas.slideshow.width);
		} else {
			if (photo.hasCaption) {
				photo.drawHeight = window.innerHeight * .8;
			} else {
				photo.drawHeight = window.innerHeight;
			}

			photo.drawWidth = photo.photo.width/(photo.photo.height/photo.drawHeight);
       
			if (photo.extraWide === true) {
				photo.drawHeight = photo.drawHeight * .75;
				photo.drawWidth = photo.drawWidth * .75;
			};
		};
	};

    photo.currentPosition[X] = canvas.slideshow.width * photo.initialPosition[X];
    photo.currentPosition[Y] = canvas.slideshow.height * photo.initialPosition[Y];
       
	setInitialPhotoOpacity(photo);

	photo.hasNotBeenDrawnYet = false;
};

function setInitialPhotoOpacity(photo) {
	if (photo.transitionType === FADE_IN_AND_OUT) {
		setCanvasOpacityToTransparent(canvas.slideshow);
	} else {
		if (!canvasIsOpaque(canvas.slideshow)) {
			setCanvasOpacityToOpaque(canvas.slideshow);
		};
	};
};

function drawPhoto(photo) {
    canvas.slideshow.getContext("2d").drawImage(
		photo.photo,
		photo.currentPosition[X],
		photo.currentPosition[Y],
		photo.drawWidth,
		photo.drawHeight
	);
};

function updatePhotoTransition(photo) {
	if (!photo.transitionInIsComplete && canvas.slideshow.getContext("2d").globalAlpha <= OPAQUE) {
		fadeCanvas(canvas.slideshow,photo.fadeSpeed);
	};

	if (photo.transitionType !== FADE_IN_AND_OUT) {
		updatePhotoPosition(photo);
	};

	if (photo.transitionInIsComplete && photo.transitionType !== SLIDE_IN_AND_OUT) {
		if ((photo.transitionType === SLIDE_IN_AND_FADE_ON_SLIDE_OUT && photo.currentPosition[X] < (-100)) || (photo.transitionType === FADE_IN_AND_OUT)) {
			fadeCanvas(canvas.slideshow,(-1 * photo.fadeSpeed));
		};
	};
};

function updatePhotoPosition(photo) {
	photo.currentPosition[X] = photo.currentPosition[X] + (photo.transitionSpeed * (-1 * photo.initialPosition[X]));
	photo.currentPosition[Y] = photo.currentPosition[Y] + (photo.transitionSpeed * (-1 * photo.initialPosition[Y]));
};

function checkForCompletedTransition(photo) {
    if (photo.initialPosition === LEFT) {
		if (photo.centered) {
            if (photo.currentPosition[X] >= ((canvas.slideshow.width - photo.drawWidth) / 2)) {
                photo.transitionInIsComplete = true;
			};
        } else {
			let finalPosition = 0;
				
			if (screenOrientation === LANDSCAPE && photo.textOnRight === false) {
				finalPosition += textLineWidth;	
			};

            if (photo.currentPosition[X] >= finalPosition) {
                photo.transitionInIsComplete = true;
            };
        };
    } else if (photo.initialPosition === RIGHT) {         
		if (!photo.hasText) {
            if (photo.currentPosition[X] <= ((canvas.slideshow.width - photo.drawWidth) / 2)) {
                photo.transitionInIsComplete = true;					
            };
        } else {
            if (photo.currentPosition[X] <= 0) {
                photo.transitionInIsComplete = true;		
            };
        };
    } else { 
		if (canvas.slideshow.getContext("2d").globalAlpha >= OPAQUE) {
			photo.transitionInIsComplete = true;
		};
	};
};
