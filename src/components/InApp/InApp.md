```js
initialState = {
  isOpen: false
};

const handleInAppOpen = () => setState({isOpen: true});

const handleInAppClose = () => setState({isOpen: false});

const buttonStyle = {
  width: '140px',
  margin: '0 4px'
};

<div>
  {state.isOpen && (
    <InApp
      onClose={handleInAppClose}
      footer={
        <React.Fragment>
          <Button style={buttonStyle} size="large" onClick={handleInAppClose}>Secondary</Button>
          <Button primary style={buttonStyle} size="large" onClick={handleInAppClose}>Primary</Button>
        </React.Fragment>  
      }
    >
      InApp content
    </InApp>
  )}
  <Button onClick={handleInAppOpen}>Open inApp</Button>
</div>
```
```js noeditor
const buttonStyle = {
  width: '140px',
  margin: '0 4px'
};

<ComponentHtmlMarkup>
  <InApp
    onClose={() => {}}
    style={{width: "600px", height: "400px"}}
    heading="Title"
    footer={
      <React.Fragment>
        <Button style={buttonStyle} size="large" onClick={() => {}}>Secondary</Button>
        <Button primary style={buttonStyle} size="large" onClick={() => {}}>Primary</Button>
      </React.Fragment>  
    }
  >
    InApp content
  </InApp>
</ComponentHtmlMarkup>
```

InApps include input areas that the user may interact with, such as Forms, Dropdowns, Selectors, and Links. 
InApp basic sections:
<ul>
  <li>
    <b>Title (optional)</b><br />
    Provides concise overview of the contents of the inApp. The title mirrors the action or button that was clicked by the user.
  </li>
  <li>
    <b>Body</b><br />
    The body content within a InApp should be as minimal as possible. Components that may be used in InApps include: Form fields, Text Area, Select, and Radio Buttons.
  </li>
  <li>
    <b>Footer</b><br />
    The footer area of a InApp contains a set of buttons - primary action and secondary action.
  </li>
</ul>
