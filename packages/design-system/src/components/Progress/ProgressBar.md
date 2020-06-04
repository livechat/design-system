Use progress indicators to let people know that the app isn’t frozen, yet working on a task, for example loading an app, submitting a form, or saving updates.

Progress bar fills from left to right showing the completion of a task and how much longer it will take.

```js
initialState = {
  percent: 0,
  hasError: false
};

const randomWithinRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const addRandomProgress = () => {
  setState(prevState => ({
    percent: prevState.percent + randomWithinRange(0, 100 - prevState.percent)
  }))
}

const removeRandomProgress = () => {
  setState(prevState => ({
    percent: prevState.percent - randomWithinRange(0, prevState.percent)
  }))
}

const onErrorTriggerClick = () => {
  setState(prevState => ({
    hasError: true,
    percent: 0
  }))
}

const onSuccessTriggerClick = () => {
  setState(prevState => ({
    hasError: false,
    percent: 100
  }))
}

const onResetTriggerClick = () => {
  setState(prevState => ({
    hasError: false,
    percent: 0
  }))
}

<div>
  <div style={{display: 'flex', marginBottom: '10px', justifyContent: 'space-between'}}>
    <Button size="compact" onClick={addRandomProgress}>Increase progress</Button>
    <Button size="compact" onClick={removeRandomProgress}>Decrease progress</Button>
    <Button kind="primary" size="compact" onClick={onSuccessTriggerClick}>Trigger success</Button>
    <Button kind="destructive" size="compact" onClick={onErrorTriggerClick}>Trigger error</Button>
    <Button size="compact" onClick={onResetTriggerClick}>Reset</Button>
  </div>

  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <ProgressBar status={state.hasError ? 'error' : 'normal'} percent={state.percent}  />
  </div>
</div>
```
