Use InAppMessages to update users of new functionality or inform about system-level change. It aims to focus all of the user’s attention on a significant and/or impactful changes. Keep in mind the entire flow when using benefits modals. Always offer a dismiss option at each point in the journey.


InAppMessage may be dismissed in 3 ways:
  * Using the `X` in the upper right corner of the InAppMessage,
  * Pressing the `ESC` key,
  * Clicking/touching outside of the InAppMessage area.

All the ways listed above should close InApp and should not perform any additional action (i.e., CTA button action, or remind me later).

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

You can provide avatar path and/or header *from* text (i.e., *Jane from LiveChat*).

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
            kind="primary"
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

Currently, InAppMessageBase renders two types of InAppMessages:
 * single-column with an image in the top,
 * text-only.

In future releases, there will be 2-columns layout available.

Below you can find default values for min/max height/width:
 * *min-height: 400px* (unset for mobile ),
 * *max-height: calc(100vh - 80px)* ,
 * *min-width: 320px* (unset for mobile),
 * *max-width: 800px*.

InAppMessageBase breakpoints:
 * 2-columns: *min-width: 640px* (not implemented yet),
 * single-column: *(min-width: 400px) and (max-width: 639px)*,
 * text-only: *max-width: 399px*.
