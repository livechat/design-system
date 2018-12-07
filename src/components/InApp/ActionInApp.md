```js
initialState = {
  isOpen: false
};

const handleInAppOpen = () => setState({isOpen: true});

const handleInAppClose = () => setState({isOpen: false});

const buttonStyle = {
  margin: '0 4px',
  width: '150px'
};

<div>
  {state.isOpen && (
    <ActionInApp
      onClose={handleInAppClose}
      heading="Danger! Danger!"
      actions={
        <React.Fragment>
          <Button style={buttonStyle} size="large" onClick={handleInAppClose}>Wait, go back</Button>
          <Button style={buttonStyle} size="large" onClick={handleInAppClose} destructive>Yes, delete</Button>
        </React.Fragment>
      }
      icon={<AlertCircleIcon height={54} width={54} fill="#424d57" />}
    >
      <div style={{maxWidth: '300px'}}>You’re about to do something that cannot be undone. Are you sure you want to continue?</div>
    </ActionInApp>
  )}
  <Button onClick={handleInAppOpen}>Open inApp</Button>
</div>
```
```js noeditor
const buttonStyle = {
  margin: '0 4px',
  width: '150px'
};

<ComponentHtmlMarkup>
  <ActionInApp
    onClose={() => {}}
    style={{width: '500px', height: '350px'}}
    heading="Danger! Danger!"
    actions={
      <React.Fragment>
        <Button style={buttonStyle} size="large" onClick={() => {}}>Wait, go back</Button>
        <Button style={buttonStyle} size="large" onClick={() => {}} destructive>Yes, delete</Button>
      </React.Fragment>
    }
    icon={<AlertCircleIcon height={54} width={54} fill="#424d57" />}
  >
    You’re about to do something that cannot be undone. Are you sure you want to continue?
  </ActionInApp>
</ComponentHtmlMarkup>
```

Examples:
<ul>
  <li>
    <b>Upgrade inApp</b><br />
    Upgrade InApps are used to validate user decisions or to gain secondary confirmation from the user.
  </li>
  <li>
    <b>Confirmation inApp</b><br />
    Confirmation inApps are used as a style of notification. They can encourage desired user behaviour. 
  </li>
  <li>
    <b>Danger inApp</b><br />
    Danger InApps are used to validate destructive user actions.
  </li>
</ul>
