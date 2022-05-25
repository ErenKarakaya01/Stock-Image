import FormPage from "components/FormPage"
import LoginForm from "components/LoginForm"
import NotAuthenticated from "./../components/protectedLayouts/NotAuthenticated"

const Login = () => {
  return (
    <NotAuthenticated>
      <FormPage
        Form={LoginForm}
        image="images/typescript.png"
        dividerText="Login"
      />
    </NotAuthenticated>
  )
}

export default Login
