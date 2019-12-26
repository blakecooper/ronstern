function slideShow()
{

	clearCanvas(canvas.slideshow);

    var photo = image.slideshow[photoCounter];

    if (photo.hasNotBeenDrawnYet) {
		sizeAndPositionPhoto(photo);
	};
    
    if (!photo.hasNotBeenDrawnYet && image.slideshow[photoCounter].hasText) {
    	drawText(photo);		
	} else {
		text[photoCounter].transitionOutIsComplete = true;
	};

	drawPhoto(photo);

    if (photo.transitionInIsComplete) {	
        timer++;
    
		if (photoCounter === 2) {
			display("arrowImage");
		};
		
		if (photo.hasCaption) {
			positionAndDisplayCaption(photo);
		};

	} else {
        updatePhotoPosition(photo);

		checkForCompletedTransition(photo);
    };

    if (timer > photo.duration && !photo.transitionOutIsComplete) {

		if (photoCounter === 2) {
			hide("arrowImage");
		};

		if (photo.hasCaption) {
			hide("caption" + photo.captionID);
		};

        if ((photo.currentPosition[X] > (0-canvas.slideshow.width-100) && photo.currentPosition[X] < canvas.slideshow.width)) {
			updatePhotoPosition(photo);
		} else {
			if (text[photoCounter].transitionOutIsComplete === true) {
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
			photo.drawHeight = canvas.slideshow.height;
			photo.drawWidth = photo.photo.width/(photo.photo.height/canvas.slideshow.height);
       
			if (photo.extraWide === true) {
				photo.drawHeight = photo.drawHeight * .75;
				photo.drawWidth = photo.drawWidth * .75;
			};
		};
	};

    photo.currentPosition[X] = canvas.slideshow.width * photo.initialPosition[X];
    photo.currentPosition[Y] = canvas.slideshow.height * photo.initialPosition[Y];
       	
	photo.hasNotBeenDrawnYet = false;
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
    };
};
