Tabs make it easy to navigate between views within the same context. They should group similar content with different filters applied.

Give tab a clear label that describes its content.
Tab label should be set in sentence case, and should not exceed three words. Don’t use icons in the tab labels.

```js
<TabsWrapper>
  <TabsList>
    <Tab isSelected lightText="1">
      Agents
    </Tab>
    <Tab lightText="3">
      Groups
    </Tab>
  </TabsList>
</TabsWrapper>               
```

```html
<div class="lc_tabs-wrapper">
  <div class="lc_tabs-list">
    <button class="lc_tab lc_tab-selected">Agents<span class="lc_light-text">(1)</span></button>
    <button class="lc_tab">Groups<span class="lc_light-text">(3)</span></button>
  </div>
</div>
```