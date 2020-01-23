export type Validation = 'required' | 'validateMajority'

const validations: Record<Validation, (value: string) => (string | undefined)> = {
  required: (value: string) => value === '' ? 'Campo obrigatório' : undefined,
  validateMajority: (value: string) => (
    parseInt(value) < 18 ? 'Deve ser maior ou igual a 18' : undefined
  ),
}

export default validations
