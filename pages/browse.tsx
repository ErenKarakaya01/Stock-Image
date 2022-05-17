import NavbarSimple from 'components/NavbarSimple'
import React from 'react'
import pagestyles from "../sass/style.module.scss"
import { Group, Grid, Col, Paper, Select, Divider, Box, Card, Text, Badge, Highlight } from "@mantine/core"
import { Search } from "tabler-icons-react"

const a = () => {
  const data = Array(50).fill(0).map((_, index) => `Item ${index}`)

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
          <Col span={3} className={pagestyles.column}>
            <Card className={pagestyles.imageCard} shadow="xl" radius={"lg"}>
              <Card.Section className={pagestyles.image}>
                <img src="/images/beyaz2.jpg" />
              </Card.Section>

              <Group className={pagestyles.info}>
                <Text><b>Name: </b>Fjord Adventures</Text>
                <Text><b>Category: </b>Fjord Adventures</Text>
                <Badge color="pink" variant="light">
                  On Sale
                </Badge>
              </Group>
            </Card>
          </Col>
          <Col span={3} className={pagestyles.column}>
            <Card className={pagestyles.imageCard} shadow="xl" radius={"lg"}>
              <Card.Section className={pagestyles.image}>
                <img src="/images/beyaz1.jpg" />
              </Card.Section>

              <Group className={pagestyles.info}>
                <Text><b>Name: </b>Fjord Adventures</Text>
                <Text><b>Category: </b>Fjord Adventures</Text>
                <Badge color="pink" variant="light">
                  On Sale
                </Badge>
              </Group>
            </Card>
          </Col>
          <Col span={3} className={pagestyles.column}>
            <Card className={pagestyles.imageCard}>
              <Card.Section className={pagestyles.image}>
                <img src="/images/beyaz1.jpg" />
              </Card.Section>
            </Card>
          </Col>
          <Col span={3} className={pagestyles.column}>
            <Card className={pagestyles.imageCard}>
              <Card.Section className={pagestyles.image}>
                <img src="/images/beyaz1.jpg" />
              </Card.Section>
            </Card>
          </Col>
          <Col span={3} className={pagestyles.column}>
            <Card className={pagestyles.imageCard}>
              <Card.Section className={pagestyles.image}>
                <img src="/images/beyaz1.jpg" />
              </Card.Section>
            </Card>
          </Col>
          <Col span={3} className={pagestyles.column}>
            <Card className={pagestyles.imageCard}>
              <Card.Section className={pagestyles.image}>
                <img src="/images/beyaz1.jpg" />
              </Card.Section>
            </Card>
          </Col>
        </Grid>
      </Grid>
    </Grid>

  )
}

export default a