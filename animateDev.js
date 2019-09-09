const animationElements = getElements();
const swingTop = animationElements["skySwing"];
const swingBottom = animationElements["roadSwing"];
const title = animationElements["title"];

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
	if (swingTop.isStillOnPage || swingBottom.isStillOnPage) 
	{
		updateSwing();
	};

	if (swingTop.hasReachedBreakPoint)
	{
		//fade title in over BIG RED
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
	
	if (swingTop.isStillOnPage && swingTop.degreesSwung > 140) 
	{
		swingTop.isStillOnPage = false;
	};
	
	if (swingBottom.isStillOnPage && swingBottom.degreesSwung > 45) 
	{
		swingBottom.isStillOnPage = false;
	};

	if (!swingTop.isStillOnPage && !swingBottom.isStillOnPage)
	{
		swingTop.hasReachedBreakPoint = true;
	};
};
