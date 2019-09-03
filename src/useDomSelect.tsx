import React, { useRef, useEffect, useCallback } from "react";
import { useEffectOnce } from "react-use";
import { eventHandler } from "./eventHandler";

export const useDomSelect = (props: {
  elementId: string;
  value: string;
  handler?: EventListener | undefined;
}) => {
  const { elementId, value, handler } = props;
  const selectRef = useRef(null);

  //Bind change handler on mount/ unmount
  useEffectOnce(() => {
    selectRef.current = document.getElementById(elementId);
    handler(selectRef.current.value);
    const callback = e => eventHandler(e, handler);
    selectRef.current.addEventListener("change", callback, true);
    return () => {
      selectRef.current.removeEventListener("change", callback, true);
    };
  });

  //Bind value of input to React state
  useEffect(() => {
    selectRef.current.value = value;
  }, [value]);

  return [selectRef];
};