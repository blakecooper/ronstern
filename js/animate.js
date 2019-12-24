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
		animationStep++;
	};

	if (animationStep === 3)
	{
		fadeTitle();
	};

	if (animationStep === 4)
	{
		pauseFor(25);
		animationStep++;
	};

    if (animationStep === 5)
    {
        slideShow();
    };

	if (animationStep === 6)
	{
		pauseFor(150);
		animationStep++;
	};

	if (animationStep === 7)
	{
		showContact();
	};

	if (animationStep === 8)
	{
		pauseFor(8000);
		animationStep++;
	};

	if (animationStep === 9)
	{
		fadeContact();
	};
};