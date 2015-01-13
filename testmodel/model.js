/**
 * Created by iantrich on 10/18/14.
 */
//global variables
var model_canvas = null;
var context = null;
var width = null;
var height = null;
function drawBackground()  {
	// Set up!
	model_canvas = document.getElementById("model");
	context = model_canvas.getContext("2d");
	width = model_canvas.clientWidth;
	ratio = model_canvas.clientHeight / 1000;
	context.clearRect ( 0 , 0 , width , ratio * 1000 );
	
	for (i = 0; i <= 500; i += 50)
	{
		if (((i*100 / 1000) % 2) == 0)
		{
			//Draw 10 yard marks across field
			context.beginPath();
			context.moveTo(0, ratio * i * 2);
			context.lineTo(width, ratio * i * 2);
			context.closePath();
			context.stroke();
		}
		else
		{
			//Draw left 5 yard mark
			context.beginPath();
			context.moveTo(0, ratio * i * 2);
			context.lineTo(width * .025, ratio * i * 2);
			context.closePath();
			context.stroke();
			
			//Draw right 5 yard mark
			
			context.beginPath();
			context.moveTo(width - (width * .025), ratio * i * 2);
			context.lineTo(width, ratio * i * 2);
			context.closePath();
			context.stroke();
		}
		
		context.lineWidth = 1;
	}
}

$("model").resize( function () {
	drawBackground();
});

function route() {
    var beginYard = 800;
    context.beginPath();
    context.moveTo(width * .5, ratio * beginYard);
    context.lineTo(width * .5, ratio * (beginYard - 200));
    context.lineTo(width * .45, ratio * (beginYard - 250));
    //context.endPath();
    context.stroke();
    
    
}