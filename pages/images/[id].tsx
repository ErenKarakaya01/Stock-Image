import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import React, { useState } from "react"
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
  Accordion,
  Image,
} from "@mantine/core"
import { Photo } from "tabler-icons-react"
import pageStyles from "../../sass/pages.module.scss"
import imageStyles from "../../sass/image.module.scss"
import { IconButton } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { useToggle } from "@mantine/hooks"
import Authenticated from "../../components/protectedLayouts/Authenticated"
import CustomerProtected from "../../components/protectedLayouts/CustomerProtected"

interface Image {
  image_id: number
  name: string
  category: string
  price: number
  base64_url: string
  size: string
  extension: string
  upload_date: string
  liked: boolean
  bought: boolean
}

const ImagePage = ({ image }: { image: Image }) => {
  const [liked, toggleLiked] = useToggle<true | false>(image.liked, [
    true,
    false,
  ])

  const handleLike = (image_id: number) => {
    toggleLiked()
  }

  return (
    <Authenticated>
      <CustomerProtected>
        <Grid className={pageStyles.grid}>
          <Col
            className={imageStyles.col1}
            span={4}
            data-aos="flip-left"
            data-aos-duration="1200"
          >
            <Paper shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)">
              <Image
                className={imageStyles.image}
                src={image.base64_url}
                alt={image.name}
              />
            </Paper>
          </Col>
          <Col className={imageStyles.col2} span={8}>
            <Group position="center">
              <Text
                component="span"
                align="center"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontSize: "2em" }}
                weight={700}
                style={{ fontFamily: "Greycliff CF, sans-serif" }}
              >
                {image.name}
              </Text>
            </Group>

            <Divider
              my="xs"
              variant="dashed"
              labelPosition="center"
              label={
                <>
                  <Photo size={15} />
                  <Box ml={5}>Image</Box>
                </>
              }
            />

            <Group
              className={imageStyles.columnGroup}
              direction="column"
              position="apart"
            >
              <Group className={imageStyles.row} grow>
                <Text className={imageStyles.text}>
                  Category: {image.category}
                </Text>
                <Text className={imageStyles.text}>Price: {image.price}</Text>
              </Group>
              <Group className={imageStyles.row} grow>
                <Text className={imageStyles.text}>Size: {image.size}</Text>
                <Text className={imageStyles.text}>
                  Extension: {image.extension}
                </Text>
                <Text className={imageStyles.text}>
                  Upload Date: {image.upload_date}
                </Text>
              </Group>
              <Group className={imageStyles.row}>
                <IconButton onClick={() => handleLike(image.image_id)}>
                  {liked === true ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon color="error" />
                  )}
                </IconButton>
                <Button disabled={image.bought}>Buy</Button>
              </Group>
            </Group>
          </Col>
        </Grid>
      </CustomerProtected>
    </Authenticated>
  )
}

export default ImagePage

const data1: Image[] = [
  {
    image_id: 1,
    name: "eren",
    category: "adar",
    price: 31,
    base64_url: "/images/beyaz1.jpg",
    size: "1mb",
    extension: ".jpg",
    upload_date: "1.2.2001",
    liked: true,
    bought: true,
  },
  {
    image_id: 2,
    name: "eren",
    category: "adar",
    price: 31,
    base64_url: "/images/beyaz1.jpg",
    size: "1mb",
    extension: ".jpg",
    upload_date: "1.2.2001",
    liked: false,
    bought: false,
  },
  {
    image_id: 3,
    name: "eren",
    category: "adar",
    price: 31,
    base64_url: "/images/beyaz1.jpg",
    size: "1mb",
    extension: ".jpg",
    upload_date: "1.2.2001",
    liked: true,
    bought: true,
  },
  {
    image_id: 4,
    name: "eren",
    category: "adar",
    price: 31,
    base64_url: "/images/beyaz1.jpg",
    size: "1mb",
    extension: ".jpg",
    upload_date: "1.2.2001",
    liked: false,
    bought: true,
  },
  {
    image_id: 5,
    name: "eren",
    category: "adar",
    price: 31,
    base64_url: "/images/beyaz1.jpg",
    size: "1mb",
    extension: ".jpg",
    upload_date: "1.2.2001",
    liked: true,
    bought: false,
  },
]

export const getStaticPaths = (url: object) => {
  return {
    paths: data1.map((v) => {
      return {
        params: {
          id: (v.image_id - 1).toString(),
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (url: any) => {
  return {
    props: {
      image: data1[url.params.id],
    },
  }
}
