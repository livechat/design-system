### Promo

## Usage

### Small

This is appropriate for components from 180px to 400px width. Use it in sidebars, mobile and any other contextual use, where space is the limitation.

Small
```js
<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```
```js
<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')} linkText="link button" buttonText="button text"> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

Medium
```js
<Promo size="medium" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

```js
<Promo size="medium" linkText="link button" buttonText="button text" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

Large
```js
<Promo size="large" header="This example headline has 40 characters" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```

Large
```js
<Promo size="large" header="This example headline has 40 characters"  linkText="link button" buttonText="button text" onClose={()=>window.alert('close')}> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>
```
