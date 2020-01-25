export default interface MySchema {
  container: {
    style?: Record<string, any>,
  },
  card: {
    style?: Record<string, any>,
  },
  image: {
    url: string,
    description?: string,
    style?: Record<string, any>,
  },
  title: {
    value: string,
    style?: Record<string, any>,
  },
  text: {
    value: string,
    style?: Record<string, any>,
  },
  form: {
    url: string,
    method: 'post' | 'get' | 'put' | 'delete' | 'patch',
    successMessage?: string,
    errorMessage?: string,
    style?: Record<string, any>,
  },
  input: {
    name: string,
    placeholder?: string,
    validations?: Array<'required' | 'validateMajority' | 'email'>, 
    style?: Record<string, any>,
  },
  button: {
    action: 'submit' | 'reset',
    title: string,
    primary?: boolean,
    style?: Record<string, any>,
  },
}
