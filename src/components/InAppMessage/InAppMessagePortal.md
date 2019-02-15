Use InAppMessagePortal when you need InAppMessage to be, i.e., directly in the body HTML tag.

```js
initialState = {
  isOpen: false
};

const toggleInAppMessage = () => setState({isOpen: !state.isOpen});

<div>
  <div style={{color: 'red'}}>
  <p style={{margin: '.5em auto'}}>
      I see a red door and I want it painted...
  </p>
  <Button onClick={toggleInAppMessage}>Black</Button>
  {state.isOpen && (
    <InAppMessagePortal parentElementName="body">
      <InAppMessageBase
        onClose={toggleInAppMessage}
      >
        <p style={{margin: 'auto', textAlign: 'center'}}>
            No colors anymore<br />
            I want them to turn black.
        </p>
      </InAppMessageBase>
    </InAppMessagePortal>
  )}
  </div>
</div>
```
```js noeditor
<ComponentHtmlMarkup>
  <InAppMessagePortal>
    <InAppMessageBase
      onClose={() => {}}
      style={{width: "600px", height: "400px"}}
    >
      <div>content</div>
    </InAppMessageBase>
  </InAppMessagePortal>
</ComponentHtmlMarkup>
```
