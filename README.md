# Work In progress

Tracks and controls the state of form fields whose rendering is NOT controlled by React.

### Example

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
    onChange: setEmail
  });
  return (
    <div className="App">
      <h2>React App</h2>
      <p>{textValue}</p>
    </div>
  );
}
```
