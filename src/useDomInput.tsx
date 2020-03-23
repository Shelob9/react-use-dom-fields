import { useRef, useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { eventHandler, EventTargetAny } from './eventHandler';
import useObserveExistance from './useObserveExistance';
const debounce = require('debounce');

export type useDomInputProps = {
  elementId: string;
  value: string;
  handler: (value: string) => void;
  document: HTMLDocument;
};

export const useDomInput = (props: useDomInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addListener } = useObserveExistance();

  const { elementId, handler, value } = props;

  // Bind change handler on mount/ unmount
  useEffectOnce(() => {
    addListener(`#${elementId}`, () => {
      inputRef.current = document.getElementById(elementId) as HTMLInputElement;
      if (inputRef.current !== null) {
        handler(inputRef.current.value);
        const callback = debounce((e: EventTargetAny) => {
          eventHandler(e, handler);
        }, 200);

        inputRef.current.addEventListener('keypress', callback, true);
      }
    });
  });

  // Bind value of input to React state
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = value;
  }, [value]);

  return [inputRef];
};

useDomInput.defaultProps = {
  document: window.document,
};
