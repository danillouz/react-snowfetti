import { getProfileValues } from '../utils/visuals';

function _createParticle(profile, bounds) {
	const { random } = Math;
	const profileValues = getProfileValues(profile);
	const { deltaX, deltaY, radius, color, opacity } = profileValues;
	const { width, height } = bounds;

	return {
		init () {
			this.x = random() * width;
			this.y = random() * -height;
			this.deltaX = deltaX;
			this.deltaY = deltaY;
			this.radius = radius;
			this.color = color;
			this.opacity = opacity;

			return this;
		}
	};
};

export function generateParticles(profile, amount, bounds) {
	const particles = [];

	while (amount--) {
		let particle = _createParticle(profile, bounds);

		particle.init();
		particles.push(particle);
	}

	return particles;
};

export function updateParticles(ctx, bounds, particles) {
	const { width, height } = bounds;

	// Clear the canvas context before updating and animating the particles.
	ctx.clearRect(0, 0, width, height);

	particles.forEach(particle => {
		const { deltaX, deltaY, radius, color, opacity } = particle;

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
		ctx.fillStyle = color;
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
