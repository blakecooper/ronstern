const animationElements = getElements();

let firstPhotoLoaded = false;
let animationStep = 1;

window.onload = function() 
{
    sizeCanvas();
    drawTitleAndCurtains();
};

let animateCurtainVar;

animate();

function drawTitleAndCurtains()
{
    canvas.curtain.getContext("2d").drawImage(image.curtainTop.photo,0,0,canvas.curtain.width,image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    canvas.curtain.getContext("2d").drawImage(image.curtainBottom.photo,0,0,canvas.curtain.width,image.curtainBottom.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    canvas.title.getContext("2d").drawImage(image.title,0,0,canvas.curtain.width,image.title.height/(image.title.width/canvas.title.width));
};

setInterval(animate(),30);

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
};

function fadeTitle() 
{
    canvas.title.getContext("2d").clearRect(0,0,canvas.title.width,canvas.title.height);
	
	let alphaTemp = alpha.title;
	alpha.title -= .005;

	if (alpha.title < 0)
	{
		animationStep++;
	};
	//redraw
    canvas.title.getContext("2d").drawImage(image.title,0,0,canvas.title.width,image.title.height/(image.title.width/canvas.title.width));
};

function transitionCurtain()
{
    canvas.curtain.getContext("2d").clearRect(0,0,canvas.curtain.width,canvas.curtain.height);

    //update position
    image.curtainTop.offsetPosition -= curtainDriftOffset * 2;
    image.curtainBottom.offsetPosition += curtainDriftOffset;	
	
	//update fade
	
	let alphaTemp = alpha.curtain;
	alpha.curtain -= .005;
	canvas.curtain.getContext("2d").globalAlpha = alphaTemp;

	if (image.curtainTop.offsetPosition + canvas.curtain.height < 0)
	{
		animationStep++;
	};

	//redraw
    canvas.curtain.getContext("2d").drawImage(image.curtainTop.photo,0,image.curtainTop.offsetPosition,canvas.curtain.width,image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
    canvas.curtain.getContext("2d").drawImage(image.curtainBottom.photo,0,image.curtainBottom.offsetPosition,canvas.curtain.width,image.curtainBottom.photo.height/(image.curtainTop.photo.width/canvas.curtain.width));
};


function throwaway()
{
    if (transitionIsComplete) 
    {
        if (timer > photoDuration)
        {
            timer = 0;
            transitionIsComplete = false;
        } else {
            drawPhoto();
            drawText();
            timer++;
        };
    } else {
        nextPhoto(photoCounter);
    };

};

function nextPhoto(photoNumber)
{
    if (photoCounter < totalPhotos + 1)
    {
        transitionIsComplete = false;
        if (!transitionIsComplete)
        {
            if (firstPhotoLoaded)
            {
                if (transitionState == OUT)
                {
                    fadeOut();
                };
            };

            if (transitionState == IN) 
            {
                fadeIn();
            };
        };
    };
};

function fadeOut()
{
    const photo = getCurrentPhoto();
    const text = animationElements["textElement"];

    photo.alpha -= .005;
    text.alpha -= .005;

    drawPhoto();
    drawText();
    
    if (photo.alpha < 0)
    {
        photoCounter++;
        document.getElementById("photo1Canvas").style="display: none;";
//        swapCanvases();
        sizeCanvas();
        transitionState = IN;
    };
};

function fadeIn()
{
    let photo = getCurrentPhoto();

    photo.alpha += .005;


    drawPhoto();
    drawText();
    
    if (photo.alpha > 1) 
    {
        transitionState = OUT;
        transitionIsComplete = true;
        firstPhotoLoaded = true;

    };
};

function drawPhoto()
{
    let photo = getCurrentPhoto();

    clear(photo);
    photo.context.imageSmoothingEnabled = true;
    photo.context.globalAlpha = photo.alpha;
    photo.context.drawImage(photo.image,0,0,photo.canvas.width,(photo.canvas.width * (photo.image.height / photo.image.width)));
};

function drawText()
{
    let photo = getCurrentPhoto();
    if (photoCounter > 1 && (photoCounter) < text.length+1)
	{
		let line = text[photoCounter-2];
    	let textDrawing = animationElements["textElement"];

    	clear(textDrawing);  
    	textDrawing.context.globalAlpha = photo.alpha;
    	textDrawing.context.font = "30px Arial";
	
		let heightOfCanvas = textDrawing.canvas.height/2;
		let widthOfCanvas = (textDrawing.canvas.width/2)-200;

		if ((line.length * 30) > (textDrawing.canvas.width -widthOfCanvas)) 
		{
			let separateLines = (line.length * 30) / (textDrawing.canvas.width - widthOfCanvas);
			let roughCharsPerLine = line.length / separateLines;
			let begOfNewSubstr = 0;
			for (let i = 0; i < separateLines; i++) 
			{
				let beginningOfSubstr = begOfNewSubstr;
				let endOfSubstr = (i+1) * roughCharsPerLine;
				while (endOfSubstr > (i * roughCharsPerLine)  && line.charAt(endOfSubstr) !== ' ')
				{
					endOfSubstr--;
				}
				begOfNewSubstr = endOfSubstr + 1;

				textDrawing.context.fillText(line.substr(beginningOfSubstr, endOfSubstr), widthOfCanvas, heightOfCanvas);
				heightOfCanvas += 30;
			}
		} else {
  		  	textDrawing.context.fillText(line,textDrawing.canvas.width/2,textDrawing.canvas.height/2);
		};
	};
};

function getCurrentPhoto()
{
	if (photoCounter == 1) 
	{
		return animationElements["photo1"];
	} else {
    	let element = "photo" + photoCounter;
    	animationElements["slideshowPhoto"].image = document.getElementById(element);
		return animationElements["slideshowPhoto"];
	};
};

function sizeCanvas()
{
    //TODO: subtract height of navbar from the height of the canvas
    document.getElementById("curtainCanvas").width = window.innerWidth;
    document.getElementById("curtainCanvas").height = image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);

    document.getElementById("titleCanvas").width = window.innerWidth;
    document.getElementById("titleCanvas").height = image.curtainTop.photo.height/(image.curtainTop.photo.width/canvas.curtain.width);

    document.getElementById("slideshowCanvas").width = window.innerWidth;
    document.getElementById("slideshowCanvas").height = window.innerHeight;
};
