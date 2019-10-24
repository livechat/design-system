```js
initialState = {
  isOpen: false
};

const handleModalOpen = () => setState({isOpen: true});

const handleModalClose = () => setState({isOpen: false});

<div>
  {state.isOpen && (
    <ModalBase
      onClose={handleModalClose}
      style={{width: "600px", height: "400px"}}
    >
      <div style={{margin: 'auto'}}>content</div>
    </ModalBase>
  )}
  <Button onClick={handleModalOpen}>Open modal</Button>
</div>
```
```js noeditor
<ComponentHtmlMarkup>
  <ModalBase
    onClose={() => {}}
    style={{width: "600px", height: "400px"}}
  >
    <div>content</div>
  </ModalBase>
</ComponentHtmlMarkup>
```

Modals are pop-up that communicate information allowing the user to maintain the context of a particular task. They should be used sparingly as they disable the rest of the application until a required action has been taken.

Modals may be dismissed in 3 ways:
<ul>
  <li>Using the “x” in the upper right corner of the Modal</li>
  <li>Pressing the ESC key</li>
  <li>Clicking / touching outside of the Modal area</li>
</ul>
