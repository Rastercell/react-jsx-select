import React from 'react';
const Select = (props) => {
	const { options, value, onChange } = props;

	return React.createElement(
		'div',
		{
			className: 'react-jsx-select-wrapper',
			style: { position: 'relative' },
		},
		React.createElement('input', {
			type: 'text',
			name: 'cars',
			placeholder: 'Please Select',
			className: 'form-control react-jsx-select-input',
		}),
		React.createElement(
			'div',
			{
				className: 'react-jsx-select-dropdown',
				style: {
					backgroundColor: '#fff',
					position: 'absolute',
					left: 0,
					right: 0,
					zIndex: 1000,
				},
			},
			React.createElement(
				'ul',
				{
					className: 'react-jsx-select-list',
					style: {
						border: '1px solid #ccc',
						paddingLeft: 0,
						listStyle: 'none',
					},
				},
				options?.map((item, i) =>
					React.createElement(
						'li',
						{
							key: i,
							className: 'react-jsx-select-list-item',
							style: {
								paddingLeft: '10px',
								paddingRight: '10px',
								listStyle: 'none',
							},
						},
						item
					)
				)
			)
		)
	);
};

export default Select;
