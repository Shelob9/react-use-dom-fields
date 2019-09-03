import React, { useState } from "react";
import { render } from "react-dom";
import "./styles.css";
import { useInterval } from "react-use";
import { useDomInput } from "./useDomInput";
import { useDomSelect } from "./useDomSelect";
import { useDomCheckboxGroup } from "./useDomCheckboxGroup";
import { useDomRadioGroup } from "./useDomRadioGroup";
function mapToJson(map) {
  return JSON.stringify([...map]);
}
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

function App() {
  const [textValue, setTextValue] = useState("Default From React");
  const [selectValue, setSelectValue] = useState("smol");

  const [checkboxState, setCheckboxState] = useState(
    new Map().set("fruitJuicesOrange", true)
  );

  const [radioValue, setRadioValue] = useState("green");

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

  const [boxesRef] = useDomCheckboxGroup({
    name: "fruitJuices",
    value: checkboxState,
    handler: setCheckboxState
  });

  useDomRadioGroup({
    name: "color",
    value: radioValue,
    handler: setRadioValue
  });

  //Change input field state
  useInterval(() => {
    setTextValue("Reset");
    setSelectValue("smol");
  }, 10000);

  return (
    <div className="App">
      <h2>React App</h2>
      <p>{textValue}</p>
      <p>{selectValue}</p>
      <p>{mapToJson(checkboxState)}</p>
      <p>{radioValue}</p>
      <p>
        State for text will reset to "RESET!" every 10 seconds. Select will set
        to "large"
      </p>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
