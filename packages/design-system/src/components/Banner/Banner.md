### Banner

## Usage

Alert banners are used to let users know about important informations that require immediate action or attention.

### Small

This is appropriate for components from 180px to 400px width. Use it in sidebars, mobile and any other contextual use, where space is the limitation.

Info
```js
<Banner onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Banner>
```

```js noeditor
<ComponentHtmlMarkup>
<Banner onClose={()=>window.alert('close')}> A description with a maximum of 100 characters. That usually means only one or two sentences. </Banner>
</ComponentHtmlMarkup>
```

Error / blocked
```js
<Banner type="error" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```

```js noeditor
<ComponentHtmlMarkup>
<Banner type="error" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```
Warning

```js
<Banner type="warning" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```

```js noeditor
<ComponentHtmlMarkup>
<Banner type="warning" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```
Success
```js
<Banner type="success" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```

```js noeditor
<ComponentHtmlMarkup>
<Banner type="success" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```

### Medium
This is appropriate for components from 400px to around 800px width.

Max text colum width is 640px

Info
```js
<Banner size="medium" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```

```js noeditor
<ComponentHtmlMarkup>
  <Banner size="medium" onClose={()=>window.alert('close')}>
  A description with a maximum of 100 characters. That usually means only one or two sentences.
  </Banner>
</ComponentHtmlMarkup>
```

Error / blocked
```js
<Banner size="medium" type="error" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="medium" type="error" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```
Warning
```js
<Banner size="medium" type="warning" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="medium" type="warning" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```
Success
```js
<Banner size="medium" type="success" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="medium" type="success" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```
### Large

When there is enough space to fit the button on the side, then this component is transforming to Large form.

Max text colum width is 720px

Info
```js
<Banner size="large" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="large" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```

Error / blocked
```js
<Banner size="large" type="error" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="large" type="error" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```
Warning
```js
<Banner size="large" type="warning" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="large" type="warning" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```
Success
```js
<Banner size="large" type="success" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="large" type="success" onClose={()=>window.alert('close')}>A description with a maximum of 100 characters. That usually means only one or two sentences.</Banner>
</ComponentHtmlMarkup>
```

### RWD support

The component styles don't include RWD media queries. If you need RWD support, you can use [Resize Observer](https://web.dev/en/resize-observer/) and change the size property of the component to the appropriate one. Also, you can write simple media queries with appropriate styles but remember that our styles can change in upcoming releases. Here is an example of a large banner styled as a small one.

```css
@media screen and (max-width: 400px) {
  .component {
    position: relative;

    .lc-banner--large {
      max-width: 400px;

      .lc-banner__content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;

        .lc-banner__content-text {
          margin: 14px 0 0 0;
          max-width: 246px;
        }
      }
    }
  }
}
```