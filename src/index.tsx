import React, { useState, useRef } from "react";
import { render } from "react-dom";
import { useDomEvent } from "framer-motion";
import "./styles.css";
import { useEffectOnce } from "react-use";

function inputChangeHandler(event, callback) {
  return callback(event.target.value);
}
const useDomInput = ({ elementId, value, onChange }) => {
  const inputRef = useRef(null);
  useEffectOnce(() => {
    inputRef.current = document.getElementById(elementId);

    inputRef.current.addEventListener(
      "keypress",
      e => inputChangeHandler(e, onChange),
      false
    );
    return () => {
      console.log("Running clean-up of effect on unmount");
    };
  });

  return [inputRef];
};

function App() {
  const [textValue, setTextValue] = useState("Default From React");
  const [textInputRef] = useDomInput({
    elementId: "firstName",
    value: textValue,
    onChange: setTextValue
  });
  return (
    <div className="App">
      <h2>React App</h2>
      <p>{textValue}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
