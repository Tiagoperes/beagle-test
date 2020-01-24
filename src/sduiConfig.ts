import createServerDrivenUI from './sduiLib'
import MySchema from './mySduiSchema'
import Error from './sduiComponents/Error'
import Loading from './sduiComponents/Loading'
import Container from './sduiComponents/Container'
import Image from './sduiComponents/Image'
import Form from './sduiComponents/Form'
import Input from './sduiComponents/Input'
import Button from './sduiComponents/Button'
import Text from './sduiComponents/Text'

export default createServerDrivenUI<MySchema>({
  baseUrl: 'http://teste.com',
  ErrorComponent: Error,
  LoadingComponent: Loading,
  shouldFallbackToCache: true,
  components: {
    button: Button,
    container: Container,
    form: Form,
    image: Image,
    input: Input,
    text: Text,
  }
})
