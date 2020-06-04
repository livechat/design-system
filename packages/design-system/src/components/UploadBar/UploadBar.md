```js
initialState = {
  files: [
    { id: 1, name: 'file1.jpg', icon: <PdfIcon />, percent: 0, status: 'normal'},
    { id: 2, name: 'file2.jpg', icon: <PdfIcon />, percent: 0, status: 'normal'},
    {
      id: 3,
      name: 'very_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_name.jpg',
      icon: <PdfIcon />,
      percent: 0,
      status: 'normal'
    },
    { id: 4, name: 'file4.jpg', icon: <PdfIcon />, percent: 0, status: 'normal'},
    { id: 5, name: 'file5.jpg', icon: <PdfIcon />, percent: 0, status: 'normal'},
    { id: 6, name: 'file6.jpg', icon: <PdfIcon />, percent: 0, status: 'normal'},
    { id: 7, name: 'file7.jpg', icon: <PdfIcon />, percent: 0, status: 'normal'},
    { id: 8, name: 'file8.jpg', icon: <PdfIcon />, percent: 0, status: 'normal'},
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

const getFilesInProgress = () => {
  return state.files.filter(file => file.status === 'success').length;
}

const getTotalProgress = () => {
  const totalProgress = state.files.reduce((acc, file) => {
    if (file.status === 'success') {
      return acc += 100;
    }

    if (file.status === 'error') {
      return acc;
    }

    return acc += file.percent;
  }, 0)

  const nonErrorFilesCount = state.files.filter(file => file.status !== 'error').length;

  return totalProgress/nonErrorFilesCount;
}

const getTotalStatus = () => {
  const isInProgress = state.files.filter(file => file.status === 'normal').length > 0;

  if (isInProgress) {
    return 'normal';
  }

  const hasAnyError = state.files.filter(file => file.status === 'error').length > 0;

  if (hasAnyError) {
    return 'error';
  }

  return 'success';
}

const getFailedFilesCount = () => {
  return state.files.filter(file => file.status === 'error').length;
}

const onSuccessTriggerClick = () => {
  setState(prevState => ({
    files: prevState.files.map(file => ({ ...file, percent: 100, status: 'success' }))
  }))
}

const onErrorTriggerClick = () => {
  setState(prevState => ({
    files: prevState.files.map(file => ({ ...file, percent: 0, status: 'error' }))
  }))
}

const onResetTriggerClick = () => {
  setState(prevState => ({
    files: prevState.files.map(file => ({ ...file, percent: 0, status: 'normal' }))
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

  <div style={{ display: "flex", alignItems: "center" }}>
    <UploadBar
      errorMessage={getTotalStatus() === 'error' ? `${getFailedFilesCount()} files failed` : null}
      percent={getTotalProgress()}
      status={getTotalStatus()}
      title={`${getFilesInProgress()}/${state.files.length} files uploaded`}
      onCloseButtonClick={() => {}}
      onRetryButtonClick={() => {}}
      shouldExpandOnEndWithErrors
      shouldCollapseOnEndWithSuccess
    >
      {state.files.map(file => (
        <FileUploadProgress
          key={file.id}
          title={file.name}
          percent={file.percent}
          status={file.status}
          icon={file.icon}
          onCloseButtonClick={getTotalStatus() !== 'error' ? () => removeFile(file.id) : null}
          onRetryButtonClick={getTotalStatus() !== 'error' ? () => resetFile(file.id) : null}
        />
      ))}
    </UploadBar>
  </div>

  <div style={{ display: "flex", alignItems: "center", marginTop: '30px' }}>
    <UploadBar
      mode='single'
      icon={state.files[0].icon}
      errorMessage={getTotalStatus() === 'error' ? `${state.files[0].name} file failed` : null}
      percent={state.files[0].percent}
      status={state.files[0].status}
      title={state.files[0].name}
      onCloseButtonClick={() => {}}
      onRetryButtonClick={() => {}}
    />
  </div>
</div>
```
