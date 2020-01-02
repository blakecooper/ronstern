const FONT = "Merriweather";
const FONT_COLOR = 'white';

let fontSize = "48";

const TEXT_FADE_SPEED = .003;
let textTimingOffset = 5;
let textTimer = 1;

let textLineWidth = 0;

function drawText(photo) {
	clearCanvas(canvas.text);
    
	if (screenOrientation === LANDSCAPE) {
        text[photoCounter].x = text[photoCounter].x + photo.drawWidth;
    };

    if (!text[photoCounter].transitionInIsComplete) {
    	
		fadeInText(photo);
    	
		if (text[photoCounter].alpha > 1) {
        	text[photoCounter].transitionInIsComplete = true;
		};
	} else {
        textTimer++;
    };

	let totalTextDuration = photo.duration + textTimingOffset + text[photoCounter].timingOffset;

    if (photo.hasDisplayed && textTimer > (totalTextDuration) && text[photoCounter].transitionInIsComplete) {
        if (!text[photoCounter].transitionOutIsComplete) {
        	fadeOutText(photo);

			//Ron wants only Scotti and the chauffeur's text to slide as it fades, opposite the photo
			if (photoCounter === 7) {
				scottsTextSliding -= .3;
			} else if (photoCounter === 1) {
				scottsTextSliding += .5;
			} else {
				scottsTextSliding = 0;
			};

    		if (text[photoCounter].alpha < 0) {
        		text[photoCounter].transitionOutIsComplete = true;
				textTimer = 0;
				scottsTextSliding = 0;
			};
		};
    };

    canvas.text.getContext("2d").globalAlpha = text[photoCounter].alpha;
	canvas.text.getContext("2d").font = fontSize + "px " + FONT;
	canvas.text.getContext("2d").fillStyle = FONT_COLOR;

	let lineWidth = window.innerWidth + 100;

	if (screenOrientation === LANDSCAPE) {
		lineWidth = lineWidth - photo.drawWidth;
	};

	const lines = wrapText(text[photoCounter].line, fontSize, lineWidth);
		
	let lineNumber = 1;	
    let photoPortraitOffset = 0;
	let photoLandscapeOffset = 0;
	let textY = getTextY(lines, photo);

    if (screenOrientation == PORTRAIT) {
        photoPortraitOffset = photo.drawHeight;
    };

	if (screenOrientation == LANDSCAPE && photo.textOnRight === true) {
		photoLandscapeOffset = photo.drawWidth;
	};

    if (textY + photoPortraitOffset + (lines.length * fontSize) > canvas.text.height) {
        canvas.text.height = text[photoCounter].y + photoPortraitOffset + (lines.length * fontSize);
    };

	for (let i = 0; i < lines.length; i++) {
		canvas.text.getContext("2d").fillText(
			lines[i], 
			20 + photoLandscapeOffset + scottsTextSliding, 
			(10 + photoPortraitOffset + (fontSize * lineNumber))
		); 
		
		lineNumber++;
	};

};

function getTextY(lines, photo) {
	let retVal = text[photoCounter].y;

	if ((lines.length * fontSize) < photo.drawHeight) {
		retVal = retVal + ((photo.drawHeight-(lines.length*fontSize))/2);
	};

	return retVal;
};

function fadeInText(photo) {
		text[photoCounter].alpha += TEXT_FADE_SPEED;
};

function fadeOutText(photo) {
    	text[photoCounter].alpha -= TEXT_FADE_SPEED;
};
