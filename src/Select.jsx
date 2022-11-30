import { createElement, useState, useEffect } from 'react';
const Select = (props) => {
	const { options, defaultValue, onChange } = props;

	const [isShowDropdown, setIsShowDropdown] = useState(false);
	const [activeItem, setActiveItem] = useState(-1);
	const [hoveredItem, setHoveredItem] = useState(-1);
	const [value, setValue] = useState('');
	const [label, setLabel] = useState('');

	const activeItemStyle = { backgroundColor: '#e0e0e0' };

	useEffect(() => {
		setValue(options[activeItem]?.value);
		setLabel(options[activeItem]?.label);
	}, [options, activeItem]);

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
			setIsShowDropdown(false);
		} else if (key === 'Escape') {
			setValue('');
			setLabel('');
		} else if (key === ' ') {
			setIsShowDropdown(!isShowDropdown);
		}
	};

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
			onChange: (e) => {},
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
							onMouseOver: () => setHoveredItem(i),
							onClick: () => setActiveItem(i),
							style: {
								padding: '8px',
								margin: 0,
								listStyle: 'none',
								cursor: 'pointer',
								...(i === activeItem || i === hoveredItem
									? activeItemStyle
									: {}),
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
