import randomHex from 'random-hex';

export function getProfileValues([ type, velocity ]) {
	const { random } = Math;
	let radii = {};
	let values = {};

	switch (type) {
		case 'snow': {
			let radius = 0.4 + random() * 2;

			radii[type] = radius;

			values.radius = radius;
			values.color = '#fff';
			values.opacity = 0.5 + random() * 0.5;

			break;
		}

		case 'confetti': {
			let radius = 0.8 + random() * 3;

			radii[type] = radius;

			values.radius = radius;
			values.color = randomHex.generate();
			values.opacity = 0.5 + random() * 0.5;

			break;
		}
	}

	switch (velocity) {
		case 'slow': {
			let radius = radii[type];

			values.deltaX = 0.25 - random();
			values.deltaY = 0.5 + random() * radius;

			break;
		}

		case 'steady': {
			let radius = radii[type];

			values.deltaX = 0.25 - random();
			values.deltaY = 0.8 + random() * radius;

			break;
		}

		case 'fast': {
			let radius = radii[type];

			values.deltaX = 0.25 - random();
			values.deltaY = 1.1 + random() * radius;

			break;
		}
	}

	return values;
};
