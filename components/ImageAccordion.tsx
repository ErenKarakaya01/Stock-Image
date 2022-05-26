import React, { useState } from 'react'
import accordionStyles from "../sass/accordion.module.scss"
import pageStyles from "../sass/pages.module.scss"
import { Group, Grid, Col, Paper, Select, Divider, Box, Card, Text, Badge, Highlight, Button, ScrollArea, Accordion, Image } from "@mantine/core"
import StyledAccordion from "components/StyledAccordion"


interface Image {
  image_id: number,
  name: string,
  category: string,
  price: number,
  base64_url: string,
  size: string,
  extension: string,
  upload_date: string,
  creator?: string,
  customer?: string,
  trade_date?: string
}

const ImageAccordion = ({ data, isTradeCard }: { data: Image[], isTradeCard: boolean }) => {

  return (
    <StyledAccordion>
      {data.map((v, i) => (
        <Accordion.Item
          key={i}
          className={accordionStyles.accordionItem}
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
          <Card className={accordionStyles.card}>
            <Grid className={accordionStyles.grid}>
              <Col className={accordionStyles.col3} span={3}>
                <Image src={v.base64_url} className={accordionStyles.image} />
              </Col>
              <Col span={9} className={accordionStyles.col9}>
                <Group position="apart" className={accordionStyles.row} grow>
                  <Text>
                    {`Size: ${v.size}`}
                  </Text>
                  <Text>
                    {`Extention: ${v.extension}`}
                  </Text>
                </Group>
                {isTradeCard && (
                  <Group position="apart" className={accordionStyles.row} grow>
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
                )}

                <Group position="right" className={accordionStyles.row}>
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
  )
}

export default ImageAccordion