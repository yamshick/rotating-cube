class Polygon {
	print() {
		console.log("Polygon");
		this.vertices.forEach(point => {
				console.log(point);
				console.log(point.getX(), point.getY(), point.getZ());
			});
	}
	constructor() {
		this.vertices = [];
		for (let i = 0; i < arguments.length; i++) {
			this.vertices.push(arguments[i]);
		}
		
	}

	// ===========================================
	//				POSITIONING
	// -------------------------------------------

	moveTo(point) {
		this.vertices.forEach(vertice => vertice.add(point));
	}
	
	countCenter() {
		let center = new Point(0, 0, 0);		
		this.vertices.forEach(vertex => center = center.add(vertex));

		return center.scale(1 / this.vertices.length);
	}

	countNormal() {
		let a = this.vertices[0],
			b = this.vertices[1],
			c = this.vertices[2];

		let v = b.subtract(a),
			u = c.subtract(a);

		let v_x = v.getX(),
			v_y = v.getY(),
			v_z = v.getZ(),
			u_x = u.getX(),
			u_y = u.getY(),
			u_z = u.getZ();
				
		//   x   y   z
		// v_x v_y v_z
		// u_x u_y u_z
		
		return new Point(
			  v_y * u_z - v_z * u_y,
			-(v_x * u_z - v_z * u_x),
			  v_x * u_y - v_y * u_x
		);
	}
	
	rotateX(angle) {

		let rotatedVertices = 
				this.vertices
				.map(point => point.rotateX(angle));

		return new Polygon(...rotatedVertices);
	}

	rotateY(angle) {

		let rotatedVertices = 
				this.vertices
				.map(point => point.rotateY(angle));

		return new Polygon(...rotatedVertices);
	}

	rotateZ(angle) {

		let rotatedVertices = 
				this.vertices
				.map(point => point.rotateZ(angle));

		return new Polygon(...rotatedVertices);
	}

	// -------------------------------------------
	//				END OF POSITIONING
	// ===========================================



	// ===========================================
	//					 VIEW
	// -------------------------------------------

	drawPoints(context, radius = 3, color = "white", camera, screen) {
		this.vertices
			.forEach(vertex => 
				vertex.draw(context, 
							radius, 
							color, 
							camera, 
							screen)
			);
	}
	
	drawCenter(context, radius = 3, color = "white", camera, screen) {
		this.countCenter()
			.draw(context, 
				  radius, 
				  color,
				  camera,
				  screen);
	}
	
	fillColor(context, color = "white", camera, screen) {
		let projectedPoints = 
			this.vertices.map(point => point.perspectiveProjection(
											camera,
											screen));

		let start = projectedPoints[0];

		context.beginPath();
		context.moveTo(start.x, start.y);
		for (let i = 1; i < projectedPoints.length; i++) {
			context.lineTo(projectedPoints[i].x, projectedPoints[i].y);
		}
		context.lineTo(start.x, start.y);
		context.strokeStyle = "black";
		context.fillStyle = color;
		context.stroke();
		context.fill();		

	}

	isVisible(camera) {

		let centerToCameraVector = camera.subtract(this.countCenter());		
		return this.countNormal().scalarProduct(centerToCameraVector) > 0;
	}
	
	drawNormal(context, color = "red", camera, screen) {
		let startPoint = this.countCenter();
		let normal = this.countNormal().normalize();
		let endPoint = startPoint.add(normal);
					
		// drawing start point
		let startPointRadius = 2;
		startPoint.draw(context, 
						startPointRadius, 
						color,
						camera,
						screen);

		// drawing line
		startPoint.drawLineTo(endPoint, 
							  context, 
							  color,
							  camera,
							  screen)

		// drawing end point
		let endPointRadius = 1;
		endPoint.draw(context, 
					  endPointRadius, 
					  color,
					  camera,
					  screen);
	}

	// -------------------------------------------
	//				  END OF VIEW
	// ===========================================
}
