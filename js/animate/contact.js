function showContact() 
{
	if (!contactIsShown) {
		drawContact();
		contactIsShown = true;
		animationStep++;
	};

};

function drawContact() {
		let contactOriginalHeight = document.getElementById("contactPage").height;
		let contactOriginalWidth = document.getElementById("contactPage").width;

		let	contactNewHeight = window.innerHeight;
		let	contactNewWidth = contactNewHeight/(contactOriginalHeight/contactOriginalWidth);	
			
		let centeredX = (window.innerWidth - contactNewWidth)/2;
		
		if (!contactIsFaded) {
		document.getElementById("contact").getContext("2d").drawImage(
			document.getElementById("contactPage"),
			centeredX,
			0,
			contactNewWidth,
			contactNewHeight);
		};

		document.getElementById("contactReversed").getContext("2d").drawImage(
			document.getElementById("contactReversedPage"),
			centeredX,
			0,
			contactNewWidth,
			contactNewHeight);
};	

function fadeContact() {
	if(!contactIsFaded) {
		document.getElementById("contact").getContext("2d").clearRect(0,0,window.innerWidth,window.innerHeight);

		document.getElementById("contact").getContext("2d").globalAlpha -= .004;
		drawContact();
		if (document.getElementById("contact").getContext("2d").globalAlpha < .01) {
			contactIsFaded = true;
		};
	} else {
		fadeReverseContact();
	};
};

function fadeReverseContact() {
	if(!reverseContactIsFaded) {
		document.getElementById("contactReversed").getContext("2d").clearRect(0,0,window.innerWidth,window.innerHeight);
		document.getElementById("contactReversed").getContext("2d").globalAlpha -= .004;
		drawContact();
		if (document.getElementById("contactReversed").getContext("2d").globalAlpha < .01) {
			reverseContactIsFaded = true;
		};
	}; 
};
