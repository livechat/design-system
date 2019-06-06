### Cards

Cards are used to group related content together to make LiveChat easier to scan and comprehend.

```js
<div style={{ width: "300px" }}>
  <Card title="Title goes here" img="https://via.placeholder.com/100">
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore
      </p>
      <Divider />
      <div style={{ paddingRight: "10px", display: "inline-block" }}>
        <Button>Action 1</Button>
      </div>
      <Button>Action 2</Button>
    </div>
  </Card>
</div>
```

```js noeditor
<ComponentHtmlMarkup>
  <div style={{ width: "300px" }}>
    <Card title="Title goes here" img="https://via.placeholder.com/100">
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>
        <Divider />
        <div style={{ paddingRight: "10px", display: "inline-block" }}>
          <Button>Action 1</Button>
        </div>
        <Button>Action 2</Button>
      </div>
    </Card>
  </div>
</ComponentHtmlMarkup>
```

### Loading

When a card is loading, provide feedback to the user by display a spinner. Once the data has loaded, the spinner disappears from the card component.

```js
<div style={{ width: "300px" }}>
  <Card title="Title goes here" img="https://via.placeholder.com/100">
    <div style={{ height: "200px", display: "flex", justifyContent: "center" }}>
      <Loader size="medium" />
    </div>
  </Card>
</div>
```

```js noeditor
<ComponentHtmlMarkup>
  <div style={{ width: "300px" }}>
    <Card title="Title goes here" img="https://via.placeholder.com/100">
      <div
        style={{ height: "200px", display: "flex", justifyContent: "center" }}
      >
        <Loader size="medium" />
      </div>
    </Card>
  </div>
</ComponentHtmlMarkup>
```

### Content guidelines

#### TITLE

Card title should be:

- Descriptive: Label the type of content grouped in the card
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep titles to single sentence
  - Written in sentence case

#### BUTTON

Buttons should be:

- Clear and predictable: Users should be able to anticipate what will happen when they click a button.
