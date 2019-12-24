function slideShow()
{

	clearCanvas(canvas.slideshow);

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

//		if (photo.hasCaption)
//		{
//			positionAndDisplayCaption(photo);
//		};
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
		display("arrowImage");
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
						positionAndDisplayCaption(photo);
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
						positionAndDisplayCaption(photo);
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
						positionAndDisplayCaption(photo);
					};
                };
            } else {
                if (photo.x <= 0)
                {
                    photo.transitionInIsComplete = true;
					if (photo.hasCaption)
					{
						positionAndDisplayCaption(photo);
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
						positionAndDisplayCaption(photo);
					};
            };
        } else if (photo.initialPosition === DOWN)
        {
            if (photo.y < photo.finalPosition[Y])
            {
                photo.transitionInIsComplete = true;
					if (photo.hasCaption)
					{
						positionAndDisplayCaption(photo);
					};
            };
        };
    };

    //after timer, advance slideshow by one
    if (timer > photo.duration && !photo.transitionOutIsComplete)
    {

		if (photoCounter === 2)
		{
			hide("arrowImage");
		};

		if (photo.hasCaption) 
		{
			hide("caption" + photo.captionID);
		};

        //TODO: right now this only works for sideways transitions
        if ((photo.x > (0-canvas.slideshow.width-100) && photo.x < canvas.slideshow.width))
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
