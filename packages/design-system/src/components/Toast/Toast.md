Toast is a small message that by default shows up in the top middle of the screen. It disappears on its own after a few seconds. It provides a feedback about an operation for user.

### Toast types
Design System provides 5 different types of toasts. Use it with any library you want, ie. Redux. 

#### Success toast

```js
<Toast variant='success' removable>Message sent!</Toast>
```
```js noeditor
<ComponentHtmlMarkup>
  <Toast variant='success' removable>Message sent!</Toast>
</ComponentHtmlMarkup>
```

#### Warning Toast

```js
<Toast variant='warning' removable>Check if everything is fine.</Toast>
```
```js noeditor
<ComponentHtmlMarkup>
  <Toast variant='warning' removable>Check if everything is fine.</Toast>
</ComponentHtmlMarkup>
```

#### Error Toast

```js
<Toast variant='error' removable>Message could not be sent.</Toast>
```
```js noeditor
<ComponentHtmlMarkup>
  <Toast variant='error' removable>Message could not be sent.</Toast>
</ComponentHtmlMarkup>
```

#### Info Toast

```js
<Toast variant='info' removable>Sending message...</Toast>
```
```js noeditor
<ComponentHtmlMarkup>
  <Toast variant='info' removable>Sending message...</Toast>
</ComponentHtmlMarkup>
```

#### Notification Toast

```js
<Toast removable>Notification message</Toast>
```
```js noeditor
<ComponentHtmlMarkup>
  <Toast removable>Notification message</Toast>
</ComponentHtmlMarkup>
```

#### Toast with action

```js
const actionHandler = () => alert('click');

<Toast variant='error' action={{handler: actionHandler, label: 'Action'}} removable>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</Toast>
```
```js noeditor
const actionHandler = () => alert('click');
<ComponentHtmlMarkup>
  <Toast variant='error' action={{handler: actionHandler, label: 'Action'}} removable>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Toast>
</ComponentHtmlMarkup>
```
