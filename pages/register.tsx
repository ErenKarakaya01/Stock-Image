import FormPage from "components/FormPage"
import RegisterForm from "components/RegisterForm"
import NotAuthenticated from "./../components/protectedLayouts/NotAuthenticated"

const Register = () => {
  return (
    <NotAuthenticated>
      <FormPage
        Form={RegisterForm}
        image="images/nextjs.png"
        dividerText="Register"
      />
    </NotAuthenticated>
  )
}

export default Register
