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


