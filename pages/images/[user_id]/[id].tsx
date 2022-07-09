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
import pageStyles from "../../../sass/pages.module.scss"
import imageStyles from "../../../sass/image.module.scss"
import { IconButton } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { useToggle } from "@mantine/hooks"
import CustomerProtected from "../../../components/protectedLayouts/CustomerProtected"
import axios from "axios"
import UserContext from "components/contexts/user"
import table from "../../../server/database/table"

interface Image {
  image_id: number
  name: string
  category: string
  price: number
  base64_url: string
  upload_date: string
  creator_id: number
  liked: boolean
  bought: boolean
}

const ImagePage = ({ image }: { image: Image }) => {
  const { user } = useContext(UserContext)
  const [bought, setBought] = useState<boolean>(false)
  const [liked, toggleLiked] = useToggle<boolean>(false, [true, false])

  useEffect(() => {
    if (user === null || user === undefined) return

    ;(async () => {
      const { data } = await axios.get(`/images/image/${image.image_id}/user/${user.id}`)

      console.log(data)

      setBought(data.imageStatus.bought == 1 ? true : false)
      toggleLiked(data.imageStatus.liked == 1 ? true : false)
      console.log(liked)
      console.log(bought)
    })()
  }, [user])

  const handleBuy = async () => {
    const { data } = await axios.post("/images/buy", {
      customer_id: user!.id,
      creator_id: image.creator_id,
      image_id: image.image_id,
      price: image.price,
    })

    if (data.wasBought) setBought(true)
  }

  const handleLike = async () => {
    const { data } = await axios.post("/images/toggle-like", {
      id: user!.id,
      image_id: image.image_id,
    })

    if (data.isToggled) toggleLiked()
  }

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
              <Text className={imageStyles.text}>
                Size: {getSize(image.base64_url)} Kb
              </Text>
              <Text className={imageStyles.text}>
                Extension: {getFileType(image.base64_url)}
              </Text>
              <Text className={imageStyles.text}>
                Upload Date:{" "}
                {new Date(image.upload_date)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ")}
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
              <Button disabled={bought} onClick={handleBuy}>
                Buy
              </Button>
            </Group>
          </Group>
        </Col>
      </Grid>
    </CustomerProtected>
  )
}

export default ImagePage

export const getStaticPaths = async () => {
  const ids = await table("customer, image").select(["id", "image_id"]).find()

  return {
    paths: ids.map((v: any) => {
      return {
        params: {
          user_id: v.id.toString(),
          id: v.image_id.toString(),
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (url: any) => {
  const image = await table("image")
    .select([
      "image.image_id",
      "image.name",
      "image.category",
      "image.price",
      "image.base64_url",
      "image.upload_date",
      "image.creator_id",
      "CASE WHEN image.image_id = trading.image_id THEN 1 ELSE 0 END AS bought",
      "CASE WHEN image.image_id = likes.image_id THEN 1 ELSE 0 END AS liked",
    ])
    .leftJoin({ "likes.id": url.params.user_id }, "likes")
    .leftJoin({ "trading.customer_id": url.params.user_id }, "trading")
    .findOne({ "image.image_id": url.params.id })

  return {
    props: {
      image: {
        ...image,
        upload_date: image.upload_date.toString(),
      },
    },
  }
}
