```js
<Tooltip
  offset={1}
  align="center"
  trigger="hover"
  content={<TooltipContent style={{maxWidth: '200px'}} arrowPosition="right" backgroundColor="rgba(66, 77, 87, 0.6)" fontColor="#fff" arrowOffset={20}>
    Your customers can hear sound notifications when using your chat window. They can mute/unmute them during chat. Your customers can hear sound notifications when using your chat window. They can mute/unmute them during chat.
  </TooltipContent>}
  directions={['left']}
>
  <div style={{width: '100px'}}>hover me</div>
</Tooltip>
```
```html
<div class="lc_tooltip">
  <div style="width: 100px;">hover me</div>
  <div class="lc_tooltip-box" style="top: 157px; left: -913.984p">
    <div class="lc_tooltip-box-content">
      <div class="lc_tooltip-content lc_tooltip-content-arrow-right"
           style="background-color: rgba(66, 77, 87, 0.6); color: rgb(255, 255, 255); border-color: 
                  rgba(66, 77, 87, 0.6); top: 20px;"
      >
        Your customers can hear sound notifications when using your 
        chat window. They can mute/unmute them during chat. Your 
        customers can hear sound notifications when using your chat 
        window. They can mute/unmute them during chat.
      </div>
    </div>
  </div>
</div>
```