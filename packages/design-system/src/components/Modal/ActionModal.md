```js
initialState = {
  isOpen: false
};

const handleModalOpen = () => setState({ isOpen: true });

const handleModalClose = () => setState({ isOpen: false });

const buttonStyle = {
  margin: "0 4px",
  width: "150px"
};

<div>
  {state.isOpen && (
    <ActionModal
      onClose={handleModalClose}
      style={{ width: "410px" }}
      heading="Danger! Danger!"
      actions={
        <React.Fragment>
          <Button
            style={buttonStyle}
            size="large"
            onClick={handleModalClose}
            kind="secondary"
          >
            Wait, go back
          </Button>
          <Button
            style={buttonStyle}
            size="large"
            onClick={handleModalClose}
            kind="destructive"
          >
            Yes, delete
          </Button>
        </React.Fragment>
      }
      icon={<AlertCircleIcon height={54} width={54} fill="#424d57" />}
    >
      You’re about to do something that cannot be undone. Are you sure you want
      to continue?
    </ActionModal>
  )}
  <Button onClick={handleModalOpen}>Open modal</Button>
</div>;
```

```js noeditor
const buttonStyle = {
  margin: "0 4px",
  width: "150px"
};

<ComponentHtmlMarkup>
  <ActionModal
    onClose={() => {}}
    style={{ width: "410px" }}
    heading="Danger! Danger!"
    actions={
      <React.Fragment>
        <Button style={buttonStyle} size="large" onClick={() => {}} kind="secondary">
          Wait, go back
        </Button>
        <Button style={buttonStyle} size="large" onClick={() => {}} kind="destructive">
          Yes, delete
        </Button>
      </React.Fragment>
    }
    icon={<AlertCircleIcon height={54} width={54} fill="#424d57" />}
  >
    You’re about to do something that cannot be undone. Are you sure you want to
    continue?
  </ActionModal>
</ComponentHtmlMarkup>;
```

Examples:

<ul>
  <li>
    <b>Upgrade modal</b><br />
    Upgrade Modals are used to validate user decisions or to gain secondary confirmation from the user.
  </li>
  <li>
    <b>Confirmation modal</b><br />
    Confirmation modals are used as a style of notification. They can encourage desired user behaviour. 
  </li>
  <li>
    <b>Danger modal</b><br />
    Danger Modals are used to validate destructive user actions.
  </li>
</ul>
