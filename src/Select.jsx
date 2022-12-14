import { createElement, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const dropdownIcon = createElement(
  'svg',
  {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    preserveAspectRatio: 'xMidYMid meet',
    viewBox: '0 0 24 24',
  },
  createElement('path', { fill: 'currentColor', d: 'm12 15l-5-5h10Z' })
);

const searchIcon = createElement(
  'svg',
  {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    preserveAspectRatio: 'xMidYMid meet',
    viewBox: '0 0 24 24',
  },
  createElement('path', {
    fill: 'currentColor',
    d: 'm19.6 21l-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075q-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5Q7.625 5 6.312 6.312Q5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z',
  })
);

const findWithAttr = (array, attr, value) => {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr]?.toString() === value?.toString()) {
      return i;
    }
  }
  return -1;
};

const Select = (props) => {
  const {
    options,
    defaultValue,
    disabled,
    required,
    className,
    onChange,
    activeItemStyle,
    name,
    placeholder,
    listStyle,
    iconWidth,
    iconStyle,
    purpose,
    onSearch,
    onExactSearch,
  } = props;

  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState(
    findWithAttr(options, 'value', defaultValue)
  );
  const [hoveredItem, setHoveredItem] = useState(-1);
  const [value, setValue] = useState('');
  const [label, setLabel] = useState('');
  const [jsx, setJsx] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setValue(options[activeItem]?.value);
    setLabel(options[activeItem]?.label);
    setJsx(options[activeItem]?.jsx);
  }, [options, activeItem]);

  useEffect(() => {
    onChange({ value: value, label: label, jsx: jsx });
  }, [value, label, jsx, onChange]);

  useEffect(() => {
    if (purpose === 'search') onSearch({ value: value, query: query });
  }, [value, purpose, onSearch, query]);

  useEffect(() => {
    if (purpose === 'search') onExactSearch(options[activeItem]);
  }, [activeItem, purpose, options, onExactSearch]);

  useEffect(() => {
    setQuery(label);
  }, [label]);

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
    createElement(
      'div',
      {
        className: 'react-jsx-select-input-container',
        style: {
          display: '-ms-flexbox',
          display: 'flex',
          alignItems: 'center',
        },
      },
      createElement('input', {
        type: 'text',
        name: name,
        value: query,
        placeholder: placeholder,
        autoComplete: 'off',
        required: required,
        disabled: disabled,
        className: `react-jsx-select-input ${className}`,
        onChange: (e) => setQuery(e.target.value),
        onFocus: () => {
          setIsShowDropdown(true);
          setQuery('');
        },
        onBlur: () => (hoveredItem === -1 ? setIsShowDropdown(false) : void 0),
        onKeyDown: (e) => inputKeyMap(e.key),
      }),
      createElement(
        'span',
        {
          className: 'react-jsx-select-input-icon',
          onClick:
            purpose === 'dropdown'
              ? () => setIsShowDropdown(!isShowDropdown)
              : purpose === 'search'
              ? () => onSearch({ value: value, query: query })
              : void 0,
          style: {
            width: iconWidth + 'px',
            textAlign: 'center',
            marginLeft: -iconWidth + 'px',
            ...iconStyle,
          },
        },
        purpose === 'dropdown'
          ? dropdownIcon
          : purpose === 'search'
          ? searchIcon
          : null
      )
    ),
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
        options?.map(
          (item, i) =>
            (item?.label).toString().includes(query) &&
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
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  className: PropTypes.string,
  activeItemStyle: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  listStyle: PropTypes.object,
  iconWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconStyle: PropTypes.object,
  purpose: PropTypes.string,
  onSearch: PropTypes.func,
  onExactSearch: PropTypes.func,
};

Select.defaultProps = {
  options: [],
  defaultValue: '',
  disabled: false,
  onChange: () => {},
  required: false,
  className: '',
  activeItemStyle: { backgroundColor: '#e0e0e0' },
  name: '',
  placeholder: 'Please Select',
  listStyle: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
  },
  iconWidth: '50',
  iconStyle: {
    fontSize: '26px',
    borderRadius: '0 5px 5px 0',
  },
  purpose: 'dropdown',
  onSearch: () => {},
  onExactSearch: () => {},
};

export default Select;
