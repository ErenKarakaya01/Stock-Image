import React, { useState } from 'react'
import tradesStyles from "../sass/trades.module.scss"
import pageStyles from "../sass/pages.module.scss"
import { Group, Grid, Col, Paper, Select, Divider, Box, Card, Text, Badge, Highlight, Button, ScrollArea, Accordion, Image } from "@mantine/core"
import { CurrencyDollar } from 'tabler-icons-react'
import NavbarSimple from "components/NavbarSimple"
import StyledAccordion from "components/StyledAccordion"

const Trades = () => {
  interface ImageObject {
    image_id: number,
    name: string,
    category: string,
    price: number,
    base64_url: string,
    resolution: string,
    size: string,
    extension: string,
    upload_date: string,
    creator: string,
    customer: string,
    trade_date: string
  }

  const [data1, setData1] = useState<ImageObject[]>([
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001", creator: "eren", customer: "adar", trade_date: "1.2.2002" },
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001", creator: "eren", customer: "adar", trade_date: "1.2.2002" },
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001", creator: "eren", customer: "adar", trade_date: "1.2.2002" },
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001", creator: "eren", customer: "adar", trade_date: "1.2.2002" },
    { image_id: 1, name: "eren", category: "adar", price: 31, base64_url: "/images/beyaz1.jpg", resolution: "1x1", size: "1mb", extension: ".jpg", upload_date: "1.2.2001", creator: "eren", customer: "adar", trade_date: "1.2.2002" },
  ])

  return (
    <Grid className={pageStyles.grid}>
      <NavbarSimple />
      <ScrollArea style={{ height: "101vh" }}>
        <Grid className={pageStyles.pageContent}>
          <Group position="center" className={tradesStyles.header}>
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              size="xl"
              weight={700}
              style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            >
              TRADES
            </Text>
          </Group>

          <Divider
            className={tradesStyles.divider}
            my="xs"
            variant="dashed"
            labelPosition="center"
            label={
              <>
                <CurrencyDollar size={15} />
                <Box ml={5}>Trades</Box>
              </>
            }
          />

          <StyledAccordion className={tradesStyles.accordion}>
            {data1.map((v, i) => (
              <Accordion.Item
                key={i}
                className={tradesStyles.accordionItem}
                label={
                  <Group position="apart">
                    <Text>
                      {`Name: ${v.name}`}
                    </Text>
                    <Text>
                      {`Category: ${v.category}`}
                    </Text>
                    <Text>
                      {`$${v.price}`}
                    </Text>
                  </Group>
                }
              >
                <Card className={tradesStyles.card}>
                  <Grid className={tradesStyles.grid}>
                    <Col className={tradesStyles.col3} span={3}>
                      <Image src={v.base64_url} className={tradesStyles.image} />
                    </Col>
                    <Col span={9} className={tradesStyles.col9}>
                      <Group position="apart" className={tradesStyles.row} grow>
                        <Text>
                          {`Resolution: ${v.resolution}`}
                        </Text>
                        <Text>
                          {`Size: ${v.size}`}
                        </Text>
                        <Text>
                          {`Extention: ${v.extension}`}
                        </Text>
                      </Group>
                      <Group position="apart" className={tradesStyles.row} grow>
                        <Text>
                          {`Creator: ${v.creator}`}
                        </Text>
                        <Text>
                          {`Customer: ${v.customer}`}
                        </Text>
                        <Text>
                          {`Trade Date: ${v.trade_date}`}
                        </Text>
                      </Group>
                      <Group position="right" className={tradesStyles.row}>
                        <Text>
                          {`Upload Date: ${v.upload_date}`}
                        </Text>
                      </Group>
                    </Col>
                  </Grid>
                </Card>
              </Accordion.Item>
            ))}
          </StyledAccordion>
        </Grid>
      </ScrollArea>
    </Grid>
  )
}

export default Trades