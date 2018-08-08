Tabs make it easy to navigate between views within the same context. They should group similar content with different filters applied.

Give tab a clear label that describes its content.
Tab label should be set in sentence case, and should not exceed three words. Don’t use icons in the tab labels.

```js
<TabsWrapper>
  <TabsList>
    <Tab isSelected description="1">
      Agents
    </Tab>
    <Tab description="3">
      Groups
    </Tab>
  </TabsList>
</TabsWrapper>               
```

```html
<div class="lc-tabs">
  <div class="lc-tabs__list">
    <button class="lc-tab lc-tab--selected">Agents<span class="lc-tab__description">(1)</span></button>
    <button class="lc-tab">Groups<span class="lc-tab__description">(3)</span></button>
  </div>
</div>
```