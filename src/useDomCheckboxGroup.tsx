import React, { useRef, useEffect, useCallback } from "react";
import { useEffectOnce } from "react-use";
import { eventHandler } from "./eventHandler";

function getFieldLabel(idAttr: string) {
  return document.querySelectorAll(`[for="${idAttr}"]`)[0].innerHTML;
}

function isChecked(idAttr: string) {
  return document.getElementById(idAttr).checked;
}

export const useDomCheckboxGroup = (props: {
  name: string;
  value: Map<string, boolean>;
  handler: Map<string, boolean>;
}) => {
  const { name, value, handler } = props;
  const ref = useRef(null);
  const setValues = useCallback(
    ref => {
      const update = new Map(value);
      ref.current.forEach(checkbox => {
        if (value.get(checkbox.id)) {
          update.set(checkbox.id, true);
        } else {
          update.set(checkbox.id, false);
        }
      });

      handler(update);
    },
    [handler, value]
  );
  //Bind change handler on mount/ unmount
  useEffectOnce(() => {
    ref.current = document.getElementsByName(name);
    if (ref.current.length) {
      setValues(ref);
      ref.current.forEach(checkbox => {
        const callback = e => {
          const update = new Map(value);
          const id = e.target.id;
          if (isChecked(id)) {
            update.set(id, true);
          } else {
            update.set(id, false);
          }
          handler(update);
        };
        checkbox.addEventListener("change", callback, true);
      });
    }
  });

  return [ref];
};
