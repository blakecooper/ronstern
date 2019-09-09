function resizeCanvas() {
	for (let element in animationElements) 
	{
			animationElements[element].canvas.width = window.innerWidth;
			animationElements[element].canvas.height = window.innerHeight;
		};
	};
};
