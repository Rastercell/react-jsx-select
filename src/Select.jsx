import { createElement, useState } from 'react';
const Select = (props) => {
	const { options, value, onChange } = props;

	const [isShowDropdown, setIsShowDropdown] = useState(false);

	return createElement(
		'div',
		{
			className: 'react-jsx-select-wrapper',
			style: { position: 'relative' },
		},
		createElement('input', {
			type: 'text',
			name: 'cars',
			placeholder: 'Please Select',
			className: 'form-control react-jsx-select-input',
			onFocus: () => setIsShowDropdown(true),
			onBlur: () => setIsShowDropdown(false),
		}),
		createElement(
			'div',
			{
				className: 'react-jsx-select-dropdown',
				style: {
					backgroundColor: '#fff',
					position: 'absolute',
					left: 0,
					right: 0,
					zIndex: 1000,
					display: isShowDropdown ? 'block' : 'none',
				},
			},
			createElement(
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
					createElement(
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
