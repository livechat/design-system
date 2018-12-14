```js
initialState = {
  isOpen: false
};

const handleInAppOpen = () => setState({isOpen: true});

const handleInAppClose = () => setState({isOpen: false});

<div>
  {state.isOpen && (
    <InAppBase onClose={handleInAppClose}>
      <div style={{margin: 'auto'}}>content</div>
    </InAppBase>
  )}
  <Button onClick={handleInAppOpen}>Open inApp</Button>
</div>
```
```js noeditor
<ComponentHtmlMarkup>
  <InAppBase
    onClose={() => {}}
    style={{width: "600px", height: "400px"}}
  >
    <div>content</div>
  </InAppBase>
</ComponentHtmlMarkup>
```

InApps are pop-up that communicate information allowing the user to maintain the context of a particular task. They should be used sparingly as they disable the rest of the application until a required action has been taken.

InApps may be dismissed in 3 ways:
<ul>
  <li>Using the “x” in the upper right corner of the InApp</li>
  <li>Pressing the ESC key</li>
  <li>Clicking / touching outside of the InApp area</li>
</ul>
