interface EventTarget {
  value: any;
}

interface EventTargetAny {
  target: EventTarget;
}

export const eventHandler = (
  event: EventTargetAny,
  handler: (value: string) => void,
) => {
  return handler(event.target.value);
};
