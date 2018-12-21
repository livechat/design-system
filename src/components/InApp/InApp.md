```js
initialState = {
  isOpen: false
};

const handleInAppOpen = () => setState({isOpen: true});

const handleInAppClose = () => setState({isOpen: false});

<div>
  {state.isOpen && (
    <InApp
      onClose={handleInAppClose}
      imageSrc="https://cdn.livechat-static.com/api/file/v2/lc/att-old/8656216/fe28d6850106f65c9207f3dcea091099/product-cards-shopify-preview.gif"
      headerAvatar={"https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"}
      headerFrom={
        <React.Fragment>
            <strong>Michał</strong> from LiveChat
        </React.Fragment>
      }
      footer={
        <React.Fragment>
          <Button fullWidth onClick={handleInAppClose} style={{marginRight: '24px'}}>Remind me later</Button>
          <Button primary fullWidth onClick={handleInAppClose}>Check it out!</Button>
        </React.Fragment>  
      }
    >
      <h2>Product Cards for Shopify</h2>
      <p>Sync LiveChat with your Shopify products and send the Product Cards via chat. Save time on searching for links to products and see customers buy more at your store.</p>
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
