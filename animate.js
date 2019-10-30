
setInterval(animate,33);

/* ANIMATION FUNCTIONS: */
function animate() 
{
	if (animationStep === 1)
	{
		transitionCurtain();
	};

	if (animationStep === 2)
	{
		fadeTitle();
	};

	if (animationStep === 3)
	{
		pauseFor(50);
	};

    if (animationStep === 4)
    {
        slideShow();
    };
	
	if (animationStep === 5)
	{
		document.getElementById("canvases").style["display"] = "none";
		document.getElementById("gallery").style["display"] = "inline";
	};
};

function pauseFor(time) 
{
	timer++;
		if (timer > time)
		{
			timer = 0;
				animationStep++;
		};
};

function transitionCurtain()
{
//	updateTextTop();
    timer++;

	//TODO: shouldn't this be related to the position of the text on the page, not an arbitrary timing?
    if (timer > 150)
    {
       image.textTop.isStillOnPage = false;
    };
	
	if (!image.textTop.isStillOnPage) 
	{
   		canvas.curtain.getContext("2d").clearRect(0,0,canvas.curtain.width,canvas.curtain.height);
   		canvas.curtainBottom.getContext("2d").clearRect(0,0,canvas.curtainBottom.width,canvas.curtainBottom.height);
		
		//update position
   		image.curtainTop.offsetPosition -= curtainDriftOffset * 1.5;
   		image.curtainBottom.offsetPosition += curtainDriftOffset;	

		if (image.curtainTop.offsetPosition + canvas.curtain.height < 0)
		{
			timer = 0;
			animationStep++;
		};
		//redraw
   		canvas.curtain.getContext("2d").drawImage(
			image.curtainTop.photo,
			0,
			image.curtainTop.offsetPosition,
			canvas.curtain.width,
			image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width)
		);
   		canvas.curtainBottom.getContext("2d").drawImage(
			image.curtainBottom.photo,
			0,
			image.curtainBottom.offsetPosition,
			canvas.curtain.width,
			image.curtainBottom.photo.height/(image.curtainTop.photo.width/canvas.curtain.width)
		);
   	};
};
function updateTextTop()
{
	textTop.context.clearRect(0,0,textTop.canvas.width,textTop.canvas.height);
	//TODO: figure out why custom draw() function isn't working
    //
            if(!image.textTop.initialPositionHasBeenSet) 
            {
                image.textTop.position.X = document.getElementById("scrollTextCanvas").width/2-100;
                image.textTop.position.Y = document.getElementById("scrollTextCanvas").height;
                image.textTop.initialPositionHasBeenSet = true;
            };

			canvas.scrollText.getContext("2d").drawImage(image.textTop.image,image.textTop.position.X-100,image.textTop.position.Y);
			
			//The opacity of the scrolling top text is a function of its vertcal position on the page.
			canvas.scrollText.getContext("2d").globalAlpha = image.textTop.position.Y / canvas.scrollText.height;
			
			move(image.textTop, -0.1, -1.1);	

			if (!image.textTop.hasReachedBreakPoint && image.textTop.position.Y < canvas.scrollText.height/2+100) 
			{
				image.textTop.hasReachedBreakPoint = true;
			} else if (image.textTop.position.Y < 100) {
				image.textTop.isStillOnPage = false;
			};
};


function slideShow()
{

    canvas.slideshow.getContext("2d").clearRect(0,0,canvas.slideshow.width, canvas.slideshow.height);

    //for each numbered photo in slideshow
    var photo = image.slideshow[photoCounter];

    //if the photo hasn't been drawn yet, size it and save the drawing
    if (photo.hasNotBeenDrawnYet)
    {
        if (screenOrientation === PORTRAIT)
        {
			if (photo.fullScreen === true)
			{
				photo.drawHeight = canvas.slideshow.height;
				photo.drawWidth = photo.photo.width/(photo.photo.height/canvas.slideshow.height);

			} else {
				photo.drawWidth = canvas.slideshow.width;
           		photo.drawHeight = photo.photo.height/(photo.photo.width/canvas.slideshow.width);
        	};
		} else {
        	if (photo.fullScreen === true)
			{
				photo.drawWidth = canvas.slideshow.width;
           		photo.drawHeight = photo.photo.height/(photo.photo.width/canvas.slideshow.width);
			} else {

				photo.drawHeight = canvas.slideshow.height;
				photo.drawWidth = photo.photo.width/(photo.photo.height/canvas.slideshow.height);
        
	
				if (photo.extraWide === true)
				{
					photo.drawHeight = photo.drawHeight * .75;
					photo.drawWidth = photo.drawWidth * .75;
				};
			};
		};

        photo.x = canvas.slideshow.width * photo.initialPosition[X];
        photo.y = canvas.slideshow.height * photo.initialPosition[Y];
        photo.hasNotBeenDrawnYet = false;
    };
    
    //fade in text at the same time
    if (!photo.hasNotBeenDrawnYet)
    {
    drawText(photo);
    };

	let photoXPos = photo.x;

	if (screenOrientation === LANDSCAPE && photo.textOnRight === false)
	{
		//TODO: replace with an actual relative text width offset
		photoXPos = photoXPos + 600;
	};

	//position on side of canvas as desired
    canvas.slideshow.getContext("2d").drawImage(
		photo.photo,
		photoXPos,
		photo.y,
		photo.drawWidth,
		photo.drawHeight
	);

    if (photo.transitionInIsComplete) {
    //once transition is complete, start timer and mark transition complete
        timer++;
    } else {
    //update position according to final position desired
        photo.x = photo.x + (photo.transitionSpeed * (-1 * photo.initialPosition[X]));
        photo.y = photo.y + (photo.transitionSpeed * (-1 * photo.initialPosition[Y]));

        if (photo.initialPosition === LEFT)
        {
            //Ron wants these two photos centered
            if (photoCounter === 4 || photoCounter === 6)
            {
                if (photo.x >= ((canvas.slideshow.width - photo.drawWidth) / 2)) {
                    photo.transitionInIsComplete = true;
                }
            } else {
                if (photo.x >= 0)
                {
                    photo.transitionInIsComplete = true;
                };
            };
        } else if (photo.initialPosition === RIGHT)
        {
            if (photoCounter === 4 || photoCounter === 6)
            {
                if (photo.x <= ((canvas.slideshow.width - photo.drawWidth) / 2)) {
                    photo.transitionInIsComplete = true;
                };
            } else {
                if (photo.x <= 0)
                {
                    photo.transitionInIsComplete = true;
                };
            };
        } else if (photo.initialPosition === UP)
        {
            if (photo.y > photo.finalPosition[Y]) 
            {
                photo.transitionInIsComplete = true;
            };
        } else if (photo.initialPosition === DOWN)
        {
            if (photo.y < photo.finalPosition[Y])
            {
                photo.transitionInIsComplete = true;
            };
        };
    };

    //after timer, advance slideshow by one
    if (timer > photo.duration && !photo.transitionOutIsComplete)
    {
        //TODO: right now this only works for sideways transitions
        if ((photo.x > (0-canvas.slideshow.width) && photo.x < canvas.slideshow.width))
        {
                photo.x = photo.x + (photo.transitionSpeed * (-1 * photo.initialPosition[X]));
                photo.y = photo.y + (photo.transitionSpeed * (-1 * photo.initialPosition[Y])); 
        } else {
			if (text[photoCounter].transitionOutIsComplete === true)
			{
            	photo.transitionOutIsComplete = true;
        	};
		};
    };

    if (photo.transitionOutIsComplete)
    {
        if (photoCounter < totalPhotos)
        {
        photoCounter++;
        timer = 0;
        };
    };
	
	if (photoCounter === totalPhotos)
	{
		animationStep++;
	};
};

function drawText(photo)
{
	canvas.text.getContext("2d").clearRect(0,0,canvas.text.width,canvas.text.height);
    if (screenOrientation === LANDSCAPE)
    {
        text[photoCounter].x = text[photoCounter].x + photo.drawWidth;
    };

    if (!text[photoCounter].transitionInIsComplete)
    {
    	fadeInText();
    	if (text[photoCounter].alpha > 1)
    	{
        	text[photoCounter].transitionInIsComplete = true;
		};
	} else {
        textTimer++;
    };

    if (textTimer > (photo.duration + textTimingOffset) && text[photoCounter].transitionInIsComplete)
    {
        if (!text[photoCounter].transitionOutIsComplete)
        {
        	fadeOutText();
    		if (text[photoCounter].alpha < 0)
    		{
        		text[photoCounter].transitionOutIsComplete = true;
				textTimer = 0;
			};
		};
    };

    canvas.text.getContext("2d").globalAlpha = text[photoCounter].alpha;
	canvas.text.getContext("2d").font = fontSize + "px " + FONT;
	canvas.text.getContext("2d").fillStyle = FONT_COLOR;

	const lines = wrapText(text[photoCounter].line, photo.drawWidth);
		
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
		canvas.text.getContext("2d").fillText(lines[i], 20 + photoLandscapeOffset, (textY + photoPortraitOffset + (fontSize * lineNumber))); 
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

function fadeInText()
{
	text[photoCounter].alpha += TEXT_FADE_SPEED;
    
};

function fadeOutText()
{
    text[photoCounter].alpha -= TEXT_FADE_SPEED;

};

function setTextStyle()
{
};
