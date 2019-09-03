import React, { useState } from "react";
import { render } from "react-dom";
import "./styles.css";
import { useInterval } from "react-use";
import { useDomInput } from "./useDomInput";
import { useDomSelect } from "./useDomSelect";

function App() {
  const [textValue, setTextValue] = useState("Default From React");
  const [selectValue, setSelectValue] = useState("smol");

  const [selectFieldRef] = useDomSelect({
    elementId: "size",
    value: selectValue,
    handler: setSelectValue
  });
  const [textInputRef] = useDomInput({
    elementId: "firstName",
    value: textValue,
    handler: setTextValue
  });

  //Change input field state
  useInterval(() => {
    setTextValue("Change by React State");
    setSelectValue("smol");
  }, 10000);

  return (
    <div className="App">
      <h2>React App</h2>
      <p>{textValue}</p>
      <p>{selectValue}</p>

      <p>State is reset to "RESET!" every 10 seconds</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
