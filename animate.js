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

function flipSkyAndRoad() 
{
	animationElements.sky.canvas.style.zIndex = "4";
	animationElements.road.canvas.style.zIndex = "2";
};

function updateTextBottom() {
	clear(textBottom);

    if(!textBottom.hasBeenDrawn) 
	{
        textBottom.context.translate(textBottom.position.X,textBottom.position.Y);
        textBottom.context.rotate(textBottom.rotationInDegrees * Math.PI / 180);
        textBottom.context.translate(-(textBottom.position.X),-(textBottom.position.Y));    
        textBottom.rotationInDegrees = 0;
        textBottom.hasBeenDrawn = true;
    }

	textBottom.context.drawImage(textBottom.image,textBottom.position.X,textBottom.position.Y,textBottom.width,textBottom.height);
	
	if (!textBottom.reachedBottomOfCanvas && textBottom.canvas.height - textBottom.position.Y > 40) 
	{
		textBottom.position.Y += .3;
	} else {
		textBottom.reachedBottomOfCanvas = true;
        if (textBottom.totalSwingCounter < textBottom.degreesToSwing) 
		{
            textBottom.totalSwingCounter += textBottom.rotationInDegrees;
            textBottom.rotationInDegrees += .01;    
            textBottom.context.translate(textBottom.position.X,textBottom.position.Y);
            textBottom.context.rotate(textBottom.rotationInDegrees * Math.PI / 180);
            textBottom.context.translate(-(textBottom.position.X),-(textBottom.position.Y));    
		} else {
			if (!textBottom.hasBounced) 
			{
				textBottom.rotationInDegrees = 0;
				textBottom.hasBounced = true;
				console.log("totalSwingCounter before first bounce = " + textBottom.totalSwingCounter);
			};
			if (textBottom.numberOfBounces < 1) 
			{
				textBottom.totalSwingCounter += textBottom.rotationInDegrees;
				textBottom.rotationInDegrees -= .10;    
				textBottom.context.translate(textBottom.position.X,textBottom.position.Y);
        	   	textBottom.context.rotate(textBottom.rotationInDegrees * Math.PI / 180);
    	       	textBottom.context.translate(-(textBottom.position.X),-(textBottom.position.Y));
		
				if (textBottom.totalSwingCounter < textBottom.degreesToSwing) 
				{
					textBottom.numberOfBounces++;
					console.log("totalSwingCounter beginning bounce number " + textBottom.numberOfBounces + " = " + textBottom.totalSwingCounter);
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
	stencil.context.drawImage(stencil.image,35,0);	
					
	if(stencil.alpha < 1) 
	{
		stencil.alpha += .03;
	};
};
