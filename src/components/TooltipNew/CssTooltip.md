<h3>CssTooltip</h3>

Almost pure css implementation of tooltip component. You will be able to control it's visibility for instance with css pseudo elements.
Also you can use state to change isVisible property. 

The component is designed for simple use cases where you will not need auto-positioning feature of `PopperTooltip` component.
We suggest using it for instance in a large lists of components, which all items should have tooltips, because it should be better solution
is case of the performance of your application.

Check out 'PROPS & METHODS' tabs. In addition to those listed props you can use any html div element attributes.

Css tooltip visibilty controlling example:
```css
  .your-component {
    &:hover .lc-tooltip {
      opacity: 1;
      visibility: visible;
    }
  }
```

```js
  const tooltipPositions = [
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end',
    'top',
    'top-start',
    'top-end'
  ];

  const items = tooltipPositions.map(position => ({
    key: position, props: {name: position}
  }));

  initialState = {
    selectedPosition: 'bottom',
    isVisible: true
  };

  const handleItemSelect = item => setState({selectedPosition: item, isVisible: true});

  const getItemBody = props => {
    if (!props) {
      return null;
    }
    return <div id={props.value}>{props.name}</div>;
  };

  const getSelectedItemBody = props => {
    return <div id={props.value}>{props.name}</div>;
  };

  const handleTriggerButtonClick = () => setState(prevState => ({
    isVisible: !prevState.isVisible
  }));

  const handleTooltipActionButton = () => {
    const message = 'Action button successfully clicked. Do you want to close tooltip?';
    if (confirm(message)) {
      setState({isVisible: false})
    }
  };

  <div>
    <div style={{width: '200px'}}>
      <SelectField
        id='tooltip-example-select'
        labelText="Select tooltip position"
        items={items}
        onItemSelect={handleItemSelect}
        getItemBody={getItemBody}
        required
        getSelectedItemBody={getItemBody}
        selected={state.selectedPosition}
      />
    </div>
    <div style={{margin: ' 200px auto', textAlign: 'center'}}>
      <div style={{display: 'inline-block', position: 'relative'}}>
        <CssTooltip placement={state.selectedPosition} isVisible={state.isVisible} style={{width: '200px'}}>
          You can decide which columns should appear on the customer’s list. This setup will be visible only to you. 
          <Button
            size="compact"
            style={{position: 'relative', marginTop: '20px', marginLeft: 'auto', display: 'block'}}
            onClick={handleTooltipActionButton}
          >
            Action
          </Button>
        </CssTooltip>
        <Button onClick={handleTriggerButtonClick}>Toggle tooltip</Button>
      </div>
    </div>
  </div>
```

```js noeditor
  <ComponentHtmlMarkup>
    <div style={{display: 'inline-block', position: 'relative'}}>
      <CssTooltip placement="bottom" isVisible style={{width: '200px'}}>
        You can decide which columns should appear on the customer’s list. This setup will be visible only to you. 
        <Button
          size="compact"
          style={{position: 'relative', marginTop: '20px', marginLeft: 'auto', display: 'block'}}
        >
          Action
        </Button>
      </CssTooltip>
      <Button>Toggle tooltip</Button>
    </div>
  </ComponentHtmlMarkup>
```
