import { createElement, useState } from 'react';
const Select = (props) => {
	const { options, defaultValue, onChange } = props;

	const [isShowDropdown, setIsShowDropdown] = useState(false);
	const [activeItem, setActiveItem] = useState(-1);
	const [value, setValue] = useState('');
	const [label, setLabel] = useState('');

	const activeItemStyle = { backgroundColor: '#e0e0e0' };

	const inputKeyMap = (key) => {
		// Initialize Active Product if not already
		if (key === 'ArrowDown' && activeItem === -1) setActiveItem(0);
		if (key === 'ArrowUp' && activeItem === -1)
			setActiveItem(options?.length - 1);

		// Handle ArrowUp and ArrowDown with Escape
		if (key === 'ArrowDown') {
			activeItem < options?.length - 1
				? setActiveItem(activeItem + 1)
				: setActiveItem(0);
		} else if (key === 'ArrowUp') {
			activeItem > 0
				? setActiveItem(activeItem - 1)
				: setActiveItem(options?.length - 1);
		} else if (key === 'Enter') {
			setValue(options[activeItem]?.value);
			setLabel(options[activeItem]?.label);
		} else if (key === 'Escape') {
			setValue('');
			setLabel('');
		}
	};
	console.log(value, label);

	return createElement(
		'div',
		{
			className: 'react-jsx-select-wrapper',
			style: { position: 'relative' },
		},
		createElement('input', {
			type: 'text',
			name: 'cars',
			value: label,
			placeholder: 'Please Select',
			className: 'form-control react-jsx-select-input',
			onFocus: () => setIsShowDropdown(true),
			onBlur: () => setIsShowDropdown(false),
			onKeyDown: (e) => inputKeyMap(e.key),
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
								padding: '8px',
								margin: 0,
								listStyle: 'none',
								...(i === activeItem ? activeItemStyle : {}),
							},
						},
						item?.jsx
					)
				)
			)
		)
	);
};

export default Select;
