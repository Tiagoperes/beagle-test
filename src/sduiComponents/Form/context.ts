import { createContext } from 'react'
import { values, find, mapValues, pull, forEach } from 'lodash'

interface Field {
  value: any,
  hasError: boolean,
}

type Listener = () => void
type Submit = (value: Record<string, any>) => void

export const createForm = (onSubmit: Submit) => {
  const fields: Record<string, Field> = {}
  const resetListeners: Array<Listener> = []
  const submitListeners: Array<Listener> = []
  
  const setField = (name: string, field: Field) => fields[name] = field
  const setFieldValue = (name: string, value: any) => fields[name].value = value
  const setFieldError = (name: string, value: boolean) => fields[name].hasError = value
  const hasError = () => !!find(values(fields), { hasError: true })
  const getValue = () => mapValues(fields, 'value')
  const reset = () => forEach(resetListeners, listener => listener())

  const addListener = (listenerArray: Array<Listener>) => (listener: Listener) => {
    listenerArray.push(listener)
    return () => {
      pull(listenerArray, listener)
    }
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    forEach(submitListeners, listener => listener())
    if (hasError()) return
    onSubmit(getValue())
  }

  return {
    setField,
    setFieldValue,
    setFieldError,
    hasError,
    getValue,
    addResetListener: addListener(resetListeners),
    addSubmitListener: addListener(submitListeners),
    reset,
    submit,
  }
}

const context = createContext<ReturnType<typeof createForm> | null>(null)
export const FormProvider = context.Provider
export default context
