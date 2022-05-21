import NavbarSimple from 'components/NavbarSimple'
import React, { useState } from 'react'
import galleryStyles from "../sass/browse.module.scss"
import pageStyles from "../sass/pages.module.scss"
import { Group, Grid, Col, Paper, Select, Divider, Box, Card, Text, Badge, Highlight, Button, ScrollArea, Image } from "@mantine/core"
import { Photo } from "tabler-icons-react"
import ImageAccordion from "components/ImageAccordion"


interface Image {
  image_id: number,
  name: string,
  category: string,
  price: number,
  base64_url: string,
  resolution: string,
  size: string,
  extension: string,
  upload_date: string,
}

const Gallery = () => {

  const [data1, setData1] = useState<Image[]>([
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001" },
  ])

  return (
    <Grid className={pageStyles.grid}>
      <NavbarSimple />
      <ScrollArea style={{ height: "101vh" }}>
        <Grid className={pageStyles.pageContent}>
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

          <ImageAccordion data={data1} isTradeCard={false} />
        </Grid>
      </ScrollArea >
    </Grid >
  )
}

export default Gallery