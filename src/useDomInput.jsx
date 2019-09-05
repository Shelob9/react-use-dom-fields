import { useRef, useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import { eventHandler } from './eventHandler';
import { Exception } from 'handlebars';

export const useDomInput = ({ elementId, value, handler, document }) => {
  const inputRef = useRef(null);

  //Bind change handler on mount/ unmount
  useEffectOnce(() => {
    inputRef.current = document.getElementById(elementId);
    if (null === inputRef.current) {
      throw new Exception(`Input with ID attribute ${elementId} not found`);
    }
    if (inputRef.current && inputRef.current.hasOwnProperty('value')) {
      handler(inputRef.current.value);
    }
    const callback = e => {
      eventHandler(e, handler);
    };
    inputRef.current.addEventListener('keypress', callback, true);
    return () => {
      inputRef.current.removeEventListener('keypress', callback, true);
    };
  });

  //Bind value of input to React state
  useEffect(() => {
    inputRef.current.value = value;
  }, [value]);

  return [inputRef];
};

useDomInput.defaultProps = {
  document: window.document,
};