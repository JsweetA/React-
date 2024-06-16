import "./App.css";
import Atom from "./components/Atom";
import Hox from "./components/Hox";
import { Card } from "./components/Card";
import { State } from "./components/State";
import { Zustand } from "./components/Zustand";
import { Async } from "./components/Async";
import Input from "./components/Input";
// import { useReducer } from "react";

function App() {
  return (
    <>
      <Card title='Input'>
        <Input />
      </Card>
      <Card title='State'>
        <State />
      </Card>
      <Card title='Atom'>
        <Atom />
      </Card>
      <Card title='Hox'>
        <Hox />
      </Card>
      <Card title='Zustand'>
        <Zustand />
      </Card>
      <Card title='Async'>
        <Async />
      </Card>
      {/* <button onClick={rerender}> rerender </button> */}
    </>
  );
}

export default App;
