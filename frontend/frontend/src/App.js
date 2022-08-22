import "./App.css";
import { useState } from "react";
import RequestCustomer from "./RequestCustomer";
import Counter from "./Counter";
import InsertCustomer from "./InsertCustomer";

function App() {
  const [showCounter, setShowCounter] = useState(false);
  return (
    <div className="App" style={{ marginTop: 20 }}>
      <button onClick={() => setShowCounter((state) => !state)}>
        {showCounter ? "Hide Counter" : "Show Counter"}
      </button>
      {showCounter && <Counter />}

      <RequestCustomer />
      <InsertCustomer />
    </div>
  );
}

export default App;
