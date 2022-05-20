import {
  Button,
  Group,
  PasswordInput,
  Radio,
  RadioGroup,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { UseFormReturnType } from "@mantine/form/lib/use-form"
import Link from "next/link"
import formStyles from "../sass/form.module.scss"

const RegisterForm = () => {
  interface FormValues {
    name: string // regular field, same as inferred type
    surname: string
    email: string
    password: string
    confirmPassword: string
    role: "customer" | "creator" // union, more specific than inferred type (string)
  }

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
    },

    validate: (values: FormValues) => ({
      name:
        values.name.length <= 1
          ? "Too Short Name"
          : values.name.length >= 60
          ? "Too Long Name"
          : null,
      surname:
        values.surname.length <= 1
          ? "Too Short Surname"
          : values.surname.length >= 60
          ? "Too Long Surname"
          : null,
      email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
      password:
        values.password.length <= 8
          ? "Password Needs To Be At Least 8 Characters"
          : null,
      confirmPassword:
        values.password !== values.confirmPassword
          ? "Passwords Did Not Match"
          : null,
    }),
  })

  /* useEffect(() => {
    form.setErrors({ name: "gfds" })
  }, []) */

  return (
    <form
      className={formStyles.form}
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <TextInput  
        label="Name"
        placeholder="Name"
        {...form.getInputProps("name")}
      />

      <TextInput
        label="Surname"
        placeholder="Surname"
        {...form.getInputProps("surname")}
      />

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

      <PasswordInput
        mt="sm"
        label="Confirm password"
        placeholder="Confirm password"
        {...form.getInputProps("confirmPassword")}
      />

      <RadioGroup label="Select your role" {...form.getInputProps("role")}>
        <Radio value="customer" label="Customer" />
        <Radio value="creator" label="Creator" />
      </RadioGroup>

      <Group position="apart" mt="md">
        <Link href="/login">
          Login
        </Link>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  )
}

export default RegisterForm
