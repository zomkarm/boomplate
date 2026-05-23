import { useState } from "react";

export default function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="container">
      <h1>React + TypeScript ⚛️</h1>
      <p>Edit <code>src/App.tsx</code> to start building.</p>
      <button onClick={() => setCount((c) => c + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
