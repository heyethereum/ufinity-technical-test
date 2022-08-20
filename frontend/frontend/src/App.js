import "./App.css";
import { useState } from "react";
import RequestCustomer from "./RequestCustomer";
import Counter from "./Counter";

function App() {
  const [showCounter, setShowCounter] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setShowCounter(!showCounter)}>
        {showCounter ? "Hide Counter" : "Show Counter"}
      </button>
      {showCounter && <Counter />}

      <RequestCustomer />
    </div>
  );
}

export default App;
