```js
class PopperTooltipExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      selectedTab: "agents"
    };

    this.handleClose = this.handleClose.bind(this);
    this.renderTrigger = this.renderTrigger.bind(this);
    this.hightlightedElementRef = React.createRef();
  }

  handleClose() {
    this.setState({ isVisible: false });
  }

  renderTrigger({ ref }) {
    return (
      <Tab
        onClick={() => this.setState({ selectedTab: "agents" })}
        key="agents"
        isSelected={this.state.selectedTab === "agents"}
        description={2}
        ref={ref}
      >
        Agents
      </Tab>
    );
  }

  render() {
    return (
      <div style={{ padding: "500px 100px" }}>
        <Button primary onClick={() => this.setState({ isVisible: true })}>
          Show tooltip with overlay
        </Button>
        <div style={{ margin: " 50px auto", textAlign: "center" }}>
          <TabsWrapper
            ref={this.hightlightedElementRef}
            id="high5"
            style={{ maxWidth: "250px" }}
          >
            <TabsList>
              <PopperTooltip
                isVisible={this.state.isVisible}
                placement="left-start"
                onClose={this.handleClose}
                triggerActionType="managed"
                trigger={this.renderTrigger}
                zIndex={1001}
                highlightedElement={this.hightlightedElementRef}
              >
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse risus sem, tempor et nunc maximus, ultrices auctor
                  orci.
                  <br />
                  <br />
                  <Button size="compact" onClick={this.handleClose}>
                    Close
                  </Button>
                </div>
              </PopperTooltip>
              <Tab
                onClick={() => this.setState({ selectedTab: "groups" })}
                key={"groups"}
                isSelected={this.state.selectedTab === "groups"}
                description={9}
              >
                Groups
              </Tab>
            </TabsList>
          </TabsWrapper>
        </div>
      </div>
    );
  }
}

<PopperTooltipExample />;
```
