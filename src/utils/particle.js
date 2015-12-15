import { getProfileValues } from '../utils/visuals';

/**
 * Create a single particle Object.
 *
 * @private
 *
 * @param  {array}  profile - particle profile that contains type and velocity
 * @param  {object} bounds  - canvas width and height
 *
 * @return {object} particle Object
 */
function _createParticle(profile, bounds) {
	const { random } = Math;
	const profileValues = getProfileValues(profile);
	const { deltaX, deltaY, deltaOpacity, radius, color, opacity } = profileValues;
	const { width, height } = bounds;

	return {
		init() {
			this.x = random() * width;
			this.y = random() * -height;
			this.deltaX = deltaX;
			this.deltaY = deltaY;
			this.deltaOpacity = deltaOpacity;
			this.radius = radius;
			this.color = color;
			this.opacity = opacity;

			return this;
		}
	};
}

/**
 * Generates a specific amount of particles to be rendered
 * on the canvas based on the specified particle profile.
 *
 * @param  {array}  profile - particle profile that contains type and velocity
 * @param  {number} amount  - the amount of particles to be rendered
 * @param  {object} bounds  - canvas width and height
 *
 * @return {array} particle Objects to be rendered
 */
export function generateParticles(profile, amount, bounds) {
	const particles = [];

	while (amount--) {
		let particle = _createParticle(profile, bounds);

		particle.init();
		particles.push(particle);
	}

	return particles;
}

/**
 * Updates the particle values before (re) drawing to create
 * an animation on the canvas.
 *
 * @param  {object} ctx       - canvas context
 * @param  {object} bounds    - canvas width and height
 * @param  {array} particles  - particle Objects to be rendered
 */
export function updateParticles(ctx, type, bounds, particles) {
	const { width, height } = bounds;

	// Clear the canvas context before updating and animating the particles.
	ctx.clearRect(0, 0, width, height);

	particles.forEach(particle => {
		const { deltaX, deltaY, deltaOpacity, opacity, radius, color } = particle;

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

		if (type === 'snow' && particle.opacity <= 0) {
			particle.opacity = opacity;
		}

		if (type === 'confetti' && particle.opacity <= 0) {
			particle.opacity += deltaOpacity;
		}

		if (type === 'confetti' && particle.opacity > 0) {
			particle.opacity -= deltaOpacity;
		}

		// Style the particles.
		ctx.fillStyle = color;
		ctx.globalAlpha = particle.opacity;

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
}
