const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});














import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function App() {
  // 🟡 Read values from the Redux store
  const x = useSelector((state) => state.x);
  const name = useSelector((state) => state.firstName);

  // 🔵 Get the dispatch function
  const dispatch = useDispatch();

  // 🔁 Define functions to send actions
  const increment = () => dispatch({ type: 'INCREMENT' });
  const decrement = () => dispatch({ type: 'DECREMENT' });

  return (
    <div>
      <h1>This is x from App component: {x}</h1>
      <h1>My name is {name}</h1>

      {/* 🔘 These buttons dispatch actions */}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}



