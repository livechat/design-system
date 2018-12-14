```js
initialState = {
  isOpen: false
};

const toggleInApp = () => setState({isOpen: !state.isOpen});

<div>
  {state.isOpen && (
    <InAppPortal>
      <InAppBase
        onClose={toggleInApp}
        style={{width: "600px", height: "400px"}}
      >
        <div style={{margin: 'auto'}}>content</div>
      </InAppBase>
    </InAppPortal>
  )}
  <Button onClick={toggleInApp}>Open inApp</Button>
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
