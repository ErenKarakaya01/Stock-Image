import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import React, { useState, useEffect, useContext } from "react"
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
import CustomerProtected from "../../components/protectedLayouts/CustomerProtected"
import axios from "axios"
import UserContext from "components/contexts/user"

interface Image {
  image_id: number
  name: string
  category: string
  price: number
  base64_url: string
  size: string
  extension: string
  upload_date: string
  creator_id: number
  liked: boolean
  bought: boolean
}

const ImagePage = ({ image }: { image: Image }) => {
  const { user } = useContext(UserContext)
  const [bought, setBought] = useState<boolean>(image.bought)
  const [liked, toggleLiked] = useToggle<boolean>(image.liked, [
    true,
    false,
  ])

  const handleBuy = async () => {
    const { data } = await axios.post("/images/buy", {
      customer_id: user!.id,
      creator_id: image.creator_id,
      image_id: image.image_id,
      price: image.price
    })

    if (data.wasBought)
      setBought(true)
  }

  const handleLike = async () => {
    const { data } = await axios.post("/images/toggle-like", {
      id: user!.id,
      image_id: image.image_id,
    })

    if (data.isToggled) toggleLiked()
  }

  return (
    <CustomerProtected>
      <Grid className={pageStyles.grid}>
        <Col
          className={imageStyles.col1}
          span={4}
          data-aos="flip-left"
          data-aos-duration="1200"
        >
          <Paper
            className={imageStyles.imagePaper}
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
          >
            <img
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
              <IconButton onClick={handleLike}>
                {liked === true ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon color="error" />
                )}
              </IconButton>
              <Button disabled={bought} onClick={handleBuy}>Buy</Button>
            </Group>
          </Group>
        </Col>
      </Grid>
    </CustomerProtected>
  )
}

export default ImagePage

export const getStaticPaths = async (url: object) => {
  const { data } = await axios.get("http://localhost:3000/images/image-ids")

  return {
    paths: data.image_ids.map((v: any) => {
      return {
        params: {
          id: v.image_id.toString(),
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (url: any) => {
  const { data } = await axios.get(
    `http://localhost:3000/images/image/${url.params.id}`
  )

  return {
    props: {
      image: data.image,
    },
  }
}
