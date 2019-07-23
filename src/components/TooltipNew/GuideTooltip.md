<h3>GuideTooltip</h3>

```js
const GuideStep = ({ title, text, step, total, onNext }) => (
  <>
    <h3 style={{ margin: "0 0 12px" }}>{title}</h3>
    <div>{text}</div>
    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "12px" }}>
      Step {step} of {total}
      <Button
        primary
        size="compact"
        onClick={onNext}
        style={{ marginLeft: "auto" }}
      >
        {step === total ? "Finish" : "Next"}
      </Button>
    </div>
  </>
);

const GuideStep1 = ({ onNext }) => (
  <GuideStep
    title="Let's begin"
    text="This is the logo of our company"
    step={1}
    total={3}
    onNext={onNext}
  />
);

const GuideStep2 = ({ onNext }) => (
  <GuideStep
    title="Look at this"
    text="Here you will find some important information"
    step={2}
    total={3}
    onNext={onNext}
  />
);

const GuideStep3 = ({ onNext }) => (
  <GuideStep
    title="That's it"
    text="You can click this button if you want"
    step={3}
    total={3}
    onNext={onNext}
  />
);

class GuideTooltipExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.step1Ref = React.createRef();
    this.step2Ref = React.createRef();
    this.step3Ref = React.createRef();

    this.state = {
      isVisible: false,
      step: 0
    };

    this.steps = [this.step1Ref, this.step2Ref, this.step3Ref];

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
  }

  handleTriggerClick() {
    this.setState({
      isVisible: true,
      step: 0
    });
  }

  handleNextStep() {
    if (this.state.step === this.steps.length - 1) {
      this.setState({ isVisible: false });
    } else {
      this.setState(prevState => ({
        step: prevState.step + 1
      }));
    }
  }

  render() {
    const { isVisible, step } = this.state;
    const element = this.steps[step].current;

    return (
      <div>
        <div>
          <Button onClick={this.handleTriggerClick} primary>
            Start guide
          </Button>
          {element && (
            <GuideTooltip
              slide
              zIndex={2}
              element={element}
              isVisible={isVisible}
              placement={step === 0 ? "right" : step === 1 ? "top" : "left"}
            >
              {step === 0 && <GuideStep1 onNext={this.handleNextStep} />}
              {step === 1 && <GuideStep2 onNext={this.handleNextStep} />}
              {step === 2 && <GuideStep3 onNext={this.handleNextStep} />}
            </GuideTooltip>
          )}
        </div>
        <div style={{ marginTop: "50px" }}>
          <img
            ref={this.step1Ref}
            style={{ width: "100px" }}
            src="./livechat-logo.svg"
            alt="LiveChat logo"
          />
          <p ref={this.step2Ref} id="guide-step-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div style={{ textAlign: "right" }}>
            <Button ref={this.step3Ref} id="guide-step-3">
              Some action
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

<GuideTooltipExample />;
```
