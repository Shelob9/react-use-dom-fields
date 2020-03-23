import React, { useState, useEffect } from 'react';
import './styles.css';
import { useDomInput } from './useDomInput';
import { useDomSelect } from './useDomSelect';
import { useDomCheckboxGroup } from './useDomCheckboxGroup';
import { useDomRadioGroup } from './useDomRadioGroup';
import { useToggle } from 'react-use';

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
  const [dynamicField1Value, setDynamicField1Value] = useState('');
  const [dynamicField2Value, setDynamicField2Value] = useState('');

  const [shouldSendStateUpdate, setShouldSendStateUpdate] = useToggle(false);
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

  const dynamicField1Id = 'dyn-1';
  useDomInput({
    elementId: dynamicField1Id,
    value: dynamicField1Value,
    handler: setDynamicField1Value,
    document,
  });

  const dynamicField2Id = 'dyn-2';
  useDomInput({
    elementId: dynamicField2Id,
    value: dynamicField2Value,
    handler: setDynamicField2Value,
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

  useEffect(() => {
    if (shouldSendStateUpdate === true) {
      setShouldSendStateUpdate(false);
      setTextValue('Text Reset');
      setSelectValue('large');
      setCheckboxState(['fruitJuicesGrape', 'fruitJuicesOrange']);
      setRadioValue('green');
    }
  }, [shouldSendStateUpdate, setShouldSendStateUpdate]);

  return (
    <div className="App">
      <h2>React App</h2>
      <div>
        <label htmlFor="toggle-hide">Reset Field State</label>
        <input
          type="radio"
          id="toggle-hide"
          checked={shouldSendStateUpdate}
          onChange={() => setShouldSendStateUpdate(true)}
        />
      </div>
      <p id={`${inputId}-value`}>{textValue}</p>
      <p id={`${selectId}-value`}>{selectValue}</p>
      <p id={`${radioGroupName}-value`}>{radioValue}</p>
      <p id={`${checkboxGroupName}-value`}>{checkboxState.join(' | ')}</p>
      <p>
        D1: <span id="dyn-1-value">{dynamicField1Value}</span>
      </p>
      <p>
        D2: <span id="dyn-2-value">{dynamicField2Value}</span>
      </p>
    </div>
  );
}
