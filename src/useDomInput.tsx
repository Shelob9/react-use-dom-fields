import React, { useRef, useEffect } from "react";
import { useEffectOnce } from "react-use";
import { eventHandler } from "./eventHandler";

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
    const callback = e => eventHandler(e, handler);
    inputRef.current.addEventListener("keypress", callback, true);
    return () => {
      inputRef.current.removeEventListener("keypress", callback, true);
    };
  });

  //Bind value of input to React state
  useEffect(() => {
    inputRef.current.value = value;
  }, [value]);

  return [inputRef];
};
