import NavbarSimple from 'components/NavbarSimple'
import React, { useState, useEffect, useContext } from 'react'
import browseStyles from "../sass/browse.module.scss"
import pageStyles from "../sass/pages.module.scss"
import { Group, Grid, Col, Paper, Select, Divider, Box, Card, Text, Badge, Highlight, Button, ScrollArea, Image } from "@mantine/core"
import { Search } from "tabler-icons-react"
import Link from "next/link"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from "@mui/material"
import UserContext from "components/contexts/user"


interface Image {
  image_id: number,
  name: string,
  category: string,
  price: number,
  base64_url: string,
  liked: boolean
}

const Browse = () => {
  const { user } = useContext(UserContext)

  const data = Array(50).fill(0).map((_, index) => `Item ${index}`)

  useEffect(() => {
    console.log(user)
  }, [])

  const [data1, setData1] = useState<Image[]>([
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", liked: true },
    { image_id: 2, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz2.jpg", liked: false },
    { image_id: 3, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz3.jpg", liked: true },
    { image_id: 4, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz4.jpg", liked: false },
    { image_id: 5, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz5.jpg", liked: true },
    { image_id: 6, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz6.jpg", liked: true }
  ])

  const handleLike = (image_id: number) => {
    data1.forEach((v, i) => {
      if (v.image_id === image_id) {
        data1[i].liked = !data1[i].liked
      }
    })
    setData1([...data1])
  }

  return (
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
                {data1.filter((_, i) => i % 4 === value).map(v => (
                  <Card key={v.image_id} className={browseStyles.imageCard} shadow="xl" radius={"lg"}>
                    <Link href={`/images/${v.image_id}`}>
                      <Card.Section className={browseStyles.image}>
                        <Image src={v.base64_url} alt={v.name} />
                      </Card.Section>
                    </Link>

                    <Group direction="column" className={browseStyles.info}>
                      <Text><b>Name: </b>{v.name}</Text>
                      <Text><b>Category: </b>{v.category}</Text>
                    </Group>

                    <Group position="apart" className={browseStyles.priceButton}>
                      <Badge color="pink" variant="light" size="xl">
                        {"$" + v.price}
                      </Badge>

                      <IconButton onClick={() => handleLike(v.image_id)}>
                        {v.liked === true ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="error" />}
                      </IconButton>

                      <Link href={`/images/${v.image_id}`}>
                        <Button variant="outline" radius={"xl"} gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                          Buy
                        </Button>
                      </Link>
                    </Group>
                  </Card >
                ))}
              </Col>
            ))}
          </Grid>
        </Grid>
      </ScrollArea>
    </Grid>
  )
}

export default Browse