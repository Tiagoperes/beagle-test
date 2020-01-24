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
    action: string,
    method: 'post' | 'get' | 'put' | 'delete' | 'patch',
  },
  input: {
    name: string,
    placeholder?: string,
    validations?: Array<'required' | 'validateMajority'>, 
  },
  button: {
    action: 'submit' | 'clear',
    title: string,
  },
}
