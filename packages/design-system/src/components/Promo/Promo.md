### Promo

## Usage

### Small

This is appropriate for components from 180px to 400px width. Use it in sidebars, mobile and any other contextual use, where space is the limitation.

```js
<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')} linkText="Link button" buttonText="Primary action"> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

```js noeditor
<ComponentHtmlMarkup>
<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
</ComponentHtmlMarkup>
```

### Medium

This is appropriate for components from 400px to around 800px width.

Max text colum width is 520px

```js
<Promo size="medium" linkText="Link button" buttonText="Primary action" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

```js noeditor
<ComponentHtmlMarkup>
<Promo size="medium" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
</ComponentHtmlMarkup>
```

### Large

Max text colum width is 520px

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
<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')} linkText="Link button" buttonText="Primary action"> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```
#### On greys
```js
<Promo light size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')} linkText="Link button" buttonText="Primary action"> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```