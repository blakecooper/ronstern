const animationElements = getElements();
const swingTop = animationElements["skySwing"];
const swingBottom = animationElements["roadSwing"];
const title = animationElements["title"];
const stencil = animationElements["stencil"];
const textBottom = animationElements["textBottom"];
let underConstructionSignHasChanged = false;

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

	if (!underConstructionSignHasChanged) {
		changeUnderConstructionSign();
	}

	if (counter > 300 && (swingTop.isStillOnPage || swingBottom.isStillOnPage)) 
	{
		updateSwing();
	};

	if (swingTop.hasReachedBreakPoint)
	{
		drawTitle();
	};

	counter++;
};

function changeUnderConstructionSign() 
{

	if (!textBottom.hasBeenDrawn)
	{
		textBottom.context.drawImage(textBottom.image,543,504,textBottom.width,textBottom.height);
		textBottom.hasBeenDrawn = true;
	}
	
	clear(stencil);	
	
	stencil.context.drawImage(stencil.image,0,0);

	if (counter > 50) {
		clear(textBottom);
		clear(stencil);
	}

	if (counter < 250)
	{
		if (counter > 100 && counter % 25 == 0) {
			clear(textBottom);
		} else if (counter > 100 && counter % 200 != 0) {
			textBottom.image = document.getElementById("nowOnlineImg");
			textBottom.context.drawImage(textBottom.image,543,504,textBottom.width,textBottom.height);
		};
	} else {
		clear(textBottom);
		underConstructionSignHasChanged = true;
	};
};

function updateSwing()
{
	clear(swingTop);
	clear(swingBottom);

	swingTop.position.X -= 0.8;
	swingTop.position.Y -= 1.5;

	swingTop.context.translate(swingTop.swingPointX, swingTop.swingPointY);
	swingTop.context.rotate(swingTop.rotationInDegrees * Math.PI / 180);
	swingTop.context.translate(-swingTop.swingPointX, -swingTop.swingPointY);
	
	swingBottom.context.translate(swingBottom.swingPointX, swingBottom.swingPointY);
	swingBottom.context.rotate(swingBottom.rotationInDegrees * Math.PI / 180);
	swingBottom.context.translate(-swingBottom.swingPointX, -swingBottom.swingPointY);
	
	swingTop.degreesSwung -= swingTop.rotationInDegrees;
	swingBottom.degreesSwung += swingBottom.rotationInDegrees;

	swingTop.context.drawImage(swingTop.image,swingTop.position.X,swingTop.position.Y);
	swingBottom.context.drawImage(swingBottom.image,0,0);
	
	if (swingTop.isStillOnPage && swingTop.degreesSwung > 40) 
	{
		swingTop.isStillOnPage = false;
	};
	
	if (swingBottom.isStillOnPage && swingBottom.degreesSwung > 30) 
	{
		swingBottom.isStillOnPage = false;
	};

	if (!swingTop.isStillOnPage && !swingBottom.isStillOnPage)
	{
		swingTop.hasReachedBreakPoint = true;
	};
};

function drawTitle() 
{
	title.context.drawImage(title.image,100,80,248,90);
};
