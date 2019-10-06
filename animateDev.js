
setInterval(animate,10);

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
        slideShow();
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
function transitionCurtain()
{
		updateTextTop();

		if (!image.textTop.isStillOnPage) {
    canvas.curtain.getContext("2d").clearRect(0,0,canvas.curtain.width,canvas.curtain.height);
    canvas.curtainBottom.getContext("2d").clearRect(0,0,canvas.curtainBottom.width,canvas.curtainBottom.height);

    //update position
    image.curtainTop.offsetPosition -= curtainDriftOffset * 2;
    image.curtainBottom.offsetPosition += curtainDriftOffset;	
	
	//update fade
	
//	let alphaTemp = alpha.curtain;
//	alpha.curtain -= .005;
//	canvas.curtain.getContext("2d").globalAlpha = alphaTemp;
//  canvas.curtainBottom.getContext("2d").globalAlpha = alphaTemp;

	if (image.curtainTop.offsetPosition + canvas.curtain.height < 0)
	{
		timer = 0;
		animationStep++;
	};

	//redraw
    canvas.curtain.getContext("2d").drawImage(image.curtainTop.photo,0,image.curtainTop.offsetPosition,canvas.curtain.width,image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    canvas.curtainBottom.getContext("2d").drawImage(image.curtainBottom.photo,0,image.curtainBottom.offsetPosition,canvas.curtain.width,image.curtainBottom.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    };
};

function fadeTitle() 
{
    timer++;

    if (timer > DEFAULT_PHOTO_DURATION) 
    {
    canvas.title.getContext("2d").clearRect(0,0,canvas.title.width,canvas.title.height);

	let alphaTemp = alpha.title;
	alpha.title -= .002;
	canvas.title.getContext("2d").globalAlpha = alphaTemp;

	if (alpha.title < 0)
	{
		animationStep++;
        timer = 0;
    };
    //redraw
    canvas.title.getContext("2d").drawImage(image.title,0,0,canvas.title.width,image.title.height/(image.title.width/canvas.title.width));

    canvas.title.getContext("2d").restore();
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
        if (document.documentElement.clientHeight > document.documentElement.clientWidth)
        {
            photo.drawWidth = canvas.slideshow.width;
            photo.drawHeight = photo.photo.height/(photo.photo.width/canvas.slideshow.width);
        } else {
            photo.drawHeight = canvas.slideshow.height;
            photo.drawWidth = photo.photo.width/(photo.photo.height/canvas.slideshow.height);
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

	//position on side of canvas as desired
    canvas.slideshow.getContext("2d").drawImage(photo.photo,photo.x,photo.y,photo.drawWidth,photo.drawHeight);

    if (photo.transitionInIsComplete) {
    //once transition is complete, start timer and mark transition complete
        timer++;
    } else {
    //update position according to final position desired
        photo.x = photo.x + (photo.transitionSpeed * (-1 * photo.initialPosition[X]));
        photo.y = photo.y + (photo.transitionSpeed * (-1 * photo.initialPosition[Y]));

        if (photo.initialPosition === LEFT)
        {
            if (photo.x >= 0)
            {
                photo.transitionInIsComplete = true;
            };
        } else if (photo.initialPosition === RIGHT)
        {
            if (photo.x <= 0)
            {
                photo.transitionInIsComplete = true;
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
};

function drawText(photo)
{
	canvas.text.getContext("2d").clearRect(0,0,canvas.text.width,canvas.text.height);
	text[photoCounter].x = textBuffer;
    if (document.documentElement.clientHeight < document.documentElement.clientWidth)
    {
        text[photoCounter].x = text[photoCounter].x + photo.drawWidth;
    };

    if (!text[photoCounter].transitionInIsComplete)
    {
        text[photoCounter].alpha += .005;
    
        if (text[photoCounter].alpha > 1)
        {
            text[photoCounter].transitionInIsComplete = true;
        };
    } else {
        textTimer++;
    };

    if (textTimer > textDuration && text[photoCounter].transitionInIsComplete)
    {
        if (!text[photoCounter].transitionOutIsComplete)
        {
            text[photoCounter].alpha -= .005;

            if (text[photoCounter].alpha < 0)
            {
                text[photoCounter].transitionOutIsComplete = true;
				textTimer = 0;
			};
        };
    };

    canvas.text.getContext("2d").globalAlpha = text[photoCounter].alpha;
	canvas.text.getContext("2d").font = fontSize + "px " + font;
	canvas.text.getContext("2d").fillStyle = 'white';

	const lines = wrapText(text[photoCounter].line);
		
	let lineNumber = 1;
	let currentLine;
	
    let photoPortraitOffset = 0;

    if (screenOrientation == PORTRAIT)
    {
        photoPortraitOffset = photo.drawHeight;
    };
	
    for (let i = 0; i < lines.length; i++)
	{
		canvas.text.getContext("2d").fillText(lines[i], text[photoCounter].x, (text[photoCounter].y + photoPortraitOffset + (fontSize * lineNumber))); 
		lineNumber++;
	};

};
