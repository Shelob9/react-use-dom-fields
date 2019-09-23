import { useRef, useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import { eventHandler, EventTargetAny } from './eventHandler';
const debounce = require('debounce');

export type useDomInputProps = {
  elementId: string;
  value: string;
  handler: (value: string) => void;
  document: HTMLDocument;
};

export const useDomInput = (props: useDomInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { elementId, handler, value } = props;

  // Bind change handler on mount/ unmount
  useEffectOnce(() => {
    inputRef.current = document.getElementById(elementId) as HTMLInputElement;
    if (inputRef.current === null) {
      throw new Error(`Input with ID attribute ${elementId} not found`);
    }
    handler(inputRef.current.value);

    const callback = debounce((e: EventTargetAny) => {
      eventHandler(e, handler);
    }, 200);

    inputRef.current.addEventListener('keypress', callback, true);

    return () => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.removeEventListener('keypress', callback, true);
    };
  });

  // Bind value of input to React state
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = value;
  }, []);

  return [inputRef];
};

useDomInput.defaultProps = {
  document: window.document,
};
