<h1>This component is deprecated. Please use CSSTooltip or PopperTooltip instead. </h1>

```js
<div style={{ display: "flex" }}>
  <Tooltip
    offset={1}
    align="right"
    trigger="hover"
    content={
      <TooltipContent
        arrowAlign="right"
        arrowPosition="bottom"
        arrowOffset={12}
      >
        Your customers can hear sound notifications when using your chat window.
        They can mute/unmute them during chat. Your customers can hear sound
        notifications when using your chat window. They can mute/unmute them
        during chat.
      </TooltipContent>
    }
    directions={["top"]}
  >
    <div
      style={{
        border: "1px solid rgb(66, 77, 87)",
        borderRadius: "5px",
        padding: "5px"
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
      align="right"
      trigger="hover"
      content={
        <TooltipContent
          arrowAlign="right"
          arrowPosition="bottom"
          arrowOffset={12}
        >
          Your customers can hear sound notifications when using your chat
          window. They can mute/unmute them during chat. Your customers can hear
          sound notifications when using your chat window. They can mute/unmute
          them during chat.
        </TooltipContent>
      }
      directions={["top"]}
    >
      <div
        style={{
          border: "1px solid rgb(66, 77, 87)",
          borderRadius: "5px",
          padding: "5px"
        }}
      >
        hover me
      </div>
    </Tooltip>
  </div>
</ComponentHtmlMarkup>
```
