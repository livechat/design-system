```js
initialState = {
  percent: 0
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


<div>
  <div style={{display: 'flex', marginBottom: '10px'}}>
    <Button size="compact" onClick={addRandomProgress}>Increase progress</Button>
    <Button size="compact" onClick={removeRandomProgress}>Decrease progress</Button>
  </div>

  <div style={{ display: "flex", alignItems: "center" }}>
    <ProgressBar title="file.jpg" iconSrc="./filetype-pdf.svg" percent={state.percent} onCloseButtonClick={() => {}} onRetryButtonClick={() => {}}/>
  </div>
</div>
```
