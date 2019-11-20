### Basic ButtonGroup

By default ButtonGroup use internal state to track currently selected button. It fires `onIndexChange`callback each time when one of buttons was clicked supling its index.

```js
<ButtonGroup>
  <Button>First Button</Button>
  <Button>Second Button</Button>
  <Button>Third Button</Button>
</ButtonGroup>
```

```js noeditor
<ComponentHtmlMarkup>
  <ButtonGroup>
    <Button>First Button</Button>
    <Button>Second Button</Button>
    <Button>Third Button</Button>
  </ButtonGroup>
</ComponentHtmlMarkup>
```

### Controlled ButtonGroup

If you want to use ButtonGroups as controlled component you can set `currentIndex` props to set which button is active.

```js
initialState = { currentIndex: 0 };

handleClick = (index, e) => {
  setState({
    currentIndex: index
  })
}

<ButtonGroup currentIndex={state.currentIndex} onIndexChange={handleClick}>
  <Button>First Button</Button>
  <Button>Second Button</Button>
  <Button>Third Button</Button>
</ButtonGroup>
```

```js noeditor
<ComponentHtmlMarkup>
  <ButtonGroup currentIndex={1}>
    <Button>First Button</Button>
    <Button>Second Button</Button>
    <Button>Third Button</Button>
  </ButtonGroup>
</ComponentHtmlMarkup>
```
