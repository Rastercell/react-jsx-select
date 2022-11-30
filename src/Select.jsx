import { castArray } from 'lodash-es';
import React from 'react';
const Select = () => {
	return React.createElement(
		'select',
		{
			type: 'text',
			name: 'cars',
			placeholder: 'Please Select',
		},
		[1, 2, 3].map((item) => {
			React.createElement('option', { value: item }, item);
		})
	);
};

export default Select;
