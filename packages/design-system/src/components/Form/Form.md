<h3>Form example</h3>

```js
initialState = {
  gender: 'male',
  name: '',
  surname: '',
  description: '',
  nameError: null,
  surnameError: null
};

onRadioClick = (e) => {
  setState({
    [e.target.name]: e.target.value
  })
}

validate = (fields) => {
  return fields.reduce((acc, field) => {
    const { name, value } = field;
    if (!value || value.lenght === 0) {
      acc[name] = 'This field is required';
    } else if (!/^[a-z]+$/i.test(value)) {
      acc[name] = 'Field should contain only letters';
    }
    return acc;
  }, {})
}

onInputChange = (e) => {
  const { name, value } = e.target;
  const { [name]: error } = validate([{name, value}]);
  if (error) {
    setState({
      [name]: value,
      [`${name}Error`]: error
    });
  } else {
    setState({
      [name]: value,
      [`${name}Error`]: null
    });
  }
}

onDescriptionChange = (e) => setState({ description: e.target.value })

onSubmit = (e) => {
  e.preventDefault();
  const errors = validate([
    {name: 'name', value: state.name},
    {name: 'surname', value: state.surname}
  ]);
  if (Object.keys(errors).length !== 0) {
    const newState = Object.keys(errors).reduce((acc, field) => {
      acc[`${field}Error`] = errors[field];
      return acc;
    }, {})
    setState(newState);
  } else {
    alert(`
      name: ${state.name}
      surname: ${state.surname}
      gender: ${state.gender}
    `)
  }  
}

<Form
  onSubmit={onSubmit}
  labelText='Settings'
  helperText='Use form layout to arrange fields within a form using standard spacing. We recomme stacking fields vertically for easier scanning and faster completion, but you can also arrange them vertically.'
  noValidate
  formFooter={<Button kind="primary" submit>Save changes</Button>}
>
  <FormGroup labelText='Personal data' helperText={'Fill fields with your name and surname'}>
    <FieldGroup inline stretch>
      <InputField
        value={state.name}
        name='name'
        labelText='Name'
        required
        error={state.nameError}
        id='input-field-example-1'
        placeholder='Name...'
        description='Field is required and should contain only letters'
        onChange={onInputChange}
      />
      <InputField
        value={state.surname}
        labelText='Surname'
        name='surname'
        required
        error={state.surnameError}
        id='input-field-example-1'
        placeholder='Surname...'
        description='Field is required and should contain only letters'
        onChange={onInputChange}
      />
    </FieldGroup>
    <TextAreaField
      value={state.description}
      labelText='Description'
      id='text-area-field-example-1'
      placeholder='Text...'
      description='Describe yourself'
      onChange={onDescriptionChange}
    />
  </FormGroup>
  <FormGroup labelText='Gender' helperText={'Choose your gender'}>
    <FieldGroup inline>
      <RadioButton
        checked={state.gender === 'male'}
        value='male'
        name='gender'
        id='gender-radio'
        onClick={onRadioClick}
      >
        Male
      </RadioButton>
      <RadioButton
        checked={state.gender === 'female'}
        value='female'
        name='gender'
        id='gender-radio'
        onClick={onRadioClick}
      >
        Female
      </RadioButton>
    </FieldGroup>
  </FormGroup>
</Form>
```

```js noeditor
  <ComponentHtmlMarkup>
    <Form onSubmit={onSubmit} noValidate>
      <FormGroup labelText='Personal data' helperText="Fill fields with your name and surname">
        <FieldGroup inline>
        <InputField
          value=''
          name='name'
          labelText='Name'
          required
          error='Field is required'
          id='input-field-example-1'
          placeholder='Name...'
          description='Field is required and should contain only letters'
        />
        <InputField
          value=''
          labelText='Surname'
          name='surname'
          required
          error='Field is required'
          id='input-field-example-1'
          placeholder='Surname...'
          description='Field is required and should contain only letters'
        />
        </FieldGroup>
        <TextAreaField
          value=''
          labelText='Description'
          id='text-area-field-example-1'
          placeholder='Text...'
          description='Describe yourself'
        />
      </FormGroup>
      <FormGroup labelText='Gender' helperText={'Choose your gender'}>
        <FieldGroup inline>
          <RadioButton
            checked
            value='male'
            name='gender'
            id='gender-radio'
          >
            Male
          </RadioButton>
          <RadioButton
            value='female'
            name='gender'
            id='gender-radio'
          >
            Female
          </RadioButton>
        </FieldGroup>
      </FormGroup>
      <Button kind="primary" submit>Save changes</Button>
    </Form>
  </ComponentHtmlMarkup>
```
