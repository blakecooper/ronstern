
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
		pauseFor(150);
	};

	if (animationStep === 3)
	{
		fadeTitle();
	};

	if (animationStep === 4)
	{
		pauseFor(25);
	};

    if (animationStep === 5)
    {
        slideShow();
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
				if (photo.extraTall === true)
				{
					photo.drawHeight = canvas.slideshow.height;
				photo.drawWidth = photo.photo.width/(photo.photo.height/canvas.slideshow.height);
				} else {
					photo.drawWidth = canvas.slideshow.width;
           			photo.drawHeight = photo.photo.height/(photo.photo.width/canvas.slideshow.width);
        		};
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

		if (photo.hasCaption)
		{
			captionLocation = photo.drawHeight;
		};
        photo.x = canvas.slideshow.width * photo.initialPosition[X];
        photo.y = canvas.slideshow.height * photo.initialPosition[Y];
        
		//Ron wants the picture of the three kids lower on the screen
		if (photoCounter === 13 && screenOrientation === PORTRAIT) {
			photo.y + (photo.drawHeight/2);
		};
		photo.hasNotBeenDrawnYet = false;
    };
    
    //fade in text at the same time
    if (!photo.hasNotBeenDrawnYet && image.slideshow[photoCounter].hasText)
    {
    	drawText(photo);
		
	} else {
		text[photoCounter].transitionOutIsComplete = true;
	};

	//position on side of canvas as desired
    canvas.slideshow.getContext("2d").drawImage(
		photo.photo,
		photo.x,
		photo.y,
		photo.drawWidth,
		photo.drawHeight
	);

    if (photo.transitionInIsComplete) {
	
	//once transition is complete, start timer and mark transition complete
        timer++;
    
	if (photoCounter === 2)
	{
		drawArrow(photo);
	};
	
	} else {
    //update position according to final position desired
        photo.x = photo.x + (photo.transitionSpeed * (-1 * photo.initialPosition[X]));
        photo.y = photo.y + (photo.transitionSpeed * (-1 * photo.initialPosition[Y]));

        if (photo.initialPosition === LEFT)
        {
            //Ron wants these two photos centered
            if (photo.centered)
            {
                if (photo.x >= ((canvas.slideshow.width - photo.drawWidth) / 2)) {
                    photo.transitionInIsComplete = true;
					
					if (photo.hasCaption)
					{
						viewCaption(photo);
					};
                
				}
            } else {
	
				let finalPosition = 0;
				if (screenOrientation === LANDSCAPE && photo.textOnRight === false)
				{
					finalPosition += textLineWidth;	
				};

                if (photo.x >= finalPosition)
                {
                    photo.transitionInIsComplete = true;
		
					if (photo.hasCaption)
					{
						viewCaption(photo);
					};
                };
            };
        } else if (photo.initialPosition === RIGHT)
        {
            if (!photo.hasText)
            {
                if (photo.x <= ((canvas.slideshow.width - photo.drawWidth) / 2)) {
                    photo.transitionInIsComplete = true;
					if (photo.hasCaption)
					{
						viewCaption(photo);
					};
                };
            } else {
                if (photo.x <= 0)
                {
                    photo.transitionInIsComplete = true;
					if (photo.hasCaption)
					{
						viewCaption(photo);
					};
                };
            };
        } else if (photo.initialPosition === UP)
        {
            if (photo.y > photo.finalPosition[Y]) 
            {
                photo.transitionInIsComplete = true;
					if (photo.hasCaption)
					{
						viewCaption(photo);
					};
            };
        } else if (photo.initialPosition === DOWN)
        {
            if (photo.y < photo.finalPosition[Y])
            {
                photo.transitionInIsComplete = true;
					if (photo.hasCaption)
					{
						viewCaption(photo);
					};
            };
        };
    };

    //after timer, advance slideshow by one
    if (timer > photo.duration && !photo.transitionOutIsComplete)
    {

		if (photoCounter === 2)
		{
			clearArrow();
		};

		if (photo.hasCaption) 
		{
			hideCaption(photo);
		};

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

function viewCaption (photo)
{
	let caption = document.getElementById("caption" + photo.captionID);
	
	caption.style.top = photo.drawHeight + 'px';
	caption.style.right = (window.innerWidth - photo.drawWidth + 20) + 'px';

	if (caption.style.display === "none")
	{
		caption.style.display = "inline";
	};
};

function hideCaption (photo)
{
	let caption = document.getElementById("caption" + photo.captionID);
	if (caption.style.display === "inline")
	{
		caption.style.display = "none";
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

function drawArrow(photo)
{

	let arrow = document.getElementById("arrowImage");
	let arrowCanvas = document.getElementById("arrowCanvas");
	//size canvas to photo
	arrowCanvas.width = photo.drawWidth;
	arrowCanvas.height = photo.drawHeight;
	//draw arrow at bottom
	arrowCanvas.getContext("2d").drawImage(
		arrow,
		(photo.drawWidth - arrow.width),
		(photo.drawHeight - arrow.height),
		arrow.width * .5,
		arrow.heigh * .5,
	);

};

function clearArrow()
{
	let arrowCanvas = document.getElementById("arrowCanvas");

   	arrowCanvas.getContext("2d").clearRect(0,0,arrowCanvas.width,arrowCanvas.height);
};
