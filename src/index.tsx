import React, { useState, useRef, useEffect } from "react";
import { render } from "react-dom";
import { useDomEvent } from "framer-motion";
import "./styles.css";
import { useEffectOnce } from "react-use";
import { useInterval } from "react-use";

function inputChangeHandler(event, callback) {
  return callback(event.target.value);
}

const useDomInput = ({ elementId, value, onChange }) => {
  const inputRef = useRef(null);

  //Bind change handler on mount/ unmount
  useEffectOnce(() => {
    inputRef.current = document.getElementById(elementId);
    onChange(inputRef.current.value);
    const callback = e => inputChangeHandler(e, onChange);
    inputRef.current.addEventListener("keypress", callback, true);
    return () => {
      inputRef.current.removeEventListener("keypress", callback, true);
    };
  });

  //Bind value of input to React state
  useEffect(() => {
    inputRef.current.value = value;
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

  //Change input field state
  useInterval(() => {
    setTextValue("Change by React State");
  }, 1000);

  return (
    <div className="App">
      <h2>React App</h2>
      <p>{textValue}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
