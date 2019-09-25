
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
			textTop.context.drawImage(textTop.image,textTop.position.X-100,textTop.position.Y);
			
			//The opacity of the scrolling top text is a function of its vertcal position on the page.
			textTop.context.globalAlpha = textTop.position.Y / textTop.canvas.height;
			
			move(textTop, -0.1, -1.1);	

			if (!textTop.hasReachedBreakPoint && textTop.position.Y < textTop.canvas.height/2) 
			{
				textTop.hasReachedBreakPoint = true;
			} else if (textTop.position.Y < -500) {
				textTop.isStillOnPage = false;
			};
};
function transitionCurtain()
{
//		updateTextTop();

		timer++;

		if (timer > photoDuration) {
    canvas.curtain.getContext("2d").clearRect(0,0,canvas.curtain.width,canvas.curtain.height);
    console.log("transitionCuratin() is firing");
    //update position
    image.curtainTop.offsetPosition -= curtainDriftOffset * 2;
    image.curtainBottom.offsetPosition += curtainDriftOffset;	
	
	//update fade
	
	let alphaTemp = alpha.curtain;
	alpha.curtain -= .005;
	canvas.curtain.getContext("2d").globalAlpha = alphaTemp;

	if (image.curtainTop.offsetPosition + canvas.curtain.height < 0)
	{
		timer = 0;
		animationStep++;
	};

	//redraw
    canvas.curtain.getContext("2d").drawImage(image.curtainTop.photo,0,image.curtainTop.offsetPosition,canvas.curtain.width,image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    canvas.curtain.getContext("2d").drawImage(image.curtainBottom.photo,0,image.curtainBottom.offsetPosition,canvas.curtain.width,image.curtainBottom.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
};
};

function fadeTitle() 
{
    timer++;

    if (timer > photoDuration) 
    {
    canvas.title.getContext("2d").clearRect(0,0,canvas.title.width,canvas.title.height);

	let alphaTemp = alpha.title;
	alpha.title -= .005;
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
        console.log("drawing photo #:" + photoCounter + " for first time");
        photo.drawHeight = canvas.slideshow.height;
        photo.drawWidth = photo.photo.width/(photo.photo.height/canvas.slideshow.height);

        photo.x = canvas.slideshow.width * photo.initialPosition[X];
        photo.y = canvas.slideshow.height * photo.initialPosition[Y];
        photo.hasNotBeenDrawnYet = false;
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

        //fade in text at the same time
        drawText();

        if (photo.initialPosition === LEFT)
        {
            if (photo.x >= 0)
            {
                photo.transitionInIsComplete = true;
        console.log("transition in is complete");
            };
        } else if (photo.initialPosition === RIGHT)
        {
            if (photo.x <= 0)
            {
                photo.transitionInIsComplete = true;
        console.log("transition in is complete");
            };
        } else if (photo.initialPosition === UP)
        {
            if (photo.y > photo.finalPosition[Y]) 
            {
                photo.transitionInIsComplete = true;
        console.log("transition in is complete");
            };
        } else if (photo.initialPosition === DOWN)
        {
            if (photo.y < photo.finalPosition[Y])
            {
                photo.transitionInIsComplete = true;
        console.log("transition in is complete");
            };
        };
    };

    //after timer, advance slideshow by one
    if (timer > photoDuration && !photo.transitionOutIsComplete)
    {
        //TODO: right now this only works for sideways transitions
        if ((photo.x > (0-canvas.slideshow.width) && photo.x < canvas.slideshow.width))
        {
                photo.x = photo.x + (photo.transitionSpeed * (-1 * photo.initialPosition[X]));
                photo.y = photo.y + (photo.transitionSpeed * (-1 * photo.initialPosition[Y])); 
        } else {
            photo.transitionOutIsComplete = true;
            console.log("transition out complete");
        };
    };

    if (photo.transitionOutIsComplete)
    {
        if (photoCounter < totalPhotos)
        {
        console.log("getting new photo");
        photoCounter++;
        timer = 0;
        };
    };
};

function drawText()
{
	let line = text[photoCounter].line;
    let alphaTemp = text[photoCounter].alpha;

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

    if (textTimer > textDuration)
    {
        if (!text[photoCounter].transitionOutIsComplete)
        {
            text[photoCounter].alpha -= .005;

            if (text[photoCounter].alpha < 0)
            {
                text[photoCounter].transitionOutIsComplete = true;
            };
        };
    };

    if (!text[photoCounter].transitionOutIsComplete)
    {
        canvas.text.getContext("2d").globalAlpha = alphaTemp;
        canvas.text.getContext("2d").font = "30px Arial";
		canvas.text.getContext("2d").fillStyle = 'white';

		const lines = wrapText(line);
			
		let lineNumber = 1;
		for (line in lines)
		{
			canvas.text.getContext("2d").fillText(line, (text[photoCounter].x + (30 * lineNumber)), text[photoCounter].y); 
			lineNumber++;
		}
		;
	};
};
