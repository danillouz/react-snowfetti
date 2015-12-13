export function generateParticleFillColor(type) {
	const snow = '#fff';
	const confetti = null; // TODO: generate random colors

	if (type === 'snow') {
		return snow;
	}

	if (type === 'confetti') {
		return confetti;
	}

	return snow;
};
