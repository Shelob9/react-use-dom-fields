import { useRef, useCallback } from 'react';
import { useEffectOnce } from 'react-use';

export const useDomCheckboxGroup = (props: {
  name: string;
  value: Array<string>;
  handler: (values: Array<string>) => void;
}) => {
  const { name, handler } = props;
  const ref = useRef<NodeListOf<HTMLElement> | null>(null);
  const setValues = useCallback(
    currentRef => {
      const update: Array<string> = [];
      currentRef.current.forEach((checkbox: HTMLInputElement) => {
        if (checkbox.checked) {
          update.push(checkbox.id);
        }
      });
      handler(update);
    },
    [handler]
  );
  // Bind change handler on mount/ unmount
  useEffectOnce(() => {
    const group: NodeListOf<HTMLElement> = document.getElementsByName(name);
    ref.current = group;
    const callbacks: { [index: string]: () => void } = {};

    if (ref.current && ref.current.length) {
      setValues(ref);
      ref.current.forEach((checkbox: HTMLInputElement) => {
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
