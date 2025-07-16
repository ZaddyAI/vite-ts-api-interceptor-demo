import React, { useState, useCallback } from 'react';

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
};

function Button({ onClick, label }: ButtonProps) {
    console.log(`Rendering button: ${label}`);

  return <button onClick={onClick}>{label}</button>;
}

const MemoizedButton = React.memo(Button);

export default function CallBackDemo() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);

  const increment = useCallback(() => {
    setClicks((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Counter</button>
      <br/>
      <MemoizedButton onClick={increment} label="Click Me" />
      <p>Button Clicks: {clicks}</p>
    </div>
  );
}
