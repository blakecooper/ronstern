const animationElements = getElements();
const textTop = animationElements["textTop"];
const textBottom = animationElements["textBottom"];
const stencil = animationElements["stencil"];

window.onload = function() 
{
	drawBackground();
};

setInterval(animate,30);



/* ANIMATION FUNCTIONS: */
function drawBackground() 
{
	for (let element in animationElements) 
	{
		if (animationElements[element].isBackground) 
		{
			animationElements[element].context.drawImage(animationElements[element].image,0,0);
		};
	};
};

function animate() 
{
	if (textTop.isStillOnPage) 
	{
		updateTextTop();
	};

	if (textTop.hasReachedBreakPoint) 
	{
		flipSkyAndRoad();		
		updateTextBottom();
	};

	if (textBottom.hasReachedBreakPoint)
	{	
		updateStencil();
	};				
};

function updateTextTop()
{
	clear(textTop);
	
	draw(textTop.image,textTop.position.X-100,textTop.position.Y);
	
	move(textTop, -0.1, -1.1);	
	
	//The opacity of the scrolling top text is a function of its vertcal position on the page.
	textTop.context.globalAlpha = textTop.position.Y / textTop.canvas.height;
	
	if (!textTop.hasReachedBreakPoint && textTop.position.Y < textTop.canvas.height/2) 
	{
		textTop.hasReachedBreakPoint = true;
	} else if (textTop.position.Y < -500) {
		textTop.isStillOnPage = false;
	};
};

function flipSkyAndRoad() 
{
	animationElements.sky.canvas.style.zIndex = "4";
	animationElements.road.canvas.style.zIndex = "2";
};

function updateTextBottom() 
{
	clear(textBottom);

    if(!textBottom.hasBeenDrawn) 
	{
		swing();

        textBottom.rotationInDegrees = 0;
        textBottom.hasBeenDrawn = true;
    }

	draw(textBottom.image,textBottom.position.X,textBottom.position.Y,textBottom.width,textBottom.height);

	let textBottomDistanceFromBottomOfCanvas = textBottom.canvas.height - textBottom.position.Y;
	
	if (!textBottom.reachedBottomOfCanvas && textBottomDistanceFromBottomOfCanvas > 40) 
	{
		textBottom.position.Y += .3;
	} else {
		textBottom.reachedBottomOfCanvas = true;
        if (textBottom.totalSwingCounter < 9) 
		{
			updateTextBottomTilt(.01);

			tiltTextBottom();
		} else {
			if (!textBottom.hasBounced) 
			{
				textBottom.rotationInDegrees = 0;
				textBottom.hasBounced = true;
			};
			if (textBottom.numberOfBounces < 1) 
			{
				updateTextBottomTile(-.08);

				tiltTextBottom();
				if (textBottom.totalSwingCounter < 9) 
				{
					textBottom.numberOfBounces++;
				};
			} else {
				textBottom.hasReachedBreakPoint = true;
			};
    	};
	};
};

function updateStencil() {
	clear(stencil);
	stencil.context.globalAlpha = stencil.alpha;
	draw(stencil.image,38,0);	
					
	if(stencil.alpha < 1) 
	{
		stencil.alpha += .03;
	};
};
