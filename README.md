# react-jsx-select

A simple and lightweight dropdown element with JSX options for form.

## Example Code

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
