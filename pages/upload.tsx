import React, { useContext, useState } from "react"
import pageStyles from "../sass/pages.module.scss"
import uploadStyles from "../sass/upload.module.scss"
import {
  Group,
  Grid,
  Col,
  Divider,
  Box,
  Text,
  Button,
  ScrollArea,
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
import axios from "axios"
import UserContext from "components/contexts/user"
import { useRouter } from "next/router"

interface FormValues {
  name: string
  category: string
  price: string
}

const Upload = () => {
  const [img, setImg] = useState<File | null>(null)
  const { user } = useContext(UserContext)
  const router = useRouter()

  // Manages and validates the form values
  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      name: "",
      category: "",
      price: "",
    },

    validate: (values: FormValues) => ({
      name:
        values.name.length <= 1
          ? "Too Short Name"
          : values.name.length >= 12
          ? "Too Long Name"
          : null,
      category:
        values.category.length <= 1
          ? "Too Short Category"
          : values.category.length >= 12
          ? "Too Long Category"
          : null,
      price: !isNumeric(values.price)
        ? "Price Needs To Be Numeric"
        : values.price.length > 5
        ? "Too Much Price"
        : null,
    }),
  })

  const handleSubmit = async (values: FormValues) => {
    // Checking if the image was selected
    if (!img)
      return showNotification({
        autoClose: 5000,
        title: "Image Was Not Selected",
        message: "You need to select an image",
        color: "red",
      })

    let base64_url = await toBase64(img)

    const { data } = await axios.post("/images/upload", {
      ...values,
      base64_url: base64_url,
      creator_id: user!.id,
    })

    // Checking if the image was uploaded
    if (data.wasUploaded) {
      showNotification({
        autoClose: 5000,
        title: "Image Uploaded",
        message: `You uploaded the image ${img.name}`,
        color: "green",
      })
      router.push("/gallery")
    } else
      showNotification({
        autoClose: 5000,
        title: "File Was Not Uploaded",
        message: "An error occurred, try again",
        color: "red",
      })
  }

  const isNumeric = (str: string) => {
    return /^-?\d+$/.test(str)
  }

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  return (
    <CreatorProtected>
      <Grid className={pageStyles.grid}>
        <NavbarSimple />
        <ScrollArea style={{ height: "101vh" }}>
          <Grid className={pageStyles.pageContent}>
            <form
              onSubmit={form.onSubmit((values) => handleSubmit(values))}
              className={uploadStyles.form}
            >
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

                    <Group
                      className={uploadStyles.priceAndButton}
                      direction="row"
                      grow
                    >
                      <TextInput
                        label="Price"
                        placeholder="Price"
                        {...form.getInputProps("price")}
                      />
                      <Button className={uploadStyles.button} type="submit">
                        Submit
                      </Button>
                    </Group>
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

                <StyledDropzone img={img!} setImg={setImg} />
              </Group>
            </form>
          </Grid>
        </ScrollArea>
      </Grid>
    </CreatorProtected>
  )
}

export default Upload
