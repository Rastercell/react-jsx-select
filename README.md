# react-jsx-select

A simple and lightweight dropdown element with JSX options for form.

## Installation

for yarn
`yarn add react-jsx-select`

for npm
`npm install react-jsx-select`

## Basic Example Code

```javascript
import { Select } from 'react-jsx-select';

<Select
  options={[
    { value: 1, label: 1, jsx: <span>1</span> },
    { value: 2, label: 2, jsx: <span>2</span> },
    { value: 3, label: 3, jsx: <span>3</span> },
    { value: 4, label: 4, jsx: <span>4</span> },
    { value: 5, label: 5, jsx: <span>5</span> },
  ]}
  onChange={(value) => console.log(value)}
/>;
```

## Example with All Props

```javascript
import { Select } from 'react-jsx-select';

<Select
  options={[
    { value: 1, label: 1, jsx: <span>1</span> },
    { value: 2, label: 2, jsx: <span>2</span> },
    { value: 3, label: 3, jsx: <span>3</span> },
    { value: 4, label: 4, jsx: <span>4</span> },
    { value: 5, label: 5, jsx: <span>5</span> },
  ]}
  onChange={(value) => console.log(value)}
  name='sample'
  placeholder='Select Please...'
  defaultValue={2}
  disabled={true}
  required={false}
  className='form-control'
  listStyle={{
    backgroundColor: '#fafafa',
    border: '1px solid #ccc',
  }}
  activeItemStyle={{ backgroundColor: '#e0e000' }}
  iconWidth='50'
  iconStyle={{
    fontSize: '26px',
    borderRadius: '0 5px 5px 0',
  }}
/>;
```
