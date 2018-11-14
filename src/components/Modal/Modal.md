<h3>Modal</h3>

```js
initialState = {
  isOpen: false
};

const handleModalOpen = () => setState({isOpen: true});

const handleModalClose = () => setState({isOpen: false});

<div>
  <Modal
    title="Modal"
    closeModal={handleModalClose}
    closeOnEscClick
    isOpen={state.isOpen}
    style={{width: '400px', height: '400px'}}
  >
    Modal content
    <Button onClick={handleModalClose}>Close</Button>
  </Modal>
  <Button onClick={handleModalOpen}>Open modal</Button>
</div>
```