let skywritingHasFaded = false;

function animate() 
{
	window.requestAnimationFrame(animate);

	if (animationStep === 0)
	{
		pauseFor(150);
		animationStep++;
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
		if (!skywritingHasFaded) {
			document.getElementById("skywritingTapCanvas").getContext("2d").globalAlpha = 0.0;
			document.getElementById("skywritingCanvas").getContext("2d").globalAlpha = 0.0;
			skywritingHasFaded = true;
		};

		pauseFor(25);
	};

    if (animationStep === 5)
    {
        slideShow();
    };

	if (animationStep === 6)
	{
		pauseFor(300);
	};

	if (animationStep === 7)
	{
		showContact();
	};

	if (animationStep === 8)
	{
		pauseFor(3000);
	};

	if (animationStep === 9)
	{
		fadeContact();
	};
};
