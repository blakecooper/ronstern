function drawText(photo)
{
	canvas.text.getContext("2d").clearRect(0,0,canvas.text.width,canvas.text.height);
    if (screenOrientation === LANDSCAPE)
    {
        text[photoCounter].x = text[photoCounter].x + photo.drawWidth;
    };

    if (!text[photoCounter].transitionInIsComplete)
    {
    	fadeInText(photo);
    	if (text[photoCounter].alpha > 1)
    	{
        	text[photoCounter].transitionInIsComplete = true;
		};
	} else {
        textTimer++;
    };

	let totalTextDuration = photo.duration + textTimingOffset + text[photoCounter].timingOffset;


	if (photoCounter === 4)
	{
		totalTextDuration -= 175;
	};
	
    if (textTimer > (totalTextDuration) && text[photoCounter].transitionInIsComplete)
    {
        if (!text[photoCounter].transitionOutIsComplete)
        {
        	fadeOutText(photo);

			//Ron wants only Scott's text to "slide left"
			//UPDATE: Ron just asked for it for the chauffer too
			if (photoCounter === 7)
			{
				scottsTextSliding -= .3;
			} else if (photoCounter === 1)
			{
				scottsTextSliding += .5;
			} else {
				scottsTextSliding = 0;
			};

    		if (text[photoCounter].alpha < 0)
    		{
        		text[photoCounter].transitionOutIsComplete = true;
				textTimer = 0;
				scottsTextSliding = 0;
			};
		};
    };

    canvas.text.getContext("2d").globalAlpha = text[photoCounter].alpha;
	canvas.text.getContext("2d").font = fontSize + "px " + FONT;
	canvas.text.getContext("2d").fillStyle = FONT_COLOR;

	//TODO: find out why this needs to be multiplied by two?
	let lineWidth = window.innerWidth + 100;

	if (screenOrientation === LANDSCAPE) {
		lineWidth = lineWidth - photo.drawWidth;
	};

	const lines = wrapText(text[photoCounter].line, fontSize, lineWidth);
		
	let lineNumber = 1;	
    let photoPortraitOffset = 0;
	let photoLandscapeOffset = 0;
	let textY = getTextY(lines, photo);

    if (screenOrientation == PORTRAIT)
    {
        photoPortraitOffset = photo.drawHeight;
    };

	if (screenOrientation == LANDSCAPE && photo.textOnRight === true)
	{
		photoLandscapeOffset = photo.drawWidth;
	};

    if (textY + photoPortraitOffset + (lines.length * fontSize) > canvas.text.height)
    {
        canvas.text.height = text[photoCounter].y + photoPortraitOffset + (lines.length * fontSize);
    };

	//TODO: use a better indicated that '80' for the max number of characters in a line
//	if (20 + photoLandscapeOffset + (80 * fontSize) > canvas.text.width)
//	{
//		canvas.text.width = 20 + photoLandscapeOffset + (80 * fontSize);
//	};

	for (let i = 0; i < lines.length; i++)
	{
		if ((lines[i].length * fontSize) > textLineWidth)
		{
			textLineWidth = (lines[i].length * fontSize) * .6;
		};

		canvas.text.getContext("2d").fillText(lines[i], 20 + photoLandscapeOffset + scottsTextSliding, (10 + photoPortraitOffset + (fontSize * lineNumber))); 
		lineNumber++;
	};

};

function getTextY(lines, photo)
{
	let retVal = text[photoCounter].y;

	if ((lines.length * fontSize) < photo.drawHeight)
	{
		retVal = retVal + ((photo.drawHeight-(lines.length*fontSize))/2);
	};

	return retVal;
};

function fadeInText(photo)
{
		text[photoCounter].alpha += TEXT_FADE_SPEED;
    
};

function fadeOutText(photo)
{
    	text[photoCounter].alpha -= TEXT_FADE_SPEED;
};

function setTextStyle()
{
};
