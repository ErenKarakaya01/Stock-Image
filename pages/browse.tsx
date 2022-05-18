import NavbarSimple from 'components/NavbarSimple'
import React, { useState } from 'react'
import pagestyles from "../sass/style.module.scss"
import { Group, Grid, Col, Paper, Select, Divider, Box, Card, Text, Badge, Highlight, Button } from "@mantine/core"
import { Search } from "tabler-icons-react"
import Link from "next/link"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from "@mui/material"

const a = () => {
  interface ImageObject {
    image_id: number,
    name: string,
    category: string,
    price: number,
    base64_url: string,
    liked: boolean
  }

  const data = Array(50).fill(0).map((_, index) => `Item ${index}`)

  const [data1, setData1] = useState<ImageObject[]>([
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", liked: true },
    { image_id: 2, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz2.jpg", liked: false },
    { image_id: 3, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz3.jpg", liked: true },
    { image_id: 4, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz4.jpg", liked: false },
    { image_id: 5, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz5.jpg", liked: true },
    { image_id: 6, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz6.jpg", liked: true }
  ])

  const handleLike = (image_id: number) => {
    let temp = data1

    data1.forEach((v, i) => {
      if (v.image_id === image_id) {
        temp[i].liked = !temp[i].liked
      }
    })
    setData1([])
    setData1([...data1])
  }

  return (
    <Grid className={pagestyles.grid}>
      <NavbarSimple />
      <Grid className={pagestyles.pageContent}>
        <Group position="apart" grow className={pagestyles.header}>
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
          className={pagestyles.divider}
          my="xs"
          variant="dashed"
          labelPosition="center"
          label={
            <>
              <Search size={12} />
              <Box ml={5}>Search</Box>
            </>
          }
        />

        <Grid className={pagestyles.images}>
          {[0, 1, 2, 3].map((value, index) => (
            <Col key={index} span={3} className={pagestyles.column}>
              {data1.filter((_, i) => i % 4 === value).map(v => (
                <Card key={v.image_id} className={pagestyles.imageCard} shadow="xl" radius={"lg"}>
                  <Link href={`/image/${v.image_id}`}>
                    <Card.Section className={pagestyles.image}>
                      <img src={v.base64_url} />
                    </Card.Section>
                  </Link>

                  <Group direction="column" className={pagestyles.info}>
                    <Text><b>Name: </b>{v.name}</Text>
                    <Text><b>Category: </b>{v.category}</Text>
                  </Group>

                  <Group position="apart" className={pagestyles.priceButton}>
                    <Badge color="pink" variant="light" size="xl">
                      {"$" + v.price}
                    </Badge>

                    <IconButton onClick={() => handleLike(v.image_id)}>
                      {v.liked === true ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="error" />}
                    </IconButton>

                    <Link href={`/image/${v.image_id}`}>
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
    </Grid>

  )
}

export default a