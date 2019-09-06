import { eventHandler } from './eventHandler

test('Calls handler', () => {
  const event = { target: { value: 'Descending' } };
  const handler = jest.fn();
  eventHandler(event, handler);
  expect(handler).toBeCalledTimes(1);
});

test('Provides correct value to handler', () => {
  const event = { target: { value: 'Descending' } };
  const handler = jest.fn();
  eventHandler(event, handler);
  expect(handler).toBeCalledWith('Descending');
  expect(1).toBe(2);
});
