import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Canvas from '../../src/components/Canvas';

describe('<Canvas />', function () {
	before(function () {
		this.component = shallow(<Canvas />);
	});

	context('render()', function () {
		it('renders the canvas element', function () {
			expect(this.component.find('#react-snowfetti')).to.have.length(1);
		});
	});
});
