<h3>GuideTooltip</h3>

```js
const GuideStep = ({ title, text, onNext }) => (
  <>
    <strong>{title}</strong>
    <div>{text}</div>
    <Button primary onClick={onNext}>
      Next
    </Button>
  </>
);

const GuideStep1 = ({ onNext }) => (
  <GuideStep title="Lorem ipsum" text="Lorem ipsum 1" onNext={onNext} />
);

const GuideStep2 = ({ onNext }) => (
  <GuideStep title="Lorem ipsum" text="Lorem ipsum 2" onNext={onNext} />
);

const GuideStep3 = ({ onNext }) => (
  <GuideStep title="Lorem ipsum" text="Lorem ipsum 3" onNext={onNext} />
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
    return (
      <div>
        <div style={{ margin: "200px auto", textAlign: "center" }}>
          <img
            ref={this.step1Ref}
            style={{ width: "100px" }}
            src="./livechat-logo.svg"
            alt="LiveChat logo"
          />
          <p ref={this.step2Ref} id="guide-step-2">
            Lorem ipsum dolor sit amet
          </p>
          <Button ref={this.step3Ref} id="guide-step-3">
            Some action
          </Button>
        </div>
        <div style={{ margin: "200px auto", textAlign: "center" }}>
          <Button onClick={this.handleTriggerClick} primary>
            Show tooltip
          </Button>
          <GuideTooltip
            zIndex={2}
            element={this.steps[step].current}
            isVisible={isVisible}
            slide={step > 0}
          >
            {step === 0 && <GuideStep1 onNext={this.handleNextStep} />}
            {step === 1 && <GuideStep2 onNext={this.handleNextStep} />}
            {step === 2 && <GuideStep3 onNext={this.handleNextStep} />}
          </GuideTooltip>
        </div>
      </div>
    );
  }
}

<GuideTooltipExample />;
```
