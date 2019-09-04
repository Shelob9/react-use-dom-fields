# React User DOM Inpouts (WORK IN PROGRESS DO NOT USE)

Tracks and controls the state of form fields in native DOM, whose rendering is NOT controlled by React.

* [Edit With CodeSandbox](https://github.com/Shelob9/react-use-dom-fields/tree/master/)
* [Edit With Gitpod](http://gitpod.io#https://github.com/Shelob9/react-use-dom-fields/tree/master/)

## Components

- Input fields `useDomInput`
- Select fields `useDomSelect`
- Groups of radio fields `useDomRadioGroup`
- Groups of checkbox fields `useCheckboxGroup`

## WHY??

Legacy code.

In Caldera Forms, we are moving field rendering to React components. This will allow us to move all form state managment to one place -- inside the `CalderaFormsRenderer` component, without forcing all fields to suddenly be React-based. [See related issue](https://github.com/CalderaWP/Caldera-Forms/issues/3337)

It could also be used to hydrate an HTML form inside of a React app.

## TODO

- [] Restructure as module, not app.
- [] Fix typings.
- [] Tests
- [] Export compoents

## Example

### Input Field `useDOMInput`

The `useDOMInput` can be used for any type of HTML input. Groups of checkbox and radio inputs have their own components.

```html
<div id="root"></div>
<div id="not-react"><input id="email" type="email" /></div>
```

```jsx
function FormSummary() {
  const [email, setEmail] = useState("Default From React");
  const [emailFieldRef] = useDomInput({
    elementId: "email",
    value: email,
    handler: setEmail
  });
  return (
    <div className="App">
      <h2>React App</h2>
      <p>Email{email}</p>
    </div>
  );
}
```
## Development

* 