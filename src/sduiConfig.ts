import createServerDrivenUI from './sduiLib/core'
import { createReactComponentTree } from './sduiLib/react'
import MySchema from './mySduiSchema'
import Error from './sduiComponents/Error'
import Loading from './sduiComponents/Loading'
import Container from './sduiComponents/Container'
import Image from './sduiComponents/Image'
import Form from './sduiComponents/Form'
import Input from './sduiComponents/Input'
import Button from './sduiComponents/Button'
import Text from './sduiComponents/Text'
import Title from './sduiComponents/Title'
import Card from './sduiComponents/Card'

export default createServerDrivenUI<MySchema>({
  baseUrl: 'https://gist.githubusercontent.com/Tiagoperes',
  ErrorComponent: Error,
  LoadingComponent: Loading,
  shouldFallbackToCache: true,
  renderComponentTree: createReactComponentTree,
  components: {
    button: Button,
    container: Container,
    form: Form,
    image: Image,
    input: Input,
    text: Text,
    title: Title,
    card: Card,
  }
})
