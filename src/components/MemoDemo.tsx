import { useState, useMemo } from 'react';

export default function MemoDemo() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  const doubleNumber = useMemo(() => {
    console.log('Computing double...');
    return number * 2;
  }, [number]);

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? '#333' : '#fff',
      color: dark ? '#fff' : '#000',
    };
  }, [dark]);

  return (
    <div style={themeStyles}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prev) => !prev)}>
        Toggle Theme
      </button>
      <p>Double: {doubleNumber}</p>
    </div>
  );
}
