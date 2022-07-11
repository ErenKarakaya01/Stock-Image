import React from "react"
import accordionStyles from "../sass/accordion.module.scss"
import {
  Group,
  Grid,
  Col,
  Card,
  Text,
  Accordion,
  Image,
} from "@mantine/core"
import StyledAccordion from "components/StyledAccordion"

interface Image {
  image_id: number
  name: string
  category: string
  price: number
  base64_url: string
  size: string
  extension: string
  upload_date: string
  creator?: string
  customer?: string
  trade_date?: string
}

const ImageAccordion = ({
  data,
  isTradeCard,
}: {
  data: Image[]
  isTradeCard: boolean
}) => {
  const dateOptions: any = { year: "numeric", month: "long", day: "numeric" }

  return (
    <StyledAccordion>
      {data.map((v, i) => (
        <Accordion.Item
          key={i}
          className={accordionStyles.accordionItem}
          label={
            <Group position="apart">
              <Text>{`Name: ${v.name}`}</Text>
              <Text>{`Category: ${v.category}`}</Text>
              <Text>{`$${v.price}`}</Text>
            </Group>
          }
        >
          <Card className={accordionStyles.card}>
            <Grid className={accordionStyles.grid}>
              <Col className={accordionStyles.col3} span={3}>
                <Image src={v.base64_url} className={accordionStyles.image} />
              </Col>
              <Col span={9} className={accordionStyles.col9}>
                <Group position="apart" className={accordionStyles.row}>
                  <Text>{`Size: ${v.size}KB`}</Text>
                  <Text>{`Extention: ${v.extension}`}</Text>
                </Group>
                {isTradeCard && (
                  <Group position="apart" className={accordionStyles.row}>
                    <Text>{`Creator: ${v.creator}`}</Text>
                    <Text>{`Customer: ${v.customer}`}</Text>
                    <Text>{`Trade Date: ${new Date(
                      v.upload_date
                    ).toLocaleString("en-US", dateOptions)}`}</Text>
                  </Group>
                )}

                <Group position="right" className={accordionStyles.row}>
                  <Text>
                    {`Upload Date: ${new Date(v.upload_date).toLocaleString(
                      "en-US",
                      dateOptions
                    )}`}
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
