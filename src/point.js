class Point {
	print() {
		console.log("Point: ", this.getX(), this.getY(), this.getZ());
	}

	constructor(x, y, z) {
		var _x = x;
		var _y = y;
		var _z = z;

		this.getX = function() {
			return _x;
		};
		
		this.getY = function() {
			return _y;
		};
		
		this.getZ = function() {
			return _z;
		};		
	}

	copy() {
		return new Point(this.getX(), this.getY(), this.getZ());
	}
	
	add(otherPoint, scalar = 1) {
		return new Point(
			this.getX() + scalar * otherPoint.getX(),
			this.getY() + scalar * otherPoint.getY(),
			this.getZ() + scalar * otherPoint.getZ()
		);
	}
	
	scale(scalar) {
		return new Point(
			this.getX() * scalar,
			this.getY() * scalar,
			this.getZ() * scalar
		);
	}

	subtract(otherPoint) {
		return this.add(otherPoint, -1);
	}
	
	scalarProduct(otherPoint) {
		return this.getX() * otherPoint.getX() 
			 + this.getY() * otherPoint.getY() 
			 + this.getZ() * otherPoint.getZ();
	}
	
	norm()  {
		return Math.sqrt(this.scalarProduct(this));
	}

	normalize() {
		return this.scale(1 / this.norm());
	}
	
	rotateX(phi) {
		
		let x = this.getX(),
			y = this.getY(),
			z = this.getZ();
			
		return new Point(
			x,
			Math.cos(phi) * y - Math.sin(phi) * z,
			Math.sin(phi) * y +  Math.cos(phi) * z
		);
	}

	rotateY(psi) {

		let x = this.getX(),
			y = this.getY(),
			z = this.getZ();

		return new Point(
			Math.cos(psi) * x - Math.sin(psi) * z,
			y,
			Math.sin(psi) * x +  Math.cos(psi) * z
		);
	}

	rotateZ(theta) {			

		let x = this.getX(),
			y = this.getY(),
			z = this.getZ();

		return new Point(
			Math.cos(theta) * x - Math.sin(theta) * y,
			Math.sin(theta) * x +  Math.cos(theta) * y,
			z
		);
	}
	
	draw(context, radius = 3, color = "#f0f0f0", camera, screen) {
		let projectedPoint = 
			this.perspectiveProjection(camera, screen);

		// drawing circle
		context.beginPath();
		context.arc(projectedPoint.x, projectedPoint.y, radius, 0,2*Math.PI);
		context.fillStyle = color;
		context.fill();		
	}
	
	drawLineTo(point, context, color = "#f0f0f0", camera, screen) {

		let projectedStartPoint = this.perspectiveProjection(camera, screen);
		let projectedEndPoint = point.perspectiveProjection(camera, screen);

		context.beginPath();
		context.moveTo(projectedStartPoint.x, projectedStartPoint.y);
		context.lineTo(projectedEndPoint.x, projectedEndPoint.y);
		context.strokeStyle = color;
		context.stroke();
	}
	
	perspectiveProjection(camera, screen, scale = 1) {

		let cameraDistance = camera.norm();
		let screenDistance = screen.norm();


		let camX = camera.getX(),
			camY = camera.getY(),
			camZ = camera.getZ();
			
		let phi = Math.abs(Math.atan(camX / camZ));
		if (camX > 0 && camZ < 0) {
			phi = Math.PI - phi;
		} else 
		if (camX < 0 && camZ < 0) {
			phi = Math.PI + phi;
		} else 
		if (camX < 0 && camZ > 0) {
			phi = - phi;
		}

		let psi = Math.asin(camY / cameraDistance);
		

		let point = this.rotateY(phi).rotateX(psi);
		

		let x = scale 
				* point.getX() * (cameraDistance - screenDistance) 
				/ (cameraDistance - point.getZ());
		
		let	y = scale 
				* point.getY() * (cameraDistance - screenDistance) 
				/ (cameraDistance - point.getZ());
		
		return {
			x: W * (x - MODEL_MIN_X) / (MODEL_MAX_X - MODEL_MIN_X),
			y: H * (1 - (y - MODEL_MIN_Y) / (MODEL_MAX_Y - MODEL_MIN_Y))
		};
	}
	
}
