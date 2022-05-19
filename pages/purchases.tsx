import React, { useState } from 'react'
import purchasesStyles from "../sass/style.module.scss"
import { Group, Grid, Col, Paper, Select, Divider, Box, Card, Text, Badge, Highlight, Button, ScrollArea, Accordion, Image } from "@mantine/core"
import { CurrencyDollar } from 'tabler-icons-react'
import NavbarSimple from "components/NavbarSimple"
import StyledAccordion from "components/StyledAccordion"

const Purchases = () => {
  interface ImageObject {
    image_id: number,
    name: string,
    category: string,
    price: number,
    base64_url: string,
    liked: boolean
  }

  const [data1, setData1] = useState<ImageObject[]>([
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", liked: true },
    { image_id: 2, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz2.jpg", liked: false },
    { image_id: 3, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz3.jpg", liked: true },
    { image_id: 4, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz4.jpg", liked: false },
    { image_id: 5, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz5.jpg", liked: true },
    { image_id: 6, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz6.jpg", liked: true }
  ])

  return (
    <Grid className={purchasesStyles.grid}>
      <NavbarSimple />
      <ScrollArea style={{ height: "101vh" }}>
        <Grid className={purchasesStyles.pageContent}>
          <Group position="center" className={purchasesStyles.header}>
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              size="xl"
              weight={700}
              style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            >
              PURCHASES
            </Text>
          </Group>

          <Divider
            className={purchasesStyles.divider}
            my="xs"
            variant="dashed"
            labelPosition="center"
            label={
              <>
                <CurrencyDollar size={15} />
                <Box ml={5}>Purchases</Box>
              </>
            }
          />

          <StyledAccordion className={purchasesStyles.accordion}>
            <Accordion.Item
              className={purchasesStyles.accordionItem}
              label={
                <Group position="apart">
                  <Text>
                    agsdg
                  </Text>
                  <Text>
                    agsdg
                  </Text>
                  <Text>
                    agsdg
                  </Text>
                </Group>
              }
            >
              <Card className={purchasesStyles.card}>
                <Grid className={purchasesStyles.grid}>
                  <Col className={purchasesStyles.col} span={3}>
                    <Image src="/images/beyaz1.jpg" className={purchasesStyles.image} />
                  </Col>
                </Grid>
              </Card>
            </Accordion.Item>
          </StyledAccordion>
        </Grid>
      </ScrollArea>
    </Grid>
  )
}

export default Purchases