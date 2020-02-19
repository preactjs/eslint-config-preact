import { useState, useCallback, useEffect } from 'preact/hooks';

export function Foo () {
	const [value, setValue] = useState(0);
	const increment = useCallback(() => setValue(v => v + 1), [setValue]);

	useEffect(() => {
		console.log(value);
	}, [value]);

	return <button onClick={increment}>{value}</button>;
}
