class Axes {
	
	constructor(scale = 2) {
		
		this.xAxis = new Point(scale, 0, 0);
		this.yAxis = new Point(0, scale, 0);
		this.zAxis = new Point(0, 0, scale);
	}

	drawAxis(context, axis, color, camera, screen) {

		let axisProjection = axis.perspectiveProjection(camera, screen);
		
		context.save();

		context.beginPath();
		context.setLineDash([5, 15])
		context.moveTo(W / 2, H / 2);
		context.strokeStyle = color;
		context.lineTo(axisProjection.x, axisProjection.y);
		context.stroke();

		context.restore()			

	}

	draw(context, colors = [], camera, screen) {

		this.drawAxis(context, this.xAxis, colors[0], camera, screen);
		this.drawAxis(context, this.yAxis, colors[1], camera, screen);
		this.drawAxis(context, this.zAxis, colors[2], camera, screen);

	}
}

