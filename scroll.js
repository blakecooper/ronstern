	const canvas = document.getElementById("layer2");
    var FONT_SIZE = 30;
    var FONT_PADDING = 0;
    var FONT_X_POS = canvas.width;
    var FONT_Y_POS = canvas.height;

	var lines = [
        "While I've",
        "down loads from the cloud,",
        "I'm not completely out of the",
        "woods just yet...",
        "(site coming soon)"
    ];
    
	var context = canvas.getContext("2d");

    context.font = FONT_SIZE + "px Arial"
    context.fillStyle = "#ffffff";

    for (var x = 0; x < lines.length; x++) {
        var line = lines[x];
        var fontX = FONT_X_POS - ((FONT_SIZE + FONT_PADDING) * line.length);
        var fontY = FONT_Y_POS - ((FONT_SIZE + FONT_PADDING) * (lines.length- x));
        context.fillText(line, fontX, fontY);
    };

