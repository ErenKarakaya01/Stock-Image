import React, { useState } from "react"
import pageStyles from "../sass/pages.module.scss"
import uploadStyles from "../sass/upload.module.scss"
import {
  Group,
  Grid,
  Col,
  Paper,
  Select,
  Divider,
  Box,
  Card,
  Text,
  Badge,
  Highlight,
  Button,
  ScrollArea,
  Image,
  PasswordInput,
  Radio,
  RadioGroup,
  TextInput,
  Center,
} from "@mantine/core"
import NavbarSimple from "components/NavbarSimple"
import StyledDropzone from "components/StyledDropzone"
import { showNotification } from "@mantine/notifications"
import { useForm } from "@mantine/form"
import { UseFormReturnType } from "@mantine/form/lib/use-form"
import { CurrencyDollar, Photo } from "tabler-icons-react"
import CreatorProtected from "./../components/protectedLayouts/CreatorProtected"

interface FormValues {
  name: string // regular field, same as inferred type
  category: string
  price: number
}

const Upload = () => {
  const [img, setImg] = useState<any | null>(null)

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      name: "",
      category: "",
      price: 0,
    },

    validate: (values: FormValues) => ({
      name:
        values.name.length <= 1
          ? "Too Short Name"
          : values.name.length >= 60
          ? "Too Long Name"
          : null,
      category:
        values.category.length <= 1
          ? "Too Short Category"
          : values.category.length >= 60
          ? "Too Long Category"
          : null,
      price: typeof values.price !== "number" ? "Price Must Be Number" : null,
    }),
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(img)
  }

  return (
    <CreatorProtected>
      <Grid className={pageStyles.grid}>
        <NavbarSimple />
        <ScrollArea style={{ height: "101vh" }}>
          <Grid className={pageStyles.pageContent}>
            <form onSubmit={handleSubmit} className={uploadStyles.form}>
              <Group
                className={uploadStyles.group}
                direction="column"
                position="apart"
                grow
              >
                <Group position="center">
                  <Text
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                    size="xl"
                    weight={700}
                    style={{ fontFamily: "Greycliff CF, sans-serif" }}
                  >
                    UPLOAD
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
                <Grid className={uploadStyles.inputGrid}>
                  <Col className={uploadStyles.col1} span={6}>
                    <TextInput
                      label="Name"
                      placeholder="Name"
                      {...form.getInputProps("name")}
                    />

                    <TextInput
                      label="Category"
                      placeholder="Category"
                      {...form.getInputProps("category")}
                    />

                    <TextInput
                      label="Price"
                      placeholder="Price"
                      {...form.getInputProps("price")}
                    />
                    <Button className={uploadStyles.button} type="submit">
                      Submit
                    </Button>
                  </Col>
                  <Col className={uploadStyles.col2} span={6}>
                    <Center className={uploadStyles.center}>
                      {img ? (
                        <img
                          className={uploadStyles.image}
                          src={URL.createObjectURL(img)}
                          alt={img.name}
                        />
                      ) : (
                        <Photo size={"50%"} />
                      )}
                    </Center>
                  </Col>
                </Grid>

                <StyledDropzone img={img} setImg={setImg} />
              </Group>
            </form>
          </Grid>
        </ScrollArea>
      </Grid>
    </CreatorProtected>
  )
}

export default Upload
