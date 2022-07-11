import React, { useState } from "react"
import pageStyles from "../sass/pages.module.scss"
import creatorsStyles from "../sass/creators.module.scss"
import {
  Group,
  Grid,
  Col,
  Divider,
  Box,
  Card,
  Text,
  AspectRatio,
} from "@mantine/core"
import NavbarSimple from "components/NavbarSimple"
import {
  Users,
  BrandLinkedin,
  BrandGithub,
  BrandTwitter,
  Mail,
} from "tabler-icons-react"
import useWriteDelayed from "../hooks/useWriteDelayed"
import Authenticated from "../components/protectedLayouts/Authenticated"

const Creator = () => {
  const [erenNickname, setErenNickname] = useState("")
  const [erenName, setErenName] = useState("")
  const [erenSurname, setErenSurname] = useState("")

  let erenNicknameString = "sprinkai"
  let erenNameString = "Name: Eren"
  let erenSurnameString = "Surname: Karakaya"

  useWriteDelayed(erenNickname, setErenNickname, erenNicknameString)
  useWriteDelayed(erenName, setErenName, erenNameString)
  useWriteDelayed(erenSurname, setErenSurname, erenSurnameString)

  return (
    <Authenticated>
      <Grid className={pageStyles.grid}>
        <NavbarSimple />
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
              CREATOR
            </Text>
          </Group>

          <Divider
            my="xs"
            variant="dashed"
            labelPosition="center"
            label={
              <>
                <Users size={15} />
                <Box ml={5}>Creator</Box>
              </>
            }
          />

          <Grid className={creatorsStyles.creators}>
            <Col
              className={creatorsStyles.col}
              span={12}
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <Card className={creatorsStyles.card}>
                <Card.Section className={creatorsStyles.imageSection}>
                  <AspectRatio
                    className={creatorsStyles.aspectRatio}
                    ratio={1 / 1}
                  >
                    <img
                      className={creatorsStyles.imageBackground}
                      src="/images/circle.png"
                      alt="circle"
                    />
                    <img
                      className={creatorsStyles.image}
                      src="/images/sprinkai.jpg"
                    />
                  </AspectRatio>
                </Card.Section>

                <Card.Section className={creatorsStyles.infoSection}>
                  <Group className={creatorsStyles.nickname} position="center">
                    {erenNickname}
                  </Group>
                  <Group className={creatorsStyles.nameSurname} position="apart" grow>
                    <Text
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                    >
                      {erenName}
                    </Text>
                    <Text
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                    >
                      {erenSurname}
                    </Text>
                  </Group>

                  <Group className={creatorsStyles.footer} position="center">
                    <a href="https://www.linkedin.com/in/eren-karakaya-b1a034206/" target="_blank">
                      <BrandLinkedin
                        className={creatorsStyles.linkedin}
                        size={30}
                      />
                    </a>
                    <a href="https://github.com/ErenKarakaya01" target="_blank">
                      <BrandGithub
                        className={creatorsStyles.github}
                        size={30}
                      />
                    </a>
                    <a href="https://twitter.com/sprinkai0" target="_blank">
                      <BrandTwitter
                        className={creatorsStyles.twitter}
                        size={30}
                      />
                    </a>
                    <a href="mailto:erenkarakaya93@gmail.com" target="_blank">
                      <Mail className={creatorsStyles.mail} size={30} />
                    </a>
                  </Group>
                </Card.Section>
              </Card>
            </Col>

            
          </Grid>
        </Grid>
      </Grid>
    </Authenticated>
  )
}

export default Creator
