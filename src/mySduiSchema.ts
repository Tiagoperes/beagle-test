export default interface MySchema {
  container: {},
  image: {
    url: string,
    description: string,
  },
  text: {
    value: string,
  },
  form: {
    url: string,
    method: 'post' | 'get' | 'put' | 'delete' | 'patch',
    successMessage?: string,
    errorMessage?: string,
  },
  input: {
    name: string,
    placeholder?: string,
    validations?: Array<'required' | 'validateMajority'>, 
  },
  button: {
    action: 'submit' | 'reset',
    title: string,
  },
}
