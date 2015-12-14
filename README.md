# react-snowfetti
Generates random particles using html5 [canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

`react-snowfetti` exposes an interface to create snow for the holidays or confetti when you're celebrating!

Inspired by this [codepen](https://codepen.io/linrock/pen/Amdhr).

## snow
![snow](img/snow.gif)

## confetti
![confetti](img/confetti.gif)

# interface
```javascript
<Snowfetti
	profile={ [ 'confetti', 'steady' ] }
	amount={ 800 }
	width={ 600 }
	height={ 300 }
	styles={ {backgroundColor: '#0a2933'} }
/>
```

## properties
#### profile (Array)
Denotes the visual profile of the rendered particles on the canvas.
The profile accepts two values:

- type (String):
	+ `'snow'`
	+ `'confetti'`
- velocity (String):
	+ `'slow'`
	+ `'steady'`
	+ `'fast'`

*Defaults to type `'snow'` and velocity `'slow'`.*

#### amount (Number)
Denotes the amount of particles that will be rendered on the canvas.

*Defaults to `800` particles.*

#### width (Number)
Denotes the canvas width.

*Defaults to `600`.*

#### height (Number)
Denotes the canvas height.

*Defaults to `300`.*

#### styles (Object)
Denotes the canvas css styles.

*Defaults to `backgroundColor` of `#0a2933`, `position` `absolute`
with `top` `0` and `left` `0`.*

# peer dependencies
`react-snowfetti` has a dependency on [react](https://facebook.github.io/react/) version `^0.14.3`.

This dependency must be fulfilled by the consumer of
`react-snowfetti`.

# usage
First install the package in your project using [npm](https://www.npmjs.com/):
```bash
npm i -S react-snowfetti
```

Then import the package in your consumer application:
```javascript
import React from 'react';
import Snowfetti from 'react-snowfetti';

export React.createClass({
	render () {
		return <Snowfetti />;
	}
});
```

# todos
- [ ] write tests
- [ ] add support for confetti color sets
- [ ] fade out particles
- [ ] make particle flow direction be affected by mouse cursor
- [ ] add code coverage
- [ ] add CI
- [ ] add README.md badges
