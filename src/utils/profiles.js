import randomHex from 'random-hex';

const { random, floor } = Math;

/**
 * Retrieves a random color from the supplied color
 * palette.
 *
 * @private
 *
 * @param  {array} palette - contains hex color strings
 *
 * @return {string} random hex color code
 */
function _getRandomPaletteColor(palette) {
	let i = floor( random() * palette.length );

	return palette[i];
}

/**
 * Hash map of particle types.
 *
 * @type {Object}
 */
const TYPES = {

	/**
	 * Retrieves the visual values of a `snow` particle.
	 *
	 * @param  {array} palette - optional hex color strings
	 *
	 * @return {object} snow particle values.
	 */
	snow (palette) {
		let color = palette && palette.length ?
			_getRandomPaletteColor(palette) :
			'#fff';

		return {
			color,
			radius: 0.4 + random() * 2,
			opacity: 0.5 + random() * 0.5
		}
	},

	/**
	 * Retrieves the visual values of a `confetti` particle.
	 *
	 * @param  {array} palette - optional hex color strings
	 *
	 * @return {object} confetti particle values.
	 */
	confetti (palette) {
		let color = palette && palette.length ?
			_getRandomPaletteColor(palette) :
			randomHex.generate();

		return {
			color,
			radius: 0.2 + random() * 4,
			opacity: 1,
			deltaOpacity: 0.05 * random()
		}
	},
};

/**
 * Hash map of particle velocity types.
 *
 * @type {Object}
 */
const VELOCITIES = {

	/**
	 * Retrieves the kinetic values of a `slow` particle.
	 *
	 * @return {object} kinetic particle values.
	 */
	slow () {
		return {
			deltaX: 0.35 - random(),
			deltaY: 0.15 + random() * 1.1
		};
	},

	/**
	 * Retrieves the kinetic values of a `steady` particle.
	 *
	 * @return {object} kinetic particle values.
	 */
	steady () {
		return {
			deltaX: 0.25 - random(),
			deltaY: 0.8 + random() * 0.4 + random() * 2
		};
	},

	/**
	 * Retrieves the kinetic values of a `fast` particle.
	 *
	 * @return {object} kinetic particle values.
	 */
	fast () {
		return {
			deltaX: 0.25 - random(),
			deltaY: 1.1 + random() * 0.4 + random() * 2
		};
	}
};

/**
 * Retrieves all particle values denoted by a specific
 * profile.
 *
 * @param  {array} profile - contains `type`, `velocity` and optional `palette`
 *
 * @return {object} contains all particle values
 */
export function getParticleValues([
	type = 'snow',
	velocity = 'slow',
	palette = []
]) {
	return Object.assign(
		{},
		TYPES[type](palette),
		VELOCITIES[velocity]()
	);
};
