import React from 'react';
import { generateParticles, updateParticles } from '../utils/particle';

const PROFILE = [ 'snow', 'steady' ];
const AMOUNT = 800;
const WIDTH = 600;
const HEIGHT = 300;
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
	 * Dynamic particle x coordinate value determined by the mouse
	 * cursor position.
	 *
	 * @type {number}
	 */
	dynamicX: 1,

	/**
	 * Draws particles on the canvas by continiously updating the
	 * particle values.
	 *
	 * @param  {array} particles - particle Objects to be rendered
	 */
	draw (particles) {

		/**
		 * Note that angles are measured in radians:
		 *
		 * radians = (Math.PI / 180) * degrees
		 */
		const startAngle = 0;
		const endAngle = 2 * Math.PI; // 360 degrees in radians
		const antiClockwise = true;
		const { ctx, dynamicX } = this;
		const {
			width = WIDTH,
			height = HEIGHT,
			profile = PROFILE
		} = this.props;
		const [ type ] = profile;

		// Clear the canvas context before updating and animating the particles.
		ctx.clearRect(0, 0, width, height);

		// Updates the particle values before (re) drawing to create an animation on the canvas.
		particles.forEach(particle => {
			const {
				deltaX,
				deltaY,
				color,
				radius,
				opacity,
				deltaOpacity
			} = particle;

			// Update particle values before animating.
			particle.x += deltaX;
			particle.y += deltaY;

			// Update particle opacity based on particle type.
			switch (type) {
				case 'snow': {
					particle.opacity = opacity;

					break;
				}

				case 'confetti': {
					if (particle.opacity <= 0) {
						particle.opacity += deltaOpacity;
					}

					if (particle.opacity > 0) {
						particle.opacity -= deltaOpacity;
					}

					break;
				}
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

		this.animate(particles);
	},

	/**
	 * Animate by drawing all particles.
	 *
	 * @param  {array} particles - particle Objects to be rendered
	 */
	animate (particles) {
		window.requestAnimationFrame( this.draw.bind(this, particles) );
	},

	componentDidMount () {
		const {
			profile = PROFILE,
			amount = AMOUNT,
			width = WIDTH,
			height = HEIGHT
		} = this.props;

		const particles = generateParticles(profile, amount, { width, height });

		this.animate(particles);
	},

	/**
	 * Calculates the dynamic particle x coordinate based on
	 * the mouse cursor position.
	 *
	 * @param  {object} event - the event Object
	 */
	handleMouseMove (event) {
		const { width = WIDTH } = this.props;

		this.dynamicX = event.pageX / width;

		console.log(this.dynamicX);
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
