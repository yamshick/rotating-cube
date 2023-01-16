class Polyhedron {
	
	constructor() {

		this.polygons = []

		for (let i = 0; i < arguments.length; i++) {
			this.polygons.push(arguments[i]);
		}
	}

	rotateX(angle) {

		let rotatedPolygons = 
			this.polygons
				.map(pol => pol.rotateX(angle));
		
		return new Polyhedron(...rotatedPolygons);
	}

	rotateY(angle) {

		let rotatedPolygons = 
			this.polygons
				.map(pol => pol.rotateY(angle));
		
		return new Polyhedron(...rotatedPolygons);
	}

	rotateZ(angle) {

		let rotatedPolygons = 
			this.polygons
				.map(pol => pol.rotateZ(angle));
		
		return new Polyhedron(...rotatedPolygons);
	}

	
	drawFaces(context, colors, camera, screen) {

		this.polygons
			.forEach((pol, index) => {
					if (pol.isVisible(camera)) {
						pol.fillColor(context, colors[index], camera, screen);
					}
			});
	}

	drawNormals(context, colors, camera, screen) {

		this.polygons
			.forEach((pol, index) => {
					if (pol.isVisible(camera)) {
						pol.drawNormal(context, colors[index], camera, screen);
					}
			});
	
	}
}
