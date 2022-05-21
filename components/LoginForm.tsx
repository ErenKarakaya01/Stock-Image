import {
  Button,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { UseFormReturnType } from "@mantine/form/lib/use-form"
import Link from "next/link"
import formStyles from "../sass/form.module.scss"


interface FormValues {
  email: string
  password: string
}

const LoginForm = () => {

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values: FormValues) => ({
      email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
    }),
  })

  return (
    <form
      className={formStyles.form}
      onSubmit={form.onSubmit((values) => console.log(values))}
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
      </Group>
    </form>
  )
}

export default LoginForm