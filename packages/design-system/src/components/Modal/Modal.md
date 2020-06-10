```js
initialState = {
  isOpen: false
};

const handleModalOpen = () => setState({ isOpen: true });

const handleModalClose = () => setState({ isOpen: false });

const buttonStyle = {
  width: "140px",
  margin: "0 4px"
};

<div>
  {state.isOpen && (
    <Modal
      onClose={handleModalClose}
      style={{ width: "600px", height: "400px" }}
      heading="Title"
      footer={
        <React.Fragment>
          <Button
            style={buttonStyle}
            size="large"
            onClick={handleModalClose}
            kind="secondary"
          >
            Secondary
          </Button>
          <Button
            kind="primary"
            style={buttonStyle}
            size="large"
            onClick={handleModalClose}
          >
            Primary
          </Button>
        </React.Fragment>
      }
    >
      Modal content
    </Modal>
  )}
  <Button onClick={handleModalOpen}>Open modal</Button>
</div>;
```

```js noeditor
const buttonStyle = {
  width: "140px",
  margin: "0 4px"
};

<ComponentHtmlMarkup>
  <Modal
    onClose={() => {}}
    style={{ width: "600px", height: "400px" }}
    heading="Title"
    footer={
      <React.Fragment>
        <Button style={buttonStyle} size="large" onClick={() => {}}>
          Secondary
        </Button>
        <Button kind="primary" style={buttonStyle} size="large" onClick={() => {}}>
          Primary
        </Button>
      </React.Fragment>
    }
  >
    Modal content
  </Modal>
</ComponentHtmlMarkup>;
```

Modals include input areas that the user may interact with, such as Forms, Dropdowns, Selectors, and Links.
Modal basic sections:

<ul>
  <li>
    <b>Title (optional)</b><br />
    Provides concise overview of the contents of the modal. The title mirrors the action or button that was clicked by the user.
  </li>
  <li>
    <b>Body</b><br />
    The body content within a Modal should be as minimal as possible. Components that may be used in Modals include: Form fields, Text Area, Select, and Radio Buttons.
  </li>
  <li>
    <b>Footer</b><br />
    The footer area of a Modal contains a set of buttons - primary action and secondary action.
  </li>
</ul>
