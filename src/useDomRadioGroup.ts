import { useRef, useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import { EventTargetAny } from './eventHandler';
export const useDomRadioGroup = (props: {
  name: string;
  value: string;
  handler: EventListener;
}) => {
  const { name, value, handler } = props;
  const ref = useRef<NodeListOf<HTMLInputElement> | null>(null);
  useEffectOnce(() => {
    ref.current = document.getElementsByName(name) as NodeListOf<
      HTMLInputElement
    >;
    const callbacks = {};
    if (ref.current.length) {
      ref.current.forEach((radio: HTMLInputElement) => {
        callbacks[radio.id] = (e: EventTargetAny) => {
          if (e.target.value !== 'on') {
            handler(e.target.value);
          }
        };
        radio.addEventListener('change', callbacks[radio.id], true);
      });
      return () => {
        if (ref.current && ref.current.length) {
          ref.current.forEach((radio: HTMLInputElement) => {
            radio.removeEventListener('change', callbacks[radio.id], true);
          });
        }
      };
    } else {
      return () => {};
    }
  });

  useEffect(() => {
    if (ref.current && ref.current.length) {
      ref.current.forEach((radio: HTMLInputElement) => {
        if (value === radio.value) {
          radio.checked = true;
        }
      });
    }
  }, [value]);

  return [ref];
};
