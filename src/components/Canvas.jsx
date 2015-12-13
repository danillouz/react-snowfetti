import React from 'react';
import { generateParticles, updateParticles } from '../utils/particle';
import { generateParticleFillColor } from '../utils/visuals';

const WIDTH = 600;
const HEIGHT = 300;
const MAX_PARTICLES = 400;
const PARTICLE_TYPE = 'snow';
const CANVAS_STYLES = {
	backgroundColor: '#0A2933',
	position: 'absolute',
	top: '0',
	left: '0'
};

export default React.createClass({

	ctx: null,

	animate (particles) {
		window.requestAnimationFrame(this.draw.bind(this, particles));
	},

	draw (particles) {
		const { ctx } = this;
		const {
			width = WIDTH,
			height = HEIGHT,
			type = PARTICLE_TYPE
		} = this.props;
		const fillColor = generateParticleFillColor(type);

		updateParticles(ctx, { width, height }, particles, fillColor);
		this.animate(particles);
	},

	componentDidMount () {
		const {
			width = WIDTH,
			height = HEIGHT,
			maxParticles = MAX_PARTICLES
		} = this.props;
		const particles = generateParticles(maxParticles, { width, height });

		this.animate(particles);
	},

	render () {
		const {
			width = WIDTH,
			height = HEIGHT,
			styles = CANVAS_STYLES
		} = this.props;

		return (
			<canvas
				width={ width }
				height={ height }
				id="react-snowfetti"
				ref={ canvas => this.ctx = canvas.getContext('2d') }
				style={ styles }
			>
				<h3>
					Oh no! You do not have support for the html5 canvas API!
				</h3>
			</canvas>
		);
	}
});
