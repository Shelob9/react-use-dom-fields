import React, { useState } from 'react';
import './styles.css';
import { useDomInput } from './useDomInput';
import { useDomSelect } from './useDomSelect';
import { useDomCheckboxGroup } from './useDomCheckboxGroup';
import { useDomRadioGroup } from './useDomRadioGroup';
function mapToJson(map) {
  console.log(8, map);
  const values = [];
  map.forEach((value, key) => {
    if (value) {
      values.push(key);
    }
  });
  console.log(15, values);
  return values.toString();
}

/**
 * Full demonstration component
 *
 * This is used for the cypress tests
 */
export default function Demo() {
  const { document } = window;
  const [textValue, setTextValue] = useState('Default From React');
  const [selectValue, setSelectValue] = useState('large');
  const [checkboxState, setCheckboxState] = useState(['fruitJuicesOrange']);
  const [radioValue, setRadioValue] = useState('green');

  const selectId = 'size';
  useDomSelect({
    elementId: selectId,
    value: selectValue,
    handler: setSelectValue,
    document,
  });

  const inputId = 'firstName';
  useDomInput({
    elementId: inputId,
    value: textValue,
    handler: setTextValue,
    document,
  });

  const checkboxGroupName = 'fruitJuices';
  useDomCheckboxGroup({
    name: checkboxGroupName,
    value: checkboxState,
    handler: setCheckboxState,
    document,
  });

  const radioGroupName = 'color';
  useDomRadioGroup({
    name: radioGroupName,
    value: radioValue,
    handler: setRadioValue,
  });

  return (
    <div className="App">
      <h2>React App</h2>
      <p id={`${inputId}-value`}>{textValue}</p>
      <p id={`${selectId}-value`}>{selectValue}</p>
      <p id={`${radioGroupName}-value`}>{radioValue}</p>
      <p id={`${checkboxGroupName}-value`}>{checkboxState.join(' | ')}</p>
    </div>
  );
}
