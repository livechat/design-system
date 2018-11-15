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
```js noeditor
const buttonStyle = {
  margin: '0 4px',
  width: '150px'
};

<ComponentHtmlMarkup>
  <PopupModal
    onClose={() => {}}
    isOpen
    style={{width: '500px', height: '350px'}}
    title="Danger! Danger!"
    actions={
      <React.Fragment>
        <Button style={buttonStyle} size="large" onClick={() => {}}>Wait, go back</Button>
        <Button style={buttonStyle} size="large" onClick={() => {}} destructive>Yes, delete</Button>
      </React.Fragment>
    }
    icon={<AlertCircleIcon height={54} width={54} fill="#424d57" />}
  >
    You’re about to do something that cannot be undone. Are you sure you want to continue?
  </PopupModal>
</ComponentHtmlMarkup>
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
