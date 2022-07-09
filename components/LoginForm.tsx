import { Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UseFormReturnType } from "@mantine/form/lib/use-form"
import Link from "next/link"
import { useRouter } from "next/router"
import formStyles from "../sass/form.module.scss"
import axios from "axios"
import { useEffect, useContext } from "react"
import { showNotification } from "@mantine/notifications"
import UserContext from "components/contexts/user"
import AuthenticateContext from "components/contexts/authenticate"

interface FormValues {
  email: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const { setIsAuth } = useContext(AuthenticateContext)

  // Validate text input formats
  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values: FormValues) => ({
      email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
    }),
  })

  // Handles post request of login
  const handleSubmit = (values: FormValues) => {
    axios
      .post("/users/login", values)
      .then(async ({ data }) => {
        if (data.isLoggedIn) {
          setIsAuth!(true)
          const { data } = await axios.get("/users/getuser")

          setUser!(data.user)

          if (data.user.type === "customer") {
            router.push("/browse")
          } else router.push("/gallery")
        } else {
          data.errors.forEach((v: string) =>
            showNotification({
              autoClose: 5000,
              title: "Error",
              message: v,
              color: "red",
            })
          )
        }
      })
      .catch((e: any) => console.log(e))
  }

  return (
    <form
      className={formStyles.form}
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <TextInput
        label="Email"
        placeholder="Email"
        {...form.getInputProps("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="Password"
        {...form.getInputProps("password")}
      />

      <Group position="apart" mt="md">
        <Link href="/register">Register</Link>
        <Button type="submit">Login</Button>
      </Group>
    </form>
  )
}

export default LoginForm
