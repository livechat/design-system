<h1>This component is deprecated. Please use CSSTooltip or PopperTooltip instead. </h1>

```js
<div style={{ display: "flex" }}>
  <Tooltip
    offset={1}
    align="center"
    trigger="hover"
    content={<TooltipContent arrowPosition="left">tooltip</TooltipContent>}
    directions={["right"]}
  >
    <div
      style={{
        border: "1px solid rgb(66, 77, 87)",
        borderRadius: "5px",
        padding: "20px 5px"
      }}
    >
      hover me
    </div>
  </Tooltip>
</div>
```

```js noeditor
<ComponentHtmlMarkup>
  <div style={{ display: "flex" }}>
    <Tooltip
      offset={1}
      align="center"
      trigger="hover"
      content={<TooltipContent arrowPosition="left">tooltip</TooltipContent>}
      directions={["right"]}
    >
      <div
        style={{
          border: "1px solid rgb(66, 77, 87)",
          borderRadius: "5px",
          padding: "20px 5px"
        }}
      >
        hover me
      </div>
    </Tooltip>
  </div>
</ComponentHtmlMarkup>
```
