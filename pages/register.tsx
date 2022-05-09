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
import formStyles from "../sass/style.module.scss"
import { Grid, Col, Center, Image, Stack, Portal } from "@mantine/core"
import { Divider } from "@mui/material"
import FormPageBackground from "components/FormPageBackground"

const Register = () => {
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

  return (
    <Grid columns={24} className={formStyles.grid}>
      <Col span={18} className={formStyles.backgroundCol}>
        <FormPageBackground />
      </Col>
      <Col span={6} className={formStyles.col}>
        <Center className={formStyles.center}>
          <Divider
            orientation="vertical"
            className={formStyles.divider}
            flexItem
          >
            Register
          </Divider>
          <Stack>
            <Center className={formStyles.image}>
              <img src="images/nextjs.png" alt="nextjs" />
            </Center>

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

              <RadioGroup
                label="Select your favorite framework/library"
                description="This is anonymous"
                required
              >
                <Radio value="react" label="React" />
                <Radio value="svelte" label="Svelte" />
              </RadioGroup>

              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Stack>
        </Center>
      </Col>

      <Center className={formStyles.portal}>
        <FormPageBackground />
      </Center>
    </Grid>
  )
}

export default Register
