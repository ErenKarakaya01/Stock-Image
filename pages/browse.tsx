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
}

const Browse = () => {
  const { user } = useContext(UserContext)

  const data = Array(50)
    .fill(0)
    .map((_, index) => `Item ${index}`)

  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    if (user === null) return

    (async () => {
      const { data } = await axios.get(`/images/browse/${user!.id}`)

      setImages(data.images)
    })()
  }, [user])

  const handleLike = async (image_id: number) => {
    const { data } = await axios.post("/images/toggle_like", { id: user!.id, image_id: image_id })
    console.log(data)

    images.forEach((v, i) => {
      if (v.image_id === image_id) {
        images[i].liked = !images[i].liked
      }
    })
    setImages([...images])
  }

  return (
    <CustomerProtected>
      <Grid className={pageStyles.grid}>
        <NavbarSimple />
        <ScrollArea style={{ height: "101vh" }}>
          <Grid className={pageStyles.pageContent}>
            <Group position="apart" grow className={browseStyles.header}>
              <Select
                placeholder="Name"
                searchable
                nothingFound="No picture"
                maxDropdownHeight={280}
                data={data}
              />
              <Select
                placeholder="Category"
                searchable
                nothingFound="No picture"
                maxDropdownHeight={280}
                data={data}
              />
              <Select
                placeholder="Sort By"
                maxDropdownHeight={280}
                data={data}
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
                            <Image src={v.base64_url} alt={v.name} />
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
                            {v.liked === true ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteBorderIcon color="error" />
                            )}
                          </IconButton>

                          <Link href={`/images/${v.image_id}`}>
                            <Button
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
