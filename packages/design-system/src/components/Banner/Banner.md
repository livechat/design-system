### Banner - Notifications

## Usage

### Small

This is appropriate for components from 180px to 400px width. Use it in sidebars, mobile and any other contextual use, where space is the limitation.

Info
```js
<Banner text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} onClose={()=>window.alert('close')}/>
```

```js noeditor
<ComponentHtmlMarkup>
<Banner text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} onClose={()=>window.alert('close')}/>
</ComponentHtmlMarkup>
```

Error / blocked
```js
<Banner type="error" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
```

```js noeditor
<ComponentHtmlMarkup>
<Banner type="error" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
</ComponentHtmlMarkup>
```
Warning

```js
<Banner type="warning" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
```

```js noeditor
<ComponentHtmlMarkup>
<Banner type="warning" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
</ComponentHtmlMarkup>
```
Success
```js
<Banner type="success" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
```

```js noeditor
<ComponentHtmlMarkup>
<Banner type="success" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
</ComponentHtmlMarkup>
```

### Medium
This is appropriate for components from 400px to around 800px width.

Max text colum width is 520px

Info
```js
<Banner size="medium" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} onClose={()=>window.alert('close')}/>
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="medium" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} onClose={()=>window.alert('close')}/>
</ComponentHtmlMarkup>
```

Error / blocked
```js
<Banner size="medium" type="error" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="medium" type="error" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
</ComponentHtmlMarkup>
```
Warning
```js
<Banner size="medium" type="warning" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="medium" type="warning" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
</ComponentHtmlMarkup>
```
Success
```js
<Banner size="medium" type="success" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="medium" type="success" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
</ComponentHtmlMarkup>
```
### Large

When there is enough space to fit the button on the side, then this component is transforming to Large form.

Max text colum width is 720px

Info
```js
<Banner size="large" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} onClose={()=>window.alert('close')}/>
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="large" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} onClose={()=>window.alert('close')}/>
</ComponentHtmlMarkup>
```

Error / blocked
```js
<Banner size="large" type="error" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="large" type="error" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
</ComponentHtmlMarkup>
```
Warning
```js
<Banner size="large" type="warning" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="large" type="warning" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
</ComponentHtmlMarkup>
```
Success
```js
<Banner size="large" type="success" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
```
```js noeditor
<ComponentHtmlMarkup>
<Banner size="large" type="success" text="A description with a maximum of 100 characters. That usually means only one or two sentences." onClose={()=>window.alert('close')} />
</ComponentHtmlMarkup>
```

### RWD support

This component is not fully responsive. If you need an RWD support, you can use [Resize Observer](https://web.dev/en/resize-observer/) and apply appropriate styles. Here is an example of a large banner styled as a small one.

```css
.component {
  position: relative;

  .lc-banner--large {
    max-width: 400px;

    .lc-banner__content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;

      p {
        margin: 14px 0 0 0;
        max-width: 246px;
      }
    }
  }
}
```