```js
initialState = {
  files: [
    { id: 1, name: 'file1.jpg', iconSrc: './filetype-pdf.svg', percent: 0, status: 'normal'},
    { id: 2, name: 'file2.jpg', iconSrc: './filetype-pdf.svg', percent: 0, status: 'normal'},
    {
      id: 3,
      name: 'very_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_name.jpg',
      iconSrc: './filetype-pdf.svg',
      percent: 0,
      status: 'normal'
    },
    { id: 4, name: 'file4.jpg', iconSrc: './filetype-pdf.svg', percent: 0, status: 'normal'},
    { id: 5, name: 'file5.jpg', iconSrc: './filetype-pdf.svg', percent: 0, status: 'normal'},
    { id: 6, name: 'file6.jpg', iconSrc: './filetype-pdf.svg', percent: 0, status: 'normal'},
    { id: 7, name: 'file7.jpg', iconSrc: './filetype-pdf.svg', percent: 0, status: 'normal'},
    { id: 8, name: 'file8.jpg', iconSrc: './filetype-pdf.svg', percent: 0, status: 'success'},
  ]
};

const randomWithinRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomStatus = () => {
  const roll = randomWithinRange(0, 10);
  if (roll === 7) {
    return 'error';
  }
  return 'normal';
}

const getStatus = (prevStatus, percent) => {
  if (prevStatus === 'error' || prevStatus === 'success') {
    return prevStatus;
  }
  if (percent >= 100) {
    return 'success';
  }

  return randomStatus();
}

const addRandomProgress = () => {
  setState(prevState => ({
      files: prevState.files.map(file => {
        const newPercent = file.percent + randomWithinRange(0, 100 - file.percent);
        const newStatus = getStatus(file.status, newPercent);

        return ({
          ...file,
          percent: newPercent,
          status: newStatus
        })
      })
    })
  )
}

const removeRandomProgress = () => {
    setState(prevState => ({
    files: prevState.files.map(file => ({
      ...file,
      percent: file.percent - randomWithinRange(0, file.percent),
      status: 'normal'
    }))
  }))
}

const resetFile = id => {
  setState({files: state.files.map(file => {
    if (file.id === id) {
      return { ...file, status: 'normal', percent: 0};
    }
    return file;
  })});
}

const removeFile = id => {
  setState({files: state.files.filter(file => file.id !== id)});
}


<div>
  <div style={{display: 'flex', marginBottom: '10px'}}>
    <Button size="compact" onClick={addRandomProgress}>Increase progress</Button>
    <Button size="compact" onClick={removeRandomProgress}>Decrease progress</Button>
  </div>

  <div style={{ display: "flex", alignItems: "center" }}>
    <UploadBar title="file.jpg" iconSrc="./filetype-pdf.svg" percent={state.percent} onCloseButtonClick={() => {}} onRetryButtonClick={() => {}}>
      {state.files.map(file => (
        <FileUploadProgress
          title={file.name}
          percent={file.percent}
          status={file.status}
          iconSrc={file.iconSrc}
          onCloseButtonClick={() => removeFile(file.id)}
          onRetryButtonClick={() => resetFile(file.id)}
        />
      ))}
    </UploadBar>
  </div>
</div>
```
