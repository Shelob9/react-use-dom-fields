import { useRef, useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import { eventHandler } from './eventHandler';
import { debounce } from 'debounce';

export type useDomInputProps = {
  elementId: string;
  value: string;
  handler: (value: string) => void;
  document: HTMLDocument;
};

export const useDomInput = (props: useDomInputProps) => {
  const inputRef = useRef(null);

  // Bind change handler on mount/ unmount
  useEffectOnce(() => {
    inputRef.current = document.getElementById(elementId);
    if (inputRef.current === null) {
      throw new Exception(`Input with ID attribute ${elementId} not found`);
    }
    handler(inputRef.current.value);

    const callback = debounce(e => {
      eventHandler(e, handler);
    }, 200);

    inputRef.current.addEventListener('keypress', callback, true);

    return () => {
      inputRef.current.removeEventListener('keypress', callback, true);
    };
  });

  // Bind value of input to React state
  useEffect(() => {
    inputRef.current.value = value;
  }, []);

  return [inputRef];
};

useDomInput.defaultProps = {
  document: window.document,
};