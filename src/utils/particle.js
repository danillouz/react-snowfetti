import { getParticleValues } from '../utils/profiles';

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
function _createParticle(profile, { width, height }) {
	const { random } = Math;
	const {
		deltaX,
		deltaY,
		deltaOpacity,
		radius,
		color,
		opacity
	} = getParticleValues(profile);

	return {
		init() {
			this.x = random() * width;
			this.y = random() * -height;
			this.deltaX = deltaX;
			this.deltaY = deltaY;
			this.color = color;
			this.radius = radius;
			this.opacity = opacity;
			this.deltaOpacity = deltaOpacity;

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
