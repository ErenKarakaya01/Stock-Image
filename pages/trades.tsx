import React, { useState, useEffect, useContext } from "react"
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
import UserContext from "components/contexts/user"
import axios from "axios"

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
  const [images, setImages] = useState<Image[]>([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user === null) return

    ;(async () => {
      const { data } = await axios.get(`/images/trades/${user!.id}`)

      console.log(data)

      setImages(data.trades.map((image: Image) => {
        return {
          ...image,
          extension: getFileType(image.base64_url),
          size: getSize(image.base64_url)
        }
      }))
    })()
  }, [user])

  const getFileType = (base64_url: string) => {
    return base64_url
      .substring("data:image/".length, base64_url.indexOf(";base64"))
      .toUpperCase()
  }

  const getSize = (base64_url: string) => {
    let stringLength = base64_url.length - "data:image/png;base64,".length

    let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812
    let sizeInKb = sizeInBytes / 1024

    return sizeInKb.toFixed(0)
  }

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

            <ImageAccordion data={images} isTradeCard={true} />
          </Grid>
        </ScrollArea>
      </Grid>
    </Authenticated>
  )
}

export default Trades
