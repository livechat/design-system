<h3>PopperTooltip</h3>

PopperTooltip component is a component which menages positioning and keyboard events of its content. Under the hood it uses 2 main libraries:

- [Popper.js](https://popper.js.org) - a positioning engine which calculate the position of an element to make it possible to position it near a given reference element,
- [React Popper](https://github.com/FezVrasta/react-popper) - React wrapper around Popper.js

Usage of popper props (`eventsEnabled, modifiers, placement, positionFixed, referenceElement`) is described in [Popper.js docs](https://popper.js.org/popper-documentation.html).

Component visibility state can be controlled or uncontrolled - it depends on value of `triggerActionType` property.

PopperTooltip component should be used in the React applications.

```js
const tooltipPlacements = [
  "auto",
  "auto-end",
  "auto-start",
  "bottom",
  "bottom-end",
  "bottom-start",
  "left",
  "left-end",
  "left-start",
  "right",
  "right-end",
  "right-start",
  "top",
  "top-end",
  "top-start"
];

const tooltipTriggerActionTypes = ["managed", "hover", "click"];

const tooltipThemeTypes = ["default", "invert", "important"];

const placementsItems = tooltipPlacements.map(position => ({
  key: position,
  props: { name: position }
}));

const actionsItems = tooltipTriggerActionTypes.map(position => ({
  key: position,
  props: { name: position }
}));

const themeItems = tooltipThemeTypes.map(position => ({
  key: position,
  props: { name: position }
}));

class PopperTooltipExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true,
      position: "auto",
      action: "hover",
      theme: "default"
    };

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePlacementSelect = this.handlePlacementSelect.bind(this);
    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.handleThemeSelect = this.handleThemeSelect.bind(this);
  }

  getItemBody(props) {
    if (!props) {
      return null;
    }
    return <div>{props.name}</div>;
  }

  handlePlacementSelect(position) {
    this.setState({ position, isVisible: true });
  }

  handleActionSelect(action) {
    this.setState({ action, isVisible: false });
  }

  handleThemeSelect(theme) {
    this.setState({ theme, isVisible: false });
  }

  handleClose() {
    this.setState({ isVisible: false });
  }

  handleTriggerClick() {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  }

  renderTrigger() {
    if (this.state.action !== "managed") {
      return <Button>Toggle tooltip</Button>;
    }
    return <Button onClick={this.handleTriggerClick}>Toggle tooltip</Button>;
  }

  render() {
    return (
      <div>
        <div style={{ width: "200px" }}>
          <SelectField
            id="tooltip-example-position-select"
            labelText="Select tooltip position"
            items={placementsItems}
            onItemSelect={this.handlePlacementSelect}
            getItemBody={this.getItemBody}
            required
            getSelectedItemBody={this.getItemBody}
            selected={this.state.position}
          />
        </div>
        <div style={{ width: "200px" }}>
          <SelectField
            id="tooltip-example-action-select"
            labelText="Select tooltip trigger action type"
            items={actionsItems}
            onItemSelect={this.handleActionSelect}
            getItemBody={this.getItemBody}
            required
            getSelectedItemBody={this.getItemBody}
            selected={this.state.action}
          />
        </div>
        <div style={{ width: "200px" }}>
          <SelectField
            id="tooltip-example-theme-select"
            labelText="Select tooltip theme"
            items={themeItems}
            onItemSelect={this.handleThemeSelect}
            getItemBody={this.getItemBody}
            required
            getSelectedItemBody={this.getItemBody}
            selected={this.state.theme}
          />
        </div>
        <div style={{ margin: "200px auto", textAlign: "center" }}>
          <PopperTooltip
            style={{ textAlign: "left" }}
            isVisible={this.state.isVisible}
            placement={this.state.position}
            onClose={this.handleClose}
            theme={
              this.state.theme === "default" ? undefined : this.state.theme
            }
            triggerActionType={this.state.action}
            trigger={this.renderTrigger()}
            closeOnOutsideClick
            closeWithX
            closeWithEsc
            zIndex={2}
          >
            <div>
              You can decide which columns should appear on the customer’s list.
              This setup will be visible only to you.
            </div>
          </PopperTooltip>
        </div>
      </div>
    );
  }
}

<PopperTooltipExample />;
```
