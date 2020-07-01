### Promo

## Usage

Promo banner component is used to let users know about upgrade options, new features, or any other information that doesn't require immediate action. This component should be used wisely so don't overuse it too often. Remember to always specify the action that you want to promote.

### Small

This is appropriate for components from 180px to 400px width. Use it in sidebars, mobile and any other contextual use, where space is the limitation.

```js
<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')} linkText="Link button" buttonText="Primary action"   img="https://via.placeholder.com/100"
> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

```js
<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')} linkText="Link button" buttonText="Primary action"
> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

```js noeditor
<ComponentHtmlMarkup>
<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
</ComponentHtmlMarkup>
```

### Medium

This is appropriate for components from 400px to around 800px width.

Max text colum width is 680px

```js
<Promo size="medium" linkText="Link button" buttonText="Primary action" header="This example headline has 40 characters" onClose={()=>window.alert('close')} img="https://via.placeholder.com/100"> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

```js
<Promo size="medium" linkText="Link button" buttonText="Primary action" header="This example headline has 40 characters" onClose={()=>window.alert('close')} > A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

```js noeditor
<ComponentHtmlMarkup>
<Promo size="medium" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
</ComponentHtmlMarkup>
```

### Large

Max text colum width is 680px

```js
<Promo size="large" header="This example headline has 40 characters"  linkText="Link button" buttonText="Primary action" onClose={()=>window.alert('close')} img="https://via.placeholder.com/100"> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

```js
<Promo size="large" header="This example headline has 40 characters"  linkText="Link button" buttonText="Primary action" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

```js noeditor
<ComponentHtmlMarkup>
<Promo size="large" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
</ComponentHtmlMarkup>
```

### Background

#### On white
```js
<div style={{ padding: '20px', backgroundColor: '#fff' }}>
<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')} linkText="Link button" buttonText="Primary action"> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
</div>
```
#### On greys
```js
<div style={{ padding: '20px', backgroundColor: '#f3f7f9', width: 'fit-content' }}>
<Promo light size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')} linkText="Link button" buttonText="Primary action"> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
</div>
```