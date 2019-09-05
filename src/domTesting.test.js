// src/__tests__/example.js
// query utilities:
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait,
  fireEvent,
} from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';

function getExampleDOM({ onInputChange }) {
  // This is just a raw example of setting up some DOM
  // that we can interact with. Swap this with your UI
  // framework of choice 😉
  const div = document.createElement('div');
  div.innerHTML = `
      <label for="username">Username</label>
      <input id="username" />
      <button>Print Username</button>
    `;
  const button = div.querySelector('button');
  const input = div.querySelector('input');
  input.addEventListener('click', onInputChange);
  return div;
}

test('examples of a dom test', async () => {
  const onInputChange = jest.fn();
  const container = getExampleDOM({ onInputChange });

  const input = getByLabelText(container, 'Username');
  fireEvent.change(input, {
    target: {
      value: 'coffee',
    },
  });
  expect(
      getByLabelText(container, 'Username').value
    ).toBe('coffee');
});
