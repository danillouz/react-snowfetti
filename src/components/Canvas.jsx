import React from 'react';
import { generateParticles, updateParticles } from '../utils/particle';

const WIDTH = 600;
const HEIGHT = 300;
const PROFILE = [ 'snow', 'steady' ];
const AMOUNT = 1500;
const STYLES = {
	backgroundColor: '#0A2933',
	position: 'absolute',
	top: '0',
	left: '0'
};

export default React.createClass({

	/**
	 * Canvas context.
	 *
	 * @type {object}
	 */
	ctx: null,

	/**
	 * Animate by drawing all particles.
	 *
	 * @param  {array} particles - particle Objects to be rendered
	 */
	animate (particles) {
		window.requestAnimationFrame(this.draw.bind(this, particles));
	},

	/**
	 * Draws particles on the canvas by continiously updating the
	 * particle values.
	 *
	 * @param  {array} particles - particle Objects to be rendered
	 */
	draw (particles) {
		const { ctx } = this;
		const {
			width = WIDTH,
			height = HEIGHT,
			profile = PROFILE
		} = this.props;
		const [ type ] = profile;

		updateParticles(ctx, type, { width, height }, particles);
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
				id="react-snowfetti"
				width={ width }
				height={ height }
				style={ styles }
				ref={ canvas => this.ctx = canvas.getContext('2d') }
				onMouseMove={ this.handleMouseMove }
			>
				<h3>
					Oh no! You do not have support for the html5 canvas API!
				</h3>
			</canvas>
		);
	}
});
