```js
<div style={{display: 'flex'}}>
  <Tooltip
    offset={1}
    align="center"
    trigger="hover"
    content={<TooltipContent arrowPosition="left">tooltip</TooltipContent>}
    directions={['right']}
  >
    <div style={{border: '1px solid rgb(66, 77, 87)', borderRadius: '5px', padding: '20px 5px'}}>hover me</div>
  </Tooltip>
</div>
```
```html
<div class="lc-tooltip">
  <div style="border: 1px solid rgb(66, 77, 87); border-radius: 5px; padding: 5px;">hover me</div>
  <div class="lc-tooltip-box" style="top: 167px; left: 552.609px;">
    <div class="lc-tooltip-box-content">
      <div 
        class="lc-tooltip__content lc-tooltip__arrow--left"
        style="background-color: rgb(58, 52, 60); color: rgb(255, 255, 255); border-color: rgb(58, 52, 60);"
      >
        tooltip
      </div>
    </div>
  </div>
</div>
```