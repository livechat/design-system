<h3>UserGuideTooltip</h3>

<b>Guide Tooltips are used for:</b>

<ul>
  <li>Product tours</li>
  <li>Spotlight key features</li>
  <li>New feature announcement</li>
  <li>Label icons or buttons</li>
  <li>Info tooltips providing explanation for UI elements</li>
</ul>

<b>Best practices:</b>

<ul>
  <li>
    Copy should be max 140 characters (2 lines).
    If your message needs to be longer, break it up across multiple tooltips, or use in-app.
  </li>
  <li>Focus on benefits, not functionality.</li>
</ul>

<b>Design guides:</b>

<ul>
  <li>Tooltips can contain a header and body text, or just body text.</li>
  <li>Use consistent headers for new feature announcement (“New!”; "Introducing:").</li>
  <li>Exits — Let users "x" out or dismiss the tooltip with a confirmation CTA (“Got it”).</li>
  <li>Single tooltips can get away with not having any exit and close when the user clicks elsewhere on the screen.</li>
  <li>Progress bars — use for multi-step product tours.</li>
</ul>

```js
const GuideStep = ({ title, text, step, total, onNext }) => (
  <>
    <h3 style={{ margin: "0 0 12px" }}>{title}</h3>
    <div>{text}</div>
    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "12px" }}>
      Step {step} of {total}
      <Button
        kind="primary"
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
    text="This is the image we provided"
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

class UserGuideTooltipExample extends React.PureComponent {
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
          <Button onClick={this.handleTriggerClick} kind="primary">
            Start guide
          </Button>
          {element && (
            <UserGuideTooltip
              slide
              zIndex={2}
              element={element}
              isVisible={isVisible}
              placement={step === 0 ? "right" : step === 1 ? "top" : "left"}
            >
              {step === 0 && <GuideStep1 onNext={this.handleNextStep} />}
              {step === 1 && <GuideStep2 onNext={this.handleNextStep} />}
              {step === 2 && <GuideStep3 onNext={this.handleNextStep} />}
            </UserGuideTooltip>
          )}
        </div>
        <div style={{ marginTop: "50px" }}>
          <img
            ref={this.step1Ref}
            style={{ width: "100px" }}
            src="./sylvester.jpg"
            alt="Sylvester the Cat"
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

<UserGuideTooltipExample />;
```
