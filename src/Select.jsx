import { createElement, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const findWithAttr = (array, attr, value) => {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i][attr] === value) {
			return i;
		}
	}
	return -1;
};

const Select = (props) => {
	const {
		options,
		defaultValue,
		isDisabled,
		isRequired,
		className,
		onChange,
		activeItemStyle,
		name,
		placeholder,
		listStyle,
	} = props;

	const [isShowDropdown, setIsShowDropdown] = useState(false);
	const [activeItem, setActiveItem] = useState(
		findWithAttr(options, 'value', defaultValue)
	);
	const [hoveredItem, setHoveredItem] = useState(-1);
	const [value, setValue] = useState('');
	const [label, setLabel] = useState('');
	const [jsx, setJsx] = useState('');

	useEffect(() => {
		setValue(options[activeItem]?.value);
		setLabel(options[activeItem]?.label);
		setJsx(options[activeItem]?.jsx);
	}, [options, activeItem]);

	useEffect(() => {
		onChange({ value: value, label: label, jsx: jsx });
	}, [value, label, jsx]);

	const inputKeyMap = (key) => {
		// Initialize Active Product if not already
		if (key === 'ArrowDown' && activeItem === -1) setActiveItem(0);
		if (key === 'ArrowUp' && activeItem === -1)
			setActiveItem(options?.length - 1);

		// Handle ArrowUp and ArrowDown with Escape
		if (key === 'ArrowDown') {
			setHoveredItem(-1);
			activeItem < options?.length - 1
				? setActiveItem(activeItem + 1)
				: setActiveItem(0);
		} else if (key === 'ArrowUp') {
			setHoveredItem(-1);
			activeItem > 0
				? setActiveItem(activeItem - 1)
				: setActiveItem(options?.length - 1);
		} else if (key === 'Enter') {
			setIsShowDropdown(false);
		} else if (key === 'Escape') {
			setValue('');
			setLabel('');
			setJsx('');
		} else if (key === ' ') {
			setIsShowDropdown(!isShowDropdown);
		}
	};

	const onClickOption = (i) => {
		setActiveItem(i);
		setIsShowDropdown(false);
	};

	return createElement(
		'div',
		{
			className: 'react-jsx-select-wrapper',
			style: { position: 'relative' },
		},
		createElement('input', {
			type: 'text',
			name: name,
			value: label,
			placeholder: placeholder,
			autoComplete: 'off',
			isRequired: isRequired,
			isDisabled: isDisabled,
			className: `react-jsx-select-input ${className}`,
			onFocus: () => setIsShowDropdown(true),
			onBlur: () => (hoveredItem === -1 ? setIsShowDropdown(false) : void 0),
			onKeyDown: (e) => inputKeyMap(e.key),
		}),
		createElement(
			'div',
			{
				className: 'react-jsx-select-dropdown',
				style: {
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
					onMouseOut: () => setHoveredItem(-1),
					style: {
						...listStyle,
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
							onClick: () => onClickOption(i),
							style: {
								padding: '8px',
								margin: 0,
								listStyle: 'none',
								cursor: 'pointer',
								...((i === activeItem && hoveredItem === -1) ||
								i === hoveredItem
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

Select.propTypes = {
	options: PropTypes.array,
	defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	isDisabled: PropTypes.bool,
	onChange: PropTypes.func,
	isRequired: PropTypes.bool,
	className: PropTypes.string,
	activeItemStyle: PropTypes.object,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	listStyle: PropTypes.object,
};

Select.defaultProps = {
	options: [],
	defaultValue: '',
	isDisabled: false,
	onChange: () => {},
	isRequired: false,
	className: 'form-control',
	activeItemStyle: { backgroundColor: '#e0e0e0' },
	name: '',
	placeholder: 'Please Select',
	listStyle: {
		backgroundColor: '#fff',
		border: '1px solid #ccc',
	},
};

export default Select;
