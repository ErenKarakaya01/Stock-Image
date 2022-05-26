import NavbarSimple from "components/NavbarSimple"
import React, { useEffect, useState, useContext } from "react"
import galleryStyles from "../sass/browse.module.scss"
import pageStyles from "../sass/pages.module.scss"
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
} from "@mantine/core"
import { Photo } from "tabler-icons-react"
import ImageAccordion from "components/ImageAccordion"
import CreatorProtected from "./../components/protectedLayouts/CreatorProtected"
import axios from "axios"
import UserContext from "components/contexts/user"
import { useRouter } from "next/router"

interface RawImage {
  image_id: number
  name: string
  category: string
  price: number
  base64_url: string
  upload_date: string
}

interface Image {
  image_id: number
  name: string
  category: string
  price: number
  base64_url: string
  size: string
  extension: string
  upload_date: string
}

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([])

  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user === null) return

    ;(async () => {
      const { data } = await axios.get(`/images/gallery/${user!.id}`)

      setImages(data.images.map((v: RawImage) => {
        return {
          ...v,
          size: getSize(v.base64_url),
          extension: getFileType(v.base64_url),
        }
      }))
    })()
  }, [user])

  const getFileType = (base64_url: string) => {
    return base64_url
      .substring("data:image/".length, base64_url.indexOf(";base64"))
      .toUpperCase()
  }

  const getSize = (base64_url: string) => {
    let stringLength = base64_url.length - "data:image/png;base64,".length

    let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812
    let sizeInKb = sizeInBytes / 1024

    return sizeInKb.toFixed(0)
  }

  return (
    <CreatorProtected>
      <Grid className={pageStyles.grid}>
        <NavbarSimple />
        <ScrollArea style={{ height: "101vh" }}>
          <Grid className={pageStyles.pageContent}>
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
                GALLERY
              </Text>
            </Group>

            <Divider
              my="xs"
              variant="dashed"
              labelPosition="center"
              label={
                <>
                  <Photo size={15} />
                  <Box ml={5}>Gallery</Box>
                </>
              }
            />

            <ImageAccordion data={images} isTradeCard={false} />
          </Grid>
        </ScrollArea>
      </Grid>
    </CreatorProtected>
  )
}

export default Gallery
