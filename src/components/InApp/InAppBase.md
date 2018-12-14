InApps are pop-up that communicate information allowing the user to maintain the context of a particular task. They should be used sparingly as they disable the rest of the application until a required action has been taken.

InApps may be dismissed in 3 ways:
<ul>
  <li>Using the “x” in the upper right corner of the InApp</li>
  <li>Pressing the ESC key</li>
  <li>Clicking / touching outside of the InApp area</li>
</ul>

```js
initialState = {
    isOpen: false
};

const toggleInapp = () => setState({isOpen: !state.isOpen});

<div>
    {state.isOpen && (
        <InAppBase onClose={toggleInapp}>
            <div style={{margin: 'auto'}}>content</div>
        </InAppBase>
    )}
    <Button onClick={toggleInapp}>Open inApp</Button>
</div>
```
```js noeditor
<ComponentHtmlMarkup>
    <InAppBase onClose={() => {}}>
        <div style={{margin: 'auto'}}>content</div>
    </InAppBase>
</ComponentHtmlMarkup>
```

You can provide path to avatar image source and header from (as a DOM node).

```js
initialState = {
    isOpen: false,
    withAvatar: false,
    withFrom: false
};

const toggleInApp = () => setState({isOpen: !state.isOpen});
const toggleInAppType  = type => setState({[type]: !state[type]});
const reset = () => {
    setState({
        isOpen: false,
        withAvatar: false,
        withFrom: false
    });
}

<div>
    {state.isOpen && (
        <InAppBase 
            onClose={reset}
            headerAvatar={state.withAvatar
                ? "https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
                : null
            }
            headerFrom={state.withFrom && (
                <>
                    <strong>Michał</strong> from LiveChat
                </>
            )}
        >
            <div style={{margin: 'auto'}}>content</div>
        </InAppBase>
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
                toggleInAppType('withAvatar');
                toggleInApp();
            }}
        >
            Only avatar
        </Button>
        <Button
            onClick={() => {
                toggleInAppType('withAvatar');
                toggleInAppType('withFrom');
                toggleInApp();
            }}
            primary
        >
            All
        </Button>  
        <Button
            onClick={() => {
                toggleInAppType('withFrom');
                toggleInApp();
            }}
        >
            Only text
        </Button>
    </div>
</div>
```
```js noeditor
<ComponentHtmlMarkup>
    <InAppBase 
        onClose={() => {}}
        headerAvatar="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
        headerFrom={(
            <>
            <strong>Michał</strong> from LiveChat
            </>
        )}
    >
        <div style={{margin: 'auto'}}>content</div>
    </InAppBase>
</ComponentHtmlMarkup>
```
