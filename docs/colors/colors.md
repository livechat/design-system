Click on the color box to copy its hex value.

```jsx noeditor
  const items = [
    {key: Colors.DarkTextPrimary, props: {name: 'DarkTextPrimary', value: Colors.DarkTextPrimary}},
    {key: Colors.DarkTextSecondary, props: {name: 'DarkTextSecondary', value: Colors.DarkTextSecondary}},
    {key: Colors.DarkTextTertiary, props: {name: 'DarkTextTertiary', value: Colors.DarkTextTertiary}}
  ];
  initialState = {
    selectedFontColor: Colors.DarkTextPrimary
  };

  const handleItemSelect = item => setState({selectedFontColor: item});

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
  <h2>TEXT</h2>
  <div style={{ display: 'flex', margin: '0 -10px', flexWrap: 'wrap' }}>
    <SingleColor hex='#f8f8f8' name="DarkTextPrimary" fontColors={[Colors.DarkTextPrimary]} main="dot" />
    <SingleColor hex='#f8f8f8' name="DarkTextSecondary" fontColors={[Colors.DarkTextSecondary]} main="dot" />
    <SingleColor hex='#f8f8f8' name="DarkTextTertiary" fontColors={[Colors.DarkTextTertiary]} main="dot" />
  </div>

  <div style={{width: '340px'}}>
    <p>Select text color to use in color palettes</p>
    <Select
      id='colors-select'
      items={items}
      searchProperty='name'
      onItemSelect={handleItemSelect}
      getItemBody={getItemBody}
      required
      placeholder='Select font color'
      getSelectedItemBody={getSelectedItemBody}
      selected={state.selectedFontColor}
    />
  </div>

  <h2>BLUE</h2>
  <div style={{ display: 'flex', margin: '0 -10px', flexWrap: 'wrap' }}>
    <SingleColor hex={Colors.Blue900} name="Blue900" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Blue800} name="Blue800" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Blue700} name="Blue700" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Blue600} name="Blue600" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Blue500} name="Blue500" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Blue400} name="Blue400" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Blue300} name="Blue300" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Blue200} name="Blue200" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Blue100} name="Blue100" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Blue50} name="Blue50" fontColors={[state.selectedFontColor, '#ffffff']} />
  </div>
  <h2>ORANGE</h2>
  <div style={{ display: 'flex', margin: '0 -10px', flexWrap: 'wrap' }}>
    <SingleColor hex={Colors.Orange900} name="Orange900" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Orange800} name="Orange800" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Orange700} name="Orange700" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Orange600} name="Orange600" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Orange500} name="Orange500" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Orange400} name="Orange400" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Orange300} name="Orange300" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Orange200} name="Orange200" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Orange100} name="Orange100" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Orange50} name="Orange50" fontColors={[state.selectedFontColor, '#ffffff']} />
  </div>
  <h2>YELLOW</h2>
  <div style={{ display: 'flex', margin: '0 -10px', flexWrap: 'wrap' }}>
    <SingleColor hex={Colors.Yellow900} name="Yellow900" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Yellow800} name="Yellow800" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Yellow700} name="Yellow700" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Yellow600} name="Yellow600" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Yellow500} name="Yellow500" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Yellow400} name="Yellow400" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Yellow300} name="Yellow300" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Yellow200} name="Yellow200" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Yellow100} name="Yellow100" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Yellow50} name="Yellow50" fontColors={[state.selectedFontColor, '#ffffff']} />
  </div>
  <h2>Gray</h2>
  <div style={{ display: 'flex', margin: '0 -10px', flexWrap: 'wrap' }}>
    <SingleColor hex={Colors.Gray900} name="Gray900" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Gray800} name="Gray800" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Gray700} name="Gray700" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Gray600} name="Gray600" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Gray400} name="Gray400" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Gray300} name="Gray300" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Gray200} name="Gray200" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Gray100} name="Gray100" fontColors={[state.selectedFontColor, '#ffffff']} />
    <SingleColor hex={Colors.Gray50} name="Gray50" fontColors={[state.selectedFontColor, '#ffffff']} />
  </div>
</div>
```