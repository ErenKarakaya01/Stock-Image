import {
  Button,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { UseFormReturnType } from "@mantine/form/lib/use-form"
import Link from "next/link"
import formStyles from "../sass/style.module.scss"

const LoginForm = () => {
  interface FormValues {
    email: string
    password: string
  }

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values: FormValues) => ({
      email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
    }),
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    let err: string = "error"

    form.onSubmit(values => console.log(values))

    if (err)
      form.setErrors({ name: "Email or Password Wrong!" })
  }

  return (
    <form
      className={formStyles.form}
      onSubmit={handleSubmit}
    >

      <TextInput
        required
        label="Email"
        placeholder="Email"
        {...form.getInputProps("email")}
      />

      <PasswordInput
        required
        label="Password"
        placeholder="Password"
        {...form.getInputProps("password")}
      />

      <Group position="apart" mt="md">
        <Link href="/register">
          Register
        </Link>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  )
}

export default LoginForm