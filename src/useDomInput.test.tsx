import { getByLabelText, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

import { createElement } from 'react';

import { useDomInput } from './useDomInput';
const Window = require('window');

const InputTest = ({ value, onChange, inputId, document }) => {
  useDomInput({
    elementId: inputId,
    value: value,
    handler: onChange,
    document,
  });
  return createElement(
    'div',
    {
      'data-testid-': `${inputId}-value`,
    },
    value,
  );
};
describe('useDomInput', () => {
  afterEach(cleanup);
  it('calls on change', () => {
    const onChange = jest.fn();
    const inputId = 'firstName';
    const div = document.createElement('div');
    div.innerHTML = `
        <label for="${inputId}">TestInput</label>
        <input id="${inputId}" type="text" />
      `;
    window.document = new Window();
    window.document.body.appendChild(div);

    expect(getByLabelText(div, 'TestInput')).toBeVisible();

    const props = {
      value: '',
      onChange,
      inputId,
      document: window.document,
    };

    render(createElement(InputTest, props));
    fireEvent.change(getByLabelText(div, 'TestInput'), {
      target: { value: 'Lunch' },
    });
    expect(getByLabelText(div, 'TestInput').value).toBe('Lunch');
    expect(onChange).toBeCalledTimes(1);
  });
});
