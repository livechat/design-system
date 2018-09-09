<h3>Form example</h3>

```js
initialState = {
  gender: 'male',
  name: '',
  surname: '',
  nameError: null,
  surnameError: null
};

onRadioClick = (e) => {
  setState({
    [e.target.name]: e.target.value
  })
}

validate = (name, value) => {
  if (!value || value.lenght === 0) {
    return 'This field is required';
  } else if (!/^[a-z]+$/i.test(value)) {
    return 'Field should contain only letters';
  }
  return null;
}

onInputChange = (e) => {
  const { name, value } = e.target;
  const error = validate(name, value);
  console.log(error)
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

onSubmit = (e) => {
  e.preventDefault();
  console.log('submit')
}

<form onSubmit={onSubmit}>
  <FormGroup labelText='Personal data' helperText={'Fill fields with your name and surname'}>
    <FieldGroup>
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
    </FieldGroup>
    <FieldGroup>
      <InputField
        value={state.surname}
        labelText='Surname'
        name='surname'
        required
        error={state.surnameError}
        id='input-field-example-1'
        placeholder='Placeholder...'
        description='Field is required and should contain only letters'
        onChange={onInputChange}
      />
    </FieldGroup>
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
</form>
```