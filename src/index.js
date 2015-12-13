import React from 'react';

const WIDTH = 600;
const HEIGHT = 300;
const MAX_PARTICLES = 200;
const PARTICLE_TYPE = 'snow';
const CANVAS_STYLES = {
	backgroundColor: '#0A2933',
	position: 'absolute',
	top: '0',
	left: '0'
};

export default React.createClass({

	ctx: null,

	generateFillColor (type) {
		const snow = '#fff';
		const confetti = null; // TODO: generate random colors

		if (type === 'snow') {
			return snow;
		}

		if (type === 'confetti') {
			return confetti;
		}

		return snow;
	},

	createParticle () {
		const { random } = Math;
		const {
			width = WIDTH,
			height = HEIGHT
		} = this.props;

		return {
			init () {
				let radius = 1 + random() * 2;

				this.x = random() * width;
				this.y = random() * -height;
				this.deltaY = 1 + random() * radius;
				this.deltaX = 0.25 - random();
				this.radius = radius;
				this.opacity = 0.5 + random() * 0.5;

				return this;
			}
		};
	},

	generateParticles (amount) {
		const particles = [];

		while (amount--) {
			particles.push( this.createParticle().init() );
		}

		return particles;
	},

	draw (particles) {
		const { ctx } = this;
		const {
			width = WIDTH,
			height = HEIGHT,
			type = PARTICLE_TYPE
		} = this.props;
		const fillColor = this.generateFillColor(type);

		ctx.clearRect(0, 0, width, height);

		particles.forEach(particle => {
			const { deltaX, deltaY, radius, opacity } = particle;

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
			ctx.fillStyle = fillColor;
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

		window.requestAnimationFrame(this.draw.bind(this, particles));
	},

	componentDidMount () {
		const {
			maxParticles = MAX_PARTICLES
		} = this.props;

		const particles = this.generateParticles(maxParticles);

		window.requestAnimationFrame(this.draw.bind(this, particles));
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
