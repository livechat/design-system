Additional specification for InAppMessage:

1. Avatar: used to personalize the message.
2. Image: relates to the InAppMessage copy and makes the idea more accessible.
3. Title (H2 Heading): use the title to communicate the main benefit in an active and personalized way. Personalize where you can (e.g., “Your”). Make it short and meaningful.
4. Message: don’t overwhelm with too much info. Keep message length to the minimum. Tell why the new feature or update is important to the user. Be considerate of the viewers time and patience.
5. Actions: contains a maximum of 2 buttons. A primary action and some sort of "dismiss" button. The main action should be a primary button that uses self-describing action verbs ('Get started' instead of 'OK').


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
