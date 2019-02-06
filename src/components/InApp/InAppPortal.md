```js
initialState = {
  isOpen: false
};

const toggleInApp = () => setState({isOpen: !state.isOpen});

<div>
  <div style={{color: 'red'}}>
  <p style={{margin: '.5em auto'}}>
      I see a red door and I want it painted...
  </p>
  <Button onClick={toggleInApp}>Black</Button>
  {state.isOpen && (
    <InAppPortal parentElementName="body">
      <InAppBase
        onClose={toggleInApp}
      >
        <p style={{margin: 'auto', textAlign: 'center'}}>
            No colors anymore<br />
            I want them to turn black.
        </p>
      </InAppBase>
    </InAppPortal>
  )}
  </div>
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
