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

If you want to use ButtonGroups as controlled component you can set `currentindex` props to set which button is active.

```js
initialState = { currentindex: 0 };

handleClick = (index, e) => {
  console.log('index', index)
  setState({
    currentindex: index
  })
}

<ButtonGroup currentindex={state.currentindex} onIndexChange={handleClick}>
  <Button>First Button</Button>
  <Button>Second Button <span style={{
    height: '8px',
    width: '8px',
    backgroundColor: 'red',
    borderRadius: '50%',
    display: 'inline-block',
    position: 'relative',
    bottom: '5px'
  }}></span></Button>
  <Button>Third Button</Button>
</ButtonGroup>
```
