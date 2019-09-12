const animationElements = getElements();

let firstPhotoLoaded = false;

window.onload = function() 
{
    resizeCanvas();
    transitionIsComplete = false;
};

setInterval(animate,30);

/* ANIMATION FUNCTIONS: */
function animate() 
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
        resizeCanvas();
        transitionState = IN;
    };
};

function swapCanvases()
{
    if (photoCanvas == document.getElementById("left")) {
        photoCanvas = document.getElementById("right");
    } else {
        photoCanvas = document.getElementById("left");
    };

    if (textCanvas == document.getElementById("right")) {
        textCanvas = document.getElementById("left");
    } else {
        getCanvas = document.getElementById("right");
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
    let line = text[photoCounter-2];
    let textDrawing = animationElements["textElement"];

    clear(textDrawing);  
    textDrawing.context.globalAlpha = photo.alpha;
    textDrawing.context.font = "30px Arial";
    textDrawing.context.fillText(line,textDrawing.canvas.width/2,textDrawing.canvas.height/2);
};

function getCurrentPhoto()
{
    let element = "photo" + photoCounter;
    return animationElements[element];
};

function resizeCanvas()
{
    let canvas = null;
    const text = animationElements["textElement"].canvas;
    if (photoCounter == 1) 
    {
        canvas = document.getElementById("photo1Canvas");
    } else {
        canvas = photoCanvas;
    };

    canvas.width = window.innerWidth;

    if (photoCounter > 1)
    {
        canvas.width = (canvas.width / 2) - 10;
    }

    text.width = canvas.width;
    canvas.height = canvas.width * (animationElements["photo"+photoCounter].image.height/animationElements["photo"+photoCounter].image.width);

    text.height = canvas.height;
};
