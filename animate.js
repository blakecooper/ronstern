let windPlayed = false;
let userClicked = false;
let musicIsFaded = false;

let contactIsShown = false;
let contactIsFaded = false;

//skywriting stuff... TODO: move this to settings
let skyWritingIsFadedIn = false;
let skyWritingIsFadedOut = true;
let skyWritingPlacementIsChosen = false;
let leftmostSkyWritingXPlacement = document.getElementById("skyWritingCanvas").width/5;

let bottommostSkyWritingYPlacement = document.getElementById("skyWritingCanvas").height/5 - 10;
let skyWritingXPlacement = 0;
let skyWritingYPlacement = 0;

window.requestAnimationFrame(animateSkyWriting);

function startOnClick() 
{
	userClicked = true;
	playWind();
	window.requestAnimationFrame(animate);
};

function playWind()
{
	if (!windPlayed)
	{
		document.getElementById("camera").play();
		document.getElementById("wind").play();
		windPlayed = true;
	};
};

let musicPlayed = false;

/* ANIMATION FUNCTIONS: */
function animateSkyWriting() {
	if (!userClicked) {
   		document.getElementById("skyWritingCanvas").getContext("2d").clearRect(0,0,document.getElementById("skyWritingCanvas").width,document.getElementById("skyWritingCanvas").height);

		if (skyWritingIsFadedOut) {
			//choose a random spot in the sky
			if (!skyWritingPlacementIsChosen) {
				skyWritingXPlacement = Math.floor(Math.random() * leftmostSkyWritingXPlacement);
				skyWritingYPlacement = Math.floor(Math.random() * bottommostSkyWritingYPlacement);
				skyWritingPlacementIsChosen = true;
			};
				
    		document.getElementById("skyWritingCanvas").getContext("2d").globalAlpha += .004;
				
			drawSkyWriting();	


			if (document.getElementById("skyWritingCanvas").getContext("2d").globalAlpha > .99) {
				skyWritingIsFadedIn = true;
				skyWritingIsFadedOut = false;
			};
		};

		if (skyWritingIsFadedIn) {
			
    		document.getElementById("skyWritingCanvas").getContext("2d").globalAlpha -= .004;

			drawSkyWriting();
		
			if (document.getElementById("skyWritingCanvas").getContext("2d").globalAlpha < .01) {
				skyWritingIsFadedIn = false;
				skyWritingIsFadedOut = true;
				skyWritingPlacementIsChosen = false;
			};
		};

		window.requestAnimationFrame(animateSkyWriting);
			
	} else {
		if (document.getElementById("skyWritingCanvas").getContext("2d").globalAlpha > .01) {
	   		document.getElementById("skyWritingCanvas").getContext("2d").clearRect(0,0,document.getElementById("skyWritingCanvas").width,document.getElementById("skyWritingCanvas").height);
    	
			document.getElementById("skyWritingCanvas").getContext("2d").globalAlpha -= .004;
			drawSkyWriting();
			window.requestAnimationFrame(animateSkyWriting);
		} else {
	   		document.getElementById("skyWritingCanvas").getContext("2d").clearRect(0,0,document.getElementById("skyWritingCanvas").width,document.getElementById("skyWritingCanvas").height);	
		};
	};
};

function drawSkyWriting() {
	let skyWritingOriginalWidth = document.getElementById("skyWriting").width;

  	document.getElementById("skyWritingCanvas").getContext("2d").drawImage(
		document.getElementById("skyWriting"),
		leftmostSkyWritingXPlacement,
		bottommostSkyWritingYPlacement,
		document.getElementById("skyWritingCanvas").width * .80,
		document.getElementById("skyWriting").height * (document.getElementById("skyWritingCanvas").width * .6)/skyWritingOriginalWidth,
	);
};

function animate() 
{
	window.requestAnimationFrame(animate);
	if (animationStep === 0)
	{
		pauseFor(150);
	};
		
	if (animationStep === 1)
	{
		transitionCurtain();
	};

	if (animationStep === 2)
	{
		if (!musicPlayed)
		{
			document.getElementById("music").play();
			musicPlayed = true;
		};
		pauseFor(100);
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

	if (animationStep === 6)
	{
		pauseFor(250);
	};

	if (animationStep === 7)
	{
		showContact();
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
   	canvas.curtain.getContext("2d").clearRect(0,0,canvas.curtain.width,canvas.curtain.height);
   	canvas.curtainBottom.getContext("2d").clearRect(0,0,canvas.curtainBottom.width,canvas.curtainBottom.height);
		
	//update position
   	image.curtainTop.offsetPosition -= curtainDriftOffset * 1.5;
   	image.curtainBottom.offsetPosition += curtainDriftOffset;	
	//TODO: change that 40 to something relative to size of curtainTop
	if (image.curtainTop.offsetPosition + canvas.curtain.height +100 < 0)
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

//		if (photo.hasCaption)
//		{
//			viewCaption(photo);
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

function viewCaption (photo)
{
	let caption = document.getElementById("caption" + photo.captionID);
	
	document.getElementById("caption" + photo.captionID).style.top = (photo.drawHeight - 20) + "px";

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
	document.getElementById("arrowImage").style.display = "inline";

};

function clearArrow()
{
	document.getElementById("arrowImage").style.display = "none";
};

function showContact() 
{
	if (!contactIsShown) {
		let contactOriginalHeight = document.getElementById("contactPage").height;
		let contactOriginalWidth = document.getElementById("contactPage").width;

		if (screenOrientation === LANDSCAPE)
		{
			document.getElementById("contactPage").weight = window.innerWidth;
			document.getElementById("contactPage").height = document.getElementById("contactPage").width*(contactOriginalHeight/contactOriginalWidth);
		} else {
			document.getElementById("contactPage").height = window.innerHeight;
			document.getElementById("contactPage").width = document.getElementById("contactPage").height/(contactOriginalHeight/contactOriginalWidth);	
		};
		
		document.getElementById("contact").style="display:inline;";
		contactIsShown = true;
	};

	if (!contactIsFaded) {
		fadeContact();
	};
};

function fadeContact() {
	if(!contactIsFaded) {
		let opacity = parseFloat(document.getElementById("contact").style.opacity);
		opacity -= .01;
		document.getElementById("contact").style.opacity = opacity;
		if (opacity < 0) {
			contactIsFaded = true;
		};
	}; 
};

function fadeMusic() {
	if(!musicIsFaded) {
		let volume = parseFloat(document.getElementById("music").volume);
		volume -= .01;
		document.getElementById("music").volume = volume;
		if (volume < 0) {
			contactIsFaded = true;
		};
	}; 
};
