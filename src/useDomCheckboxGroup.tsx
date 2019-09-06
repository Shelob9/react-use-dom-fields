import React, { useRef, useEffect, useCallback } from 'react';
import { useEffectOnce } from 'react-use';
import { eventHandler, EventTarget, EventTargetAny } from './eventHandler';

export const useDomCheckboxGroup = (props: {
  name: string;
  value: Array<string>;
  handler: (values: Array<string>) => void;
}) => {
  const { name, value, handler } = props;
  const ref = useRef(null);
  const setValues = useCallback(
    ref => {
      const update: Array<string> = [];
      ref.current.forEach(checkbox => {
        if (checkbox.checked) {
          update.push(checkbox.id);
        }
      });
      handler(update);
    },
    [handler, value],
  );
  //Bind change handler on mount/ unmount
  useEffectOnce(() => {
    ref.current = document.getElementsByName(name);
    let callbacks: { [index: string]: () => void } = {};

    if (ref.current.length) {
      setValues(ref);
      ref.current.forEach(checkbox => {
        const checkboxId: string = checkbox.id;
        callbacks[checkboxId] = () => {
          setValues(ref);
        };
        checkbox.addEventListener('change', callbacks[checkboxId], true);
      });
    }
  });

  return [ref];
};

useDomCheckboxGroup.defaultProps = {
  document: window.document,
};
