function fadeTitle() {

	if (!canvasIsTransparent(canvas.titleRealistic)) {
		clearCanvas(canvas.titleRealistic);
	
		//TODO: replace this with the standard fadeCanvas() function
		let alphaRealisticTemp = alpha.titleRealistic;
		alpha.titleRealistic -= .004;
		canvas.titleRealistic.getContext("2d").globalAlpha = alphaRealisticTemp;
		
		canvas.titleRealistic.getContext("2d").drawImage(image.titleRealistic.photo,0,0,canvas.titleRealistic.width,image.titleRealistic.photo.height/(image.titleRealistic.photo.width/canvas.titleRealistic.width));

		//TODO: why is this necessary only here? Hypothesis: because of the weird fading method above
    		canvas.titleRealistic.getContext("2d").restore();
	} else {

		timer++;
   
		if (timer > image.title.duration) {
			clearCanvas(canvas.title);

			//TODO: replace with fadeCanvas() method
			let alphaTemp = alpha.title;
			alpha.title -= .005;
			canvas.title.getContext("2d").globalAlpha = alphaTemp;

			if (canvasIsTransparent(canvas.title)) {
			
				hide("titleCanvas");
				hide("titleRealisticCanvas");
				
				animationStep++;
        		timer = 0;
    		};
    
			canvas.title.getContext("2d").drawImage(image.title.photo,0,0,canvas.title.width,image.title.photo.height/(image.title.photo.width/canvas.title.width));

			//TODO: again, why?
    		canvas.title.getContext("2d").restore();
    	};
	};
};
