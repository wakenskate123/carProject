const leapJS = require('leapjs-master\0.6.4.js');

// setup Leap loop with frame callback function
var controllerOptions = {};

Leap.loop(controllerOptions, function(frame){
	if (frame.hands.length > 0){
		for (var i =0; i< frame.hands.length;i++){
			var hand = frame.hands[i];
			
			currentPosition = hand.palmPosition; // get the current position of the palm
			palmWidth = currentPosition(0); // gets where the center of the palm is in the interaction box, width-wise
			palmDepth = currentPosition(2); // gets where the center of the palm is in the interaction box, depth-wise
			// where the palm is height-wise is not needed
			
			// get the width, depth, and height of the interaction box
			var interactionBox = frame.interactionBox;
			var boxX = frame.interactionBox.width;
			var boxY = frame.interactionBox.height;
			var boxZ = frame.interactionBox.depth;
			
			
			//define top area
			var topLine = (boxZ/3); //split the depth into thirds
			topLine = topLine*3; //anything past this line (2/3 the depth) is in the "top" section
			
			//define left area
			var leftLine = (boxX/3); //split the width into thirds, anything lower than this line is in the "left" section
			
			//define right area
			var rightLine = (boxX/3); //split the width into thirds
			rightLine = rightLine*2; //anything past this line (2/3 the width) is in the "right" section
			
			//define bottom area
			var bottomLine = (boxZ/3); //split the depth into thirds, anything below this line is in the "bottom" section

			//if statements determine where the hand is, and use the appropriate key
			
			if (palmDepth > topLine){
				var e = new KeyboardEvent('keydown',{'keyCode':38,'which':38}); //move car forward
			}
			else if (palmDepth < bottomLine){
				var e = new KeyboardEvent('keydown',{'keyCode':40,'which':40}); // move car backward
			}
			else if (palmDepth < topLine && palmDepth > bottomLine && palmWidth < leftLine){
				var e = new KeyboardEvent('keydown',{'keyCode':37,'which':37}); // move car to the left
			}
			else if (palmDepth < topLine && palmDepth > bottomLine && palmWidth > rightLine){
				var e = new KeyboardEvent('keydown',{'keyCode':39,'which':39}); // move car to the right
			}
		}
	}
}