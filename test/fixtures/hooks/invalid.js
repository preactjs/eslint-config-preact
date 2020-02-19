import { useState, useCallback, useEffect } from 'preact/hooks';

export function Foo () {
	const [value, setValue] = useState(0);
	const increment = useCallback(() => setValue(value + 1));

	useEffect(() => {
		console.log(value);
	}, []);

	return <button onClick={increment}>{value}</button>;
}
