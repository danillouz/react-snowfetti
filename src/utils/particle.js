function _createParticle({ width, height }) {
	const { random } = Math;

	return {
		init () {
			let radius = 0.5 + random() * 2;

			this.x = random() * width;
			this.y = random() * -height;
			this.deltaY = 1 + random() * radius;
			this.deltaX = 0.25 - random();
			this.radius = radius;
			this.opacity = 0.5 + random() * 0.5;

			return this;
		}
	};
};

export function generateParticles(amount, { width, height }) {
	const particles = [];

	while (amount--) {
		let particle = _createParticle({ width, height });
		particle.init();
		particles.push(particle);
	}

	return particles;
};

export function updateParticles(ctx, bounds, particles, fillColor) {
	const { width, height } = bounds;

	// Clear the canvas context before updating and animating the particles.
	ctx.clearRect(0, 0, width, height);
	particles.forEach(particle => {
		const { deltaX, deltaY, radius, opacity } = particle;

		/**
		 * Note that angles are measured in radians:
		 *
		 * radians = (Math.PI / 180) * degrees
		 */
		const startAngle = 0;
		const endAngle = 2 * Math.PI; // 360 degrees in radians
		const antiClockwise = true;

		// Update particle values before animating.
		particle.x += deltaX;
		particle.y += deltaY;

		// Style the particles.
		ctx.fillStyle = fillColor;
		ctx.globalAlpha = opacity;

		// Animate the particles.
		ctx.beginPath();
		ctx.arc(particle.x, particle.y, radius, startAngle, endAngle, antiClockwise);
		ctx.fill();
		ctx.closePath();

		// Re initialize the particle when it falls out of the view port.
		if (particle.y > height) {
			particle.init();
		}
	});
};
