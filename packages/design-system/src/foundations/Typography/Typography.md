Keep the number of styles to the minimum, so as not to confuse users. Typographic styles should be meaningful and tied to an appropriate function in UI.

## Typeface: Source Sans Pro
- App uses one font for both Headings & Body.
- Web uses different fonts for headings and body
- Headings: Merriweather
- Body: Source Sans Pro

## Text sizes

```js noeditor
<h1>H1/Heading Large</h1>
```
```css
font-size: 32px;
line-height: 40px;
font-weight: 600;
```

<h2>H2/Page title/Modal title</h2>

```css
font-size: 24px;
line-height: 28px;
font-weight: 600;
```

<h3>H3/Heading</h3>

```css
font-size: 20px;
line-height: 24px;
font-weight: 600;
```

<h4>H4/Subheading</h4>

```css
font-size: 16px;
line-height: 24px;
font-weight: 600;
```

<p>Body default</p>

```css
font-size: 15px;
line-height: 22px;
font-weight: 400;
```

<p style={{fontSize: '14px', lineHeight: '20px', fontWeight: 400}}>Meta text (Validation errors, form labels)</p>

```css
font-size: 14px;
line-height: 20px;
font-weight: 400;
```

<p style={{fontSize: '13px', lineHeight: '16px', fontWeight: 400}}>Caption</p>

```css
font-size: 13px;
line-height: 16px;
font-weight: 400;
```
```js
<p style={{fontSize: '15px', lineHeight: '20px', fontWeight: 600}}>Button labels</p>
```
```css
font-size: 15px;
line-height: 20px;
font-weight: 600;
```

## Line height
- Standard UI 1:1.5
- Headers 1:1.25

## Paragraphs
For the optimum readability, cape the line-length at 52-78 characters.

## Text colors
Use contrast to communicate hierarchy and meaning to keep the color choices simple.

- Primary - 100% contrast on white
- Secondary - 80% contrast on white
- Light secondary - 60% contrast on white
- Placeholder - 30% contrast on white
<img style="width: 100%;" src="./colors_gray.png" alt="Semantic colors" />

- Semantic (Success, Info, Warning) 100%
<img style="width: 100%;" src="./colors.png" alt="Semantic colors" />