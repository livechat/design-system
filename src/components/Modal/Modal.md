<h3>Action Modal</h3>

```js
initialState = {
  isOpen: false
};

const handleModalOpen = () => setState({isOpen: true});

const handleModalClose = () => setState({isOpen: false});

<div>
  <ActionModal
    onClose={handleModalClose}
    closeOnEscClick
    isOpen={state.isOpen}
    style={{width: "600px", height: "400px"}}
    title="Title"
    footer={<Button style={{width: "140px"}} size="large" onClick={handleModalClose}>Close</Button>}
  >
    Modal content
  </ActionModal>
  <Button onClick={handleModalOpen}>Open modal</Button>
</div>
```

<h3>Popup Modal</h3>

```js
initialState = {
  isOpen: false
};

const handleModalOpen = () => setState({isOpen: true});

const handleModalClose = () => setState({isOpen: false});

const buttonStyle = {
  margin: '0 4px',
  width: '150px'
};

<div>
  <PopupModal
    onClose={handleModalClose}
    closeOnEscClick
    isOpen={state.isOpen}
    style={{width: '500px', height: '350px'}}
    title="Danger! Danger!"
    actions={
      <React.Fragment>
        <Button style={buttonStyle} size="large" onClick={handleModalClose}>Wait, go back</Button>
        <Button style={buttonStyle} size="large" onClick={handleModalClose} destructive>Yes, delete</Button>
      </React.Fragment>
    }
    icon={<AlertCircleIcon height={54} width={54} fill="#424d57" />}
  >
    You’re about to do something that cannot be undone. Are you sure you want to continue?
  </PopupModal>
  <Button onClick={handleModalOpen}>Open modal</Button>
</div>
```