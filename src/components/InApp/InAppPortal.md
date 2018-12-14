```js
initialState = {
  isOpen: false
};

const toggleInApp = () => setState({isOpen: !state.isOpen});

<div>
  <div id="inAppContainer" style={{color: 'red!important'}}>
    I see a red door and I want it painted...
  </div>
  {state.isOpen && (
    <InAppPortal parentElementName="#inAppContainer">
      <InAppBase
        onClose={toggleInApp}
      >
        <div style={{margin: 'auto'}}>And here it is!</div>
      </InAppBase>
    </InAppPortal>
  )}
  <br />
  <Button onClick={toggleInApp}>Black...</Button>
</div>
```
```js noeditor
<ComponentHtmlMarkup>
  <InAppPortal>
    <InAppBase
      onClose={() => {}}
      style={{width: "600px", height: "400px"}}
    >
      <div>content</div>
    </InAppBase>
  </InAppPortal>
</ComponentHtmlMarkup>
```

Use InAppPortal when you need InApp to be i.e directly in the body html tag.
