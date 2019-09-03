import React, { useRef, useEffect } from "react";
import { useEffectOnce } from "react-use";

interface EventTarget {
  event: {
    target: { value: string };
  };
}

function inputChangeHandler(event: HTMLInputElement, handler: EventListener) {
  return handler(event.target.value);
}

export const useDomInput = (props: {
  elementId: string;
  value: string;
  handler?: EventListener | undefined;
}) => {
  const { elementId, value, handler } = props;
  const inputRef = useRef(null);

  //Bind change handler on mount/ unmount
  useEffectOnce(() => {
    inputRef.current = document.getElementById(elementId);
    handler(inputRef.current.value);
    const callback = e => inputChangeHandler(e, handler);
    inputRef.current.addEventListener("keypress", callback, true);
    return () => {
      inputRef.current.removeEventListener("keypress", callback, true);
    };
  });

  //Bind value of input to React state
  useEffect(() => {
    inputRef.current.value = value;
  });

  return [inputRef];
};
