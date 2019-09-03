interface TheEvent extends EventTarget {
  target: EventTarget;
}

export const eventHandler = (
  event: {
    target: { value: string };
  },
  handler: EventListener
) => {
  return handler(event.target.value);
};
