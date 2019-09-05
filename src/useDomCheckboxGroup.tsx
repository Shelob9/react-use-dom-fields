import React, { useRef, useEffect, useCallback } from 'react';
import { useEffectOnce } from 'react-use';
import { eventHandler } from './eventHandler';

function getFieldLabel(idAttr: string) {
  return document.querySelectorAll(`[for="${idAttr}"]`)[0].innerHTML;
}

function isChecked(idAttr: string) {
  return document.getElementById(idAttr).checked;
}

export const useDomCheckboxGroup = (props: {
  name: string;
  value: Array<string>;
  handler: Array<string>;
}) => {
  const { name, value, handler } = props;
  const ref = useRef(null);
  const setValues = useCallback(
    ref => {
      const update = [];
      ref.current.forEach(checkbox => {
        if (checkbox.checked) {
          update.push(checkbox.id);
        }
      });
      console.log(update);
    },
    [handler, value],
  );
  //Bind change handler on mount/ unmount
  useEffectOnce(() => {
    ref.current = document.getElementsByName(name);
    if (ref.current.length) {
      setValues(ref);
      ref.current.forEach(checkbox => {
        checkbox.addEventListener('change', setValues, true);
      });
    }
  });

  return [ref];
};
