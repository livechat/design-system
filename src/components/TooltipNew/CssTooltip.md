<h3>CssTooltip</h3>

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
    selectedPosition: 'bottom'
  };

  const handleItemSelect = item => setState({selectedPosition: item});

  const getItemBody = props => {
    if (!props) {
      return null;
    }
    return <div id={props.value}>{props.name}</div>;
  };

  const getSelectedItemBody = props => {
    return <div id={props.value}>{props.name}</div>;
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
      <CssTooltip placement={state.selectedPosition} style={{width: '200px', textAlign: 'left'}}>
          You can decide which columns should appear on the customer’s list. This setup will be visible only to you. 
          <Button
            style={{position: 'relative'}}
            onClick={() => {console.log('click')}}
          >
            Action
          </Button>
        </CssTooltip>
      <Button>Action button</Button>
      </div>
    </div>
  </div>
```
