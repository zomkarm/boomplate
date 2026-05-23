import { useState, useEffect } from "react";

const API = "/api/items";

export default function App() {
  const [items, setItems]   = useState([]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const r = await fetch(API);
      setItems(await r.json());
    } catch { /* server not up yet */ }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!input.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    });
    setInput("");
    load();
  };

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="container">
      <h1>MERN Items</h1>
      <div className="row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="New item…"
        />
        <button onClick={add}>Add</button>
      </div>

      {loading ? (
        <p className="muted">Connecting to server…</p>
      ) : items.length === 0 ? (
        <p className="muted">No items yet.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <span>{item.name}</span>
              <button className="del" onClick={() => remove(item._id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
