import { useRef, useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import { eventHandler, EventTargetAny } from './eventHandler';
const debounce = require('debounce');

export const useDomSelect = (props: {
  elementId: string;
  value: string;
  handler: (value: string) => void;
}) => {
  const { elementId, value, handler } = props;
  const selectRef = useRef<HTMLInputElement | null>(null);

  // Bind change handler on mount/ unmount
  useEffectOnce(() => {
    selectRef.current = document.getElementById(elementId) as HTMLInputElement;
    if (!selectRef.current) {
      return;
    }
    handler(selectRef.current.value);
    const callback = debounce((e: EventTargetAny) => {
      eventHandler(e, handler);
    }, 200);

    selectRef.current.addEventListener('change', callback, true);
    return () => {
      if (!selectRef.current) {
        return;
      }
      selectRef.current.removeEventListener('change', callback, true);
    };
  });

  // Bind value of input to React state
  useEffect(() => {
    if (!selectRef.current) {
      return;
    }
    selectRef.current.value = value;
  }, [value]);

  return [selectRef];
};
