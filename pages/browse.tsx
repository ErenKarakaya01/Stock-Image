import NavbarSimple from "components/NavbarSimple"
import React, { useState, useEffect, useContext } from "react"
import browseStyles from "../sass/browse.module.scss"
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
  TextInput,
} from "@mantine/core"
import { Search } from "tabler-icons-react"
import Link from "next/link"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { IconButton } from "@mui/material"
import UserContext from "components/contexts/user"
import axios from "axios"
import CustomerProtected from "./../components/protectedLayouts/CustomerProtected"

interface Image {
  image_id: number
  name: string
  category: string
  price: number
  base64_url: string
  liked: boolean
  bought: boolean
}

const Browse = () => {
  const { user } = useContext(UserContext)
  const [images, setImages] = useState<Image[]>([])
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [orderBy, setOrderBy] = useState<string | null>("Best Selling")

  useEffect(() => {
    if (user === null) return
    ;(async () => {
      const { data } = await axios.post("/images/browse", {
        id: user!.id,
        name: name,
        category: category,
        order_by: orderBy === "Best Selling" ? "sales_count" : "upload_date",
      })

      console.log(data.images)

      setImages(data.images)
    })()
  }, [user, name, category, orderBy])

  const handleLike = async (image_id: number) => {
    const { data } = await axios.post("/images/toggle-like", {
      id: user!.id,
      image_id: image_id,
    })

    if (data.isToggled) {
      images.forEach((v, i) => {
        if (v.image_id === image_id) {
          images[i].liked = !images[i].liked
        }
      })

      setImages([...images])
    }
  }

  return (
    <CustomerProtected>
      <Grid className={pageStyles.grid}>
        <NavbarSimple />
        <ScrollArea style={{ height: "101vh" }}>
          <Grid className={pageStyles.pageContent}>
            <Group position="apart" grow className={browseStyles.header}>
              <TextInput
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                placeholder="Name"
              />
              <TextInput
                value={category}
                onChange={(event) => setCategory(event.currentTarget.value)}
                placeholder="Category"
              />
              <Select
                value={orderBy}
                onChange={setOrderBy}
                placeholder="Sort By"
                maxDropdownHeight={280}
                data={["Best Selling", "Recent Uploaded"]}
              />
            </Group>

            <Divider
              className={browseStyles.divider}
              my="xs"
              variant="dashed"
              labelPosition="center"
              label={
                <>
                  <Search size={15} />
                  <Box ml={5}>Search</Box>
                </>
              }
            />

            <Grid className={browseStyles.images}>
              {[0, 1, 2, 3].map((value, index) => (
                <Col key={index} span={3} className={browseStyles.column}>
                  {images
                    .filter((_, i) => i % 4 === value)
                    .map((v) => (
                      <Card
                        key={v.image_id}
                        className={browseStyles.imageCard}
                        shadow="xl"
                        radius={"lg"}
                      >
                        <Link href={`/images/${v.image_id}`}>
                          <Card.Section className={browseStyles.image}>
                            <img src={v.base64_url} alt={v.name} />
                          </Card.Section>
                        </Link>

                        <Group direction="column" className={browseStyles.info}>
                          <Text>
                            <b>Name: </b>
                            {v.name}
                          </Text>
                          <Text>
                            <b>Category: </b>
                            {v.category}
                          </Text>
                        </Group>

                        <Group
                          position="apart"
                          className={browseStyles.priceButton}
                        >
                          <Badge color="pink" variant="light" size="xl">
                            {"$" + v.price}
                          </Badge>

                          <IconButton onClick={() => handleLike(v.image_id)}>
                            {v.liked ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteBorderIcon color="error" />
                            )}
                          </IconButton>

                          <Link href={`/image/${v.image_id}`}>
                            <Button
                              disabled={v.bought}
                              variant="outline"
                              radius={"xl"}
                              gradient={{ from: "teal", to: "blue", deg: 60 }}
                            >
                              Buy
                            </Button>
                          </Link>
                        </Group>
                      </Card>
                    ))}
                </Col>
              ))}
            </Grid>
          </Grid>
        </ScrollArea>
      </Grid>
    </CustomerProtected>
  )
}

export default Browse
