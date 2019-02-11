```js
initialState = {
  isOpen: false
};


const toggleInAppMessage = () => setState({isOpen: !state.isOpen});

<div>
  {state.isOpen && (
    <InAppMessage
      onClose={toggleInAppMessage}
      image={{
        src: "https://cdn.livechat-static.com/api/file/v2/lc/att-old/8656216/fe28d6850106f65c9207f3dcea091099/product-cards-shopify-preview.gif"
      }}
      header={{
        avatar: {
          src: "https://avatars2.githubusercontent.com/u/29309941?s=88&v=4",
          alt: "Jane"
        },
        text: 
          <React.Fragment>
             <strong>Michał</strong> from LiveChat
          </React.Fragment>       
      }}
      footerButtons={{
        cta: {
          children: 'Check it out!',
          onClick: toggleInAppMessage
        },
        remind: {
          children: 'Remind me later!',
          onClick: toggleInAppMessage
        }
      }}
    >
      <h2>Product Cards for Shopify</h2>
      <p>Sync LiveChat with your Shopify products and send the Product Cards via chat. Save time on searching for links to products and see customers buy more at your store.</p>
    </InAppMessage>
  )}
  <Button onClick={toggleInAppMessage}>Open InApp</Button>
</div>
```

```js 
<ComponentHtmlMarkup>
  <InAppMessage
        onClose={() => {}}
        image={{
          src: "https://cdn.livechat-static.com/api/file/v2/lc/att-old/8656216/fe28d6850106f65c9207f3dcea091099/product-cards-shopify-preview.gif"
        }}
        header={{
          avatar: {
            src: "https://avatars2.githubusercontent.com/u/29309941?s=88&v=4",
            alt: "Jane"
          },
          text: 
            <React.Fragment>
               <strong>Michał</strong> from LiveChat
            </React.Fragment>       
        }}
        footerButtons={{
          cta: {
            children: 'Check it out!',
            onClick: () => {}
          },
          remind: {
            children: 'Remind me later!',
            onClick: () => {}
          }
        }}
      >
        <h2>Product Cards for Shopify</h2>
        <p>Sync LiveChat with your Shopify products and send the Product Cards via chat. Save time on searching for links to products and see customers buy more at your store.</p>
      </InAppMessage>
</ComponentHtmlMarkup>
```

InAppMessages include input areas that the user may interact with, such as Forms, Dropdowns, Selectors, and Links. 
InAppMessage basic sections:
<ul>
  <li>
    <b>Title (optional)</b><br />
    Provides concise overview of the contents of the inAppMessage. The title mirrors the action or button that was clicked by the user.
  </li>
  <li>
    <b>Body</b><br />
    The body content within a InAppMessage should be as minimal as possible. Components that may be used in InAppMessages include: Form fields, Text Area, Select, and Radio Buttons.
  </li>
  <li>
    <b>Footer</b><br />
    The footer area of a InAppMessage contains a set of buttons - primary action and secondary action.
  </li>
</ul>
