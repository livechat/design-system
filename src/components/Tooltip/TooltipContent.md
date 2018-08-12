```js
<div style={{display: 'flex'}}>
  <Tooltip
    offset={1}
    align="top"
    trigger="hover"
    content={<TooltipContent arrowPosition="top">
      Your customers can hear sound notifications when using your chat window. They can mute/unmute them during chat. Your customers can hear sound notifications when using your chat window. They can mute/unmute them during chat.
    </TooltipContent>}
    directions={['bottom']}
  >
    <div style={{border: '1px solid rgb(66, 77, 87)', borderRadius: '5px', padding: '5px'}}>hover me</div>
  </Tooltip>
</div>
```
```html
<div class="lc-tooltip">
  <div style="border: 1px solid rgb(66, 77, 87); border-radius: 5px; padding: 5px;">
    hover me
  </div>
  <div class="lc-tooltip-box" style="top: 212px; left: 380.305px;">
    <div class="lc-tooltip-box-content">
      <div class="lc-tooltip__content lc-tooltip__arrow--top">
        Your customers can hear sound notifications when using your chat window.
        They can mute/unmute them during chat. Your customers can hear sound 
        notifications when using your chat window. They can mute/unmute them during chat.
      </div>
    </div>
  </div>
</div>
```