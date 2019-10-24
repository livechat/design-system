```js
initialState = {
  isOpen: false
};

const handleModalOpen = () => setState({isOpen: true});

const handleModalClose = () => setState({isOpen: false});

<div>
  {state.isOpen && (
    <ModalPortal>
      <ModalBase
        onClose={handleModalClose}
        style={{width: "600px", height: "400px"}}
      >
        <div style={{margin: 'auto'}}>content</div>
      </ModalBase>
    </ModalPortal>
  )}
  <Button onClick={handleModalOpen}>Open modal</Button>
</div>
```
```js noeditor
<ComponentHtmlMarkup>
  <ModalPortal>
    <ModalBase
      onClose={() => {}}
      style={{width: "600px", height: "400px"}}
    >
      <div>content</div>
    </ModalBase>
  </ModalPortal>
</ComponentHtmlMarkup>
```

Use ModalPortal when you need Modal to be i.e directly in the body html tag.
