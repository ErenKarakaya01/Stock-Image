import FormPage from "components/FormPage"
import LoginForm from "components/LoginForm"

const login = () => {
  return (
    <FormPage Form={LoginForm} image="images/typescript.png" dividerText="Login" />
  )
}

export default login