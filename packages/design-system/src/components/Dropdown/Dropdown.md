<h3>Dropdown</h3>

Dropdown component is a base component which manages the positioning and keyboard events of its content. Under the hood it uses 2 libraries:

- [Popper.js](https://popper.js.org) - a positioning engine which calculate the position of an element to make it possible to position it near a given reference element,
- [React Popper](https://github.com/FezVrasta/react-popper) - React wrapper around Popper.js

Usage of popper props (`eventsEnabled, modifiers, placement, positionFixed, referenceElement`) is described in [Popper.js docs](https://popper.js.org/popper-documentation.html).

Drop menu should appear above other UI elements (use appropriate z-index).
By default menu opens below the trigger, along the left side. If there’s not enough room, the menu can appear on the left, right, or above the trigger.

Using Esc key closes the drop menu and moves focus back to the menu trigger.

It's available only for React application.

```js
const dropdownPositions = [
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

const items = dropdownPositions.map(position => ({
  key: position,
  props: { name: position }
}));

initialState = {
  selectedItem: null
};

const handleItemSelect = item => setState({ selectedItem: item });

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

class DropdownExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true,
      position: "auto"
    };

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }

  getItemBody(props) {
    if (!props) {
      return null;
    }
    return <div>{props.name}</div>;
  }

  handleItemSelect(position) {
    this.setState({ position, isVisible: true });
  }

  handleClose() {
    this.setState({ isVisible: false });
  }

  handleTriggerClick() {
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  }

  render() {
    return (
      <div>
        <div style={{ width: "200px" }}>
          <SelectField
            id="dropdown-example-select"
            labelText="Select dropdown position"
            items={items}
            onItemSelect={this.handleItemSelect}
            getItemBody={this.getItemBody}
            required
            getSelectedItemBody={this.getItemBody}
            selected={this.state.position}
          />
        </div>
        <Dropdown
          isVisible={this.state.isVisible}
          placement={this.state.position}
          modifiers={{
            flip: {
              behavior: "flip"
            },
            arrow: {
              enabled: true
            }
          }}
          onClose={this.handleClose}
          triggerRenderer={({ ref }) => (
            <div style={{ textAlign: "center", margin: " 200px auto" }}>
              <Button onClick={this.handleTriggerClick} ref={ref}>
                Toggle dropdown
              </Button>
            </div>
          )}
        >
          <div style={{ padding: "100px", textAlign: "center" }}>
            <div style={{ padding: "20px" }}>Dropdown content</div>
            <Button onClick={this.handleClose}>Close</Button>
          </div>
        </Dropdown>
      </div>
    );
  }
}

<DropdownExample />;
```
