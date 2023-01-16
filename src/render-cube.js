////////////////////////////////////////////////////////////////////////////
//																	  	  //
//							INITIALIZING CUBE		 					  //
//																	  	  //
////////////////////////////////////////////////////////////////////////////


var COLORS = [
	"skyblue",
	"pink",
	"yellow",
	"cyan",
	"white",
	"magenta"
];


/*
 *	 	   Y|   /
 * 			|  /
 *	 		| /
 *	________|/________ X
 * 		   /|
 *	 	  /	|
 *	 	 /	|
 *	    /	|
 *	   Z
 * 
 * 
 * */

/*		  D1______C1
 *		  / 	  /
 * 	   A1/_____B1/|
 * 		| 		| |
 *		| D-----|-C	
 * 		|/		|/
 * 		A_______B
 * 
 * */
 
var cubeVertices = {
	//  		 [ x,  y,  z]
	A:  new Point(-1, -1,  1),
	B:  new Point( 1, -1,  1),
	C:  new Point( 1, -1, -1),
	D:  new Point(-1, -1, -1),
	A1: new Point(-1,  1,  1),
	B1: new Point( 1,  1,  1),
	C1: new Point( 1,  1, -1),
	D1: new Point(-1,  1, -1)	 
};

/*		  D1______C1
 *		  / 	  /
 * 	   A1/_____B1/|
 * 		| 		| |
 *		| D-----|-C	
 * 		|/		|/
 * 		A_______B
 * 
 * */

// consider correct orientation
var cubePolygons = (function(){
	var v = cubeVertices;
	return [
		// bottom
		new Polygon(v.A, v.D, v.C, v.B),
		// upper
		new Polygon(v.A1, v.B1, v.C1, v.D1),
		// front
		new Polygon(v.A, v.B, v.B1, v.A1),
		// back
		new Polygon(v.C, v.D, v.D1, v.C1),
		// left
		new Polygon(v.D, v.A, v.A1, v.D1),
		// right
		new Polygon(v.B1, v.B, v.C, v.C1),
	];
})();

////////////////////////////////////////////////////////////////////////////
//																		  //
//								  END OF 								  //
//							INITIALIZING CUBE		 					  //
//																	  	  //
////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////
//																	  	  //
//							SETTING RENDER ANIMATION 					  //
//																	  	  //
////////////////////////////////////////////////////////////////////////////


function renderCubeAnimation(rotationXAngle, rotationYAngle, rotationZAngle) {
	let startPhi = 0,
		deltaPhi = rotationXAngle,
		curPhi = 0,
		endPhi = 10 * Math.PI;

	let startPsi = 0,
		deltaPsi = rotationYAngle,
		curPsi = 0,
		endPsi = 10 * Math.PI;

	let startTheta = 0,
		deltaTheta = rotationZAngle,
		curTheta = 0,
		endTheta = 10 * Math.PI;
	
	let axes =  new Axes(3);

	let polyhedron = new Polyhedron(...cubePolygons);
	
	function render() {
		CONTEXT.fillStyle = 'black';
		CONTEXT.fillRect(0, 0, W, H);

		let camera = CAMERA;
		let screen = camera.scale(0.3);

		
		polyhedron = polyhedron
						.rotateX(deltaPhi)
						.rotateY(deltaPsi)
						.rotateZ(deltaTheta);
		polyhedron.drawFaces(CONTEXT, COLORS, camera, screen);
		polyhedron.drawNormals(CONTEXT, [], camera, screen);

		axes.draw(CONTEXT, ["#f00000", "#00f000", "#0000f0"], CAMERA, CAMERA.scale(0.3));
		
		if (curPhi < endPhi && curPsi < endPsi && curTheta < endTheta) {
			curPhi += deltaPhi;
			curPsi += deltaPsi;
			curTheta += deltaTheta;
			requestAnimationFrame(render);
		}
	}
	
	render();
}


// never put camera inside the cube 
var CAMERA = new Point(3, 4, 3);


////////////////////////////////////////////////////////////////////////////
//																		  //
//									END OF 								  //
//							SETTING RENDER ANIMATION 					  //
//																	  	  //
////////////////////////////////////////////////////////////////////////////



renderCubeAnimation(0.005, 0.01, 0.003);


////////////////////////////////////////////////////////////////////////////
//																	  	  //
//							SETTING CONTROLLER 						  	  //
//																	  	  //
////////////////////////////////////////////////////////////////////////////

document.addEventListener("keydown", function(event) {
	
	switch(event.key) {
		case "ArrowLeft":
			CAMERA = CAMERA.rotateY(Math.PI / 12);
			break;
		case "ArrowRight":
			CAMERA = CAMERA.rotateY(-Math.PI / 12);
			break;
		case "ArrowUp":
			if ( CAMERA.getY() < 20) {
				CAMERA = new Point(CAMERA.getX(), CAMERA.getY() + 0.3, CAMERA.getZ());
			}
			break;
		case "ArrowDown":
			if ( CAMERA.getY() > -20) {
				CAMERA = new Point(CAMERA.getX(), CAMERA.getY() - 0.3, CAMERA.getZ());
			}
			break;
		default:
			return;
	}
	
});

////////////////////////////////////////////////////////////////////////////
//																		  //
//								  END OF 								  //
//							SETTING CONTROLLER 						  	  //
//																	  	  //
////////////////////////////////////////////////////////////////////////////
