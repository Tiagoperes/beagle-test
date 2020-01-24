export default interface MySchema {
  container: {
    children: Array<MySchema[keyof MySchema]>,
  },
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
    children: Array<MySchema[keyof MySchema]>,
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
