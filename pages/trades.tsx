import React, { useState } from "react"
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
  Accordion,
  Image,
} from "@mantine/core"
import { CurrencyDollar } from "tabler-icons-react"
import NavbarSimple from "components/NavbarSimple"
import ImageAccordion from "components/ImageAccordion"
import Authenticated from "./../components/protectedLayouts/Authenticated"

interface Image {
  image_id: number
  name: string
  category: string
  price: number
  base64_url: string
  size: string
  extension: string
  upload_date: string
  creator: string
  customer: string
  trade_date: string
}

const Trades = () => {
  const [data1, setData1] = useState<Image[]>([
    {
      image_id: 1,
      name: "eren",
      category: "adar",
      price: 31,
      base64_url: "/images/beyaz1.jpg",
      size: "1mb",
      extension: ".jpg",
      upload_date: "1.2.2001",
      creator: "eren",
      customer: "adar",
      trade_date: "1.2.2002",
    },
    {
      image_id: 1,
      name: "eren",
      category: "adar",
      price: 31,
      base64_url: "/images/beyaz1.jpg",
      size: "1mb",
      extension: ".jpg",
      upload_date: "1.2.2001",
      creator: "eren",
      customer: "adar",
      trade_date: "1.2.2002",
    },
    {
      image_id: 1,
      name: "eren",
      category: "adar",
      price: 31,
      base64_url: "/images/beyaz1.jpg",
      size: "1mb",
      extension: ".jpg",
      upload_date: "1.2.2001",
      creator: "eren",
      customer: "adar",
      trade_date: "1.2.2002",
    },
    {
      image_id: 1,
      name: "eren",
      category: "adar",
      price: 31,
      base64_url: "/images/beyaz1.jpg",
      size: "1mb",
      extension: ".jpg",
      upload_date: "1.2.2001",
      creator: "eren",
      customer: "adar",
      trade_date: "1.2.2002",
    },
    {
      image_id: 1,
      name: "eren",
      category: "adar",
      price: 31,
      base64_url: "/images/beyaz1.jpg",
      size: "1mb",
      extension: ".jpg",
      upload_date: "1.2.2001",
      creator: "eren",
      customer: "adar",
      trade_date: "1.2.2002",
    },
  ])

  return (
    <Authenticated>
      <Grid className={pageStyles.grid}>
        <NavbarSimple />
        <ScrollArea style={{ height: "101vh" }}>
          <Grid className={pageStyles.pageContent}>
            <Group position="center">
              <Text
                component="span"
                align="center"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                size="xl"
                weight={700}
                style={{ fontFamily: "Greycliff CF, sans-serif" }}
              >
                TRADES
              </Text>
            </Group>

            <Divider
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

            <ImageAccordion data={data1} isTradeCard={true} />
          </Grid>
        </ScrollArea>
      </Grid>
    </Authenticated>
  )
}

export default Trades
