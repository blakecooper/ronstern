function positionAndDisplayCaption (photo) {
	let id = "caption" + photo.captionID;
	
	document.getElementById(id).style.top = (photo.drawHeight - 20) + "px";

	if (screenOrientation !== LANDSCAPE) {
		document.getElementById(id).style.right = (window.innerWidth - photo.drawWidth + 20) + 'px';
	};

	display(id);
};
