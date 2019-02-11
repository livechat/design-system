InAppMessages are pop-up that communicate information allowing the user to maintain the context of a particular task. They should be used sparingly as they disable the rest of the application until a required action has been taken.

InAppMessages may be dismissed in 3 ways:
<ul>
  <li>Using the “x” in the upper right corner of the InAppMessage</li>
  <li>Pressing the ESC key</li>
  <li>Clicking / touching outside of the InAppMessage area</li>
</ul>

```js
initialState = {
    isOpen: false
};

const toggleInAppMessage = () => setState({isOpen: !state.isOpen});

<div>
    {state.isOpen && (
        <InAppMessageBase onClose={toggleInAppMessage}>
            <div style={{margin: 'auto'}}>content</div>
        </InAppMessageBase>
    )}
    <Button onClick={toggleInAppMessage}>Open InApp</Button>
</div>
```
```js noeditor
<ComponentHtmlMarkup>
    <InAppMessageBase onClose={() => {}}>
        <div style={{margin: 'auto'}}>content</div>
    </InAppMessageBase>
</ComponentHtmlMarkup>
```

You can provide path to avatar image source and header from (as a DOM node).

```js
initialState = {
    isOpen: false,
    withAvatar: false,
    withFrom: false
};

const toggleInAppMessage = () => setState({isOpen: !state.isOpen});
const toggleInAppMessageType  = type => setState({[type]: !state[type]});
const reset = () => {
    setState({
        isOpen: false,
        withAvatar: false,
        withFrom: false
    });
}

<div>
    {state.isOpen && (
        <InAppMessageBase 
            onClose={reset}
            header={{
              avatar: 
                state.withAvatar
                ? {
                  src: "https://avatars2.githubusercontent.com/u/29309941?s=88&v=4",
                  alt: "Jane"
                }
                : undefined,
              text: state.withFrom ? (
                  <>
                    <strong>Michał</strong> from LiveChat
                  </>
                ): undefined
            }}
        >
            <div style={{margin: 'auto'}}>content</div>
        </InAppMessageBase>
    )}
        <div
            style={{
                display: 'flex',
                flexFlow: 'row no-wrap',
                justifyContent: 'space-around'
            }}
        >
        <Button
            onClick={() => {
                toggleInAppMessageType('withAvatar');
                toggleInAppMessage();
            }}
        >
            Only avatar
        </Button>
        <Button
            onClick={() => {
                toggleInAppMessageType('withAvatar');
                toggleInAppMessageType('withFrom');
                toggleInAppMessage();
            }}
            primary
        >
            All
        </Button>  
        <Button
            onClick={() => {
                toggleInAppMessageType('withFrom');
                toggleInAppMessage();
            }}
        >
            Only text
        </Button>
    </div>
</div>
```
```js noeditor
<ComponentHtmlMarkup>
    <InAppMessageBase 
        onClose={() => {}}
        header={{
            avatar: {
                src: "https://avatars2.githubusercontent.com/u/29309941?s=88&v=4",
                alt: "Jane"
            },
            text: (
                <>
                    <strong>Michał</strong> from LiveChat
                </>
            )
        }}
    >
        <div style={{margin: 'auto'}}>content</div>
    </InAppMessageBase>
</ComponentHtmlMarkup>
```
