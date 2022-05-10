import FormPage from "components/FormPage"
import RegisterForm from "components/RegisterForm"

const Register = () => {
  return (
    <FormPage
      Form={RegisterForm}
      image="images/nextjs.png"
      dividerText="Register"
    />
  )
}

export default Register
