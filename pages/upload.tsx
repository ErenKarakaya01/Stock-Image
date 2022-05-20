import React, { useState } from 'react'
import pageStyles from "../sass/pages.module.scss"
import uploadStyles from "../sass/upload.module.scss"
import {
  Group, Grid, Col, Paper, Select, Divider, Box, Card, Text, Badge, Highlight, Button, ScrollArea, Image, PasswordInput,
  Radio,
  RadioGroup,
  TextInput,
} from "@mantine/core"
import NavbarSimple from "components/NavbarSimple"
import StyledDropzone from "components/StyledDropzone"
import { showNotification } from '@mantine/notifications'
import { useForm } from "@mantine/form"
import { UseFormReturnType } from "@mantine/form/lib/use-form"
import { CurrencyDollar } from "tabler-icons-react"

const Upload = () => {
  const [img, setImg] = useState<any | null>(null)

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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(img)
  }

  return (
    <Grid className={pageStyles.grid}>
      <NavbarSimple />
      <ScrollArea style={{ height: "101vh" }}>
        <Grid className={pageStyles.pageContent}>
          <form onSubmit={handleSubmit} className={uploadStyles.form}>
            <Group className={uploadStyles.group} direction="column" position="apart" grow>
              <Group position="center">
                <Text
                  component="span"
                  align="center"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  size="xl"
                  weight={700}
                  style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                >
                  TRADES
                </Text>
              </Group>
              <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={
                  <>
                    <CurrencyDollar size={15} />
                    <Box ml={5}>Upload</Box>
                  </>
                }
              />
              <Group direction="column" grow>
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
              </Group>

              <StyledDropzone img={img} setImg={setImg} />
            </Group>
          </form>
        </Grid>
      </ScrollArea >
    </Grid >
  )
}

export default Upload