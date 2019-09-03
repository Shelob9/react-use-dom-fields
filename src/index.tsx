import React, { useState, useRef, useEffect } from "react";
import { render } from "react-dom";
import { useDomEvent } from "framer-motion";
import "./styles.css";
import { useEffectOnce } from "react-use";
import { useInterval } from "react-use";
import { useDomInput } from "./useDomInput";

function App() {
  const [textValue, setTextValue] = useState("Default From React");
  const [textInputRef] = useDomInput({
    elementId: "firstName",
    value: textValue,
    handler: setTextValue
  });

  //Change input field state
  useInterval(() => {
    setTextValue("Change by React State");
  }, 10000);

  return (
    <div className="App">
      <h2>React App</h2>
      <p>{textValue}</p>
      <p>State is reset to "RESET!" every 10 seconds</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
