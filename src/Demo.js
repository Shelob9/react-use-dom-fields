import React, { useState } from 'react';
import './styles.css';
import { useDomInput } from './useDomInput';
import { useDomSelect } from './useDomSelect';
import { useDomCheckboxGroup } from './useDomCheckboxGroup';
import { useDomRadioGroup } from './useDomRadioGroup';
function mapToJson(map) {
  return JSON.stringify([...map]);
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

  const [checkboxState, setCheckboxState] = useState(
    new Map().set('fruitJuicesOrange', true),
  );

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
      <p id={`${checkboxGroupName}-value`}>{mapToJson(checkboxState)}</p>
      <p id={`${radioGroupName}-value`}>{radioValue}</p>
    </div>
  );
}
