import {
  Button,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { UseFormReturnType } from "@mantine/form/lib/use-form"
import Link from "next/link"
import { useRouter } from "next/router"
import formStyles from "../sass/form.module.scss"
import axios from "axios"


interface FormValues {
  email: string
  password: string
}

const LoginForm = () => {

  const router = useRouter()

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values: FormValues) => ({
      email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
    }),
  })

  const handleSubmit = (values: FormValues) => {
    axios
      .post("/users/login", values)
      .then(({ data }) => {
        if (data.isLoggedIn)
          router.push("/trades")
      })
      .catch((e: any) => console.log(e))
  }

  const handleTest = () => {
    axios
      .get("/users/isauthenticated")
      .then((res: any) => console.log(res))
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
        <Link href="/register">
          Register
        </Link>
        <Button type="submit">Submit</Button>
        <Button onClick={handleTest}>asgd</Button>
      </Group>
    </form>
  )
}

export default LoginForm