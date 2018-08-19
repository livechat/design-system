Tabs make it easy to navigate between views within the same context. They should group similar content with different filters applied.

Give tab a clear label that describes its content.
Tab label should be set in sentence case, and should not exceed three words. Don’t use icons in the tab labels.
```js
initialState = { selectedTab: 'agents' };
const items = [
  {id: 'agents', title: 'Agents', count: 1},
  {id: 'groups', title: 'Groups', count: 3}
];

<div>
  <TabsWrapper>
    <TabsList>
      {items.map(({id, count, title}) => (
        <Tab
          onSelect={() => setState({selectedTab: id})}
          key={id}
          isSelected={state.selectedTab === id}
          description={count}
        >
          {title}
        </Tab>
      ))}
    </TabsList>
  </TabsWrapper>
</div>            
```

```html
<div class="lc-tabs">
  <div class="lc-tabs__list">
    <button class="lc-tab lc-tab--selected">Agents<span class="lc-tab__description">(1)</span></button>
    <button class="lc-tab">Groups<span class="lc-tab__description">(3)</span></button>
  </div>
</div>
```