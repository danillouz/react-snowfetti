import React from 'react';
import { generateParticles, updateParticles } from '../utils/particle';

const WIDTH = 600;
const HEIGHT = 300;
const PROFILE = [ 'snow', 'steady' ];
const AMOUNT = 800;
const STYLES = {
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
		} = this.props;

		updateParticles(ctx, { width, height }, particles);
		this.animate(particles);
	},

	componentDidMount () {
		const {
			width = WIDTH,
			height = HEIGHT,
			profile = PROFILE,
			amount = AMOUNT
		} = this.props;

		const particles = generateParticles(profile, amount, { width, height });

		this.animate(particles);
	},

	render () {
		const {
			width = WIDTH,
			height = HEIGHT,
			styles = STYLES
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
