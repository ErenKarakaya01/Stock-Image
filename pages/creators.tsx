import React, { useState } from 'react'
import pageStyles from "../sass/pages.module.scss"
import creatorsStyles from "../sass/creators.module.scss"
import { Group, Grid, Col, Paper, Select, Divider, Box, Card, Text, Badge, Highlight, Button, ScrollArea, Accordion, Image, AspectRatio } from "@mantine/core"
import NavbarSimple from "components/NavbarSimple"
import { Users, BrandLinkedin, BrandGithub, BrandTwitter, Mail } from "tabler-icons-react"
import useWriteDelayed from "./../hooks/useWriteDelayed"

const creators = () => {
  const [erenNickname, setErenNickname] = useState("")
  const [erenName, setErenName] = useState("")
  const [erenSurname, setErenSurname] = useState("")

  const [aysegulNickname, setAysegulNickname] = useState("")
  const [aysegulName, setAysegulName] = useState("")
  const [aysegulSurname, setAysegulSurname] = useState("")

  let erenNicknameString = "sprinkai"
  let erenNameString = "Name: Eren"
  let erenSurnameString = "Surname: Karakaya"

  let aysegulNicknameString = "rosselia"
  let aysegulNameString = "Name: Ayşegül"
  let aysegulSurnameString = "Surname: Terzi"

  useWriteDelayed(erenNickname, setErenNickname, erenNicknameString)
  useWriteDelayed(erenName, setErenName, erenNameString)
  useWriteDelayed(erenSurname, setErenSurname, erenSurnameString)

  useWriteDelayed(aysegulNickname, setAysegulNickname, aysegulNicknameString)
  useWriteDelayed(aysegulName, setAysegulName, aysegulNameString)
  useWriteDelayed(aysegulSurname, setAysegulSurname, aysegulSurnameString)

  return (
    <Grid className={pageStyles.grid}>
      <NavbarSimple />
      <Grid className={pageStyles.pageContent}>
        <Group position="center">
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            size="xl"
            weight={700}
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
          >
            CREATORS
          </Text>
        </Group>

        <Divider
          my="xs"
          variant="dashed"
          labelPosition="center"
          label={
            <>
              <Users size={15} />
              <Box ml={5}>Creators</Box>
            </>
          }
        />

        <Grid className={creatorsStyles.creators}>
          <Col className={creatorsStyles.col} span={6} data-aos="fade-right" data-aos-duration="1200">
            <Card className={creatorsStyles.card}>
              <Card.Section className={creatorsStyles.imageSection}>
                <AspectRatio className={creatorsStyles.aspectRatio} ratio={1 / 1}>
                  <img className={creatorsStyles.imageBackground} src="/images/circle.png" alt="circle" />
                  <img className={creatorsStyles.image} src="/images/beyaz1.jpg" />
                </AspectRatio>
              </Card.Section>

              <Card.Section className={creatorsStyles.infoSection}>
                <Group className={creatorsStyles.nickname} position="center">
                  {erenNickname}
                </Group>
                <Group position="apart" grow>
                  <Text variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
                    {erenName}
                  </Text>
                  <Text variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
                    {erenSurname}
                  </Text>
                </Group>

                <Group className={creatorsStyles.footer} position="center">
                  <a href="https://www.linkedin.com/in/eren-karakaya-b1a034206/">
                    <BrandLinkedin className={creatorsStyles.linkedin} size={30} />
                  </a>
                  <a href="https://www.linkedin.com/in/eren-karakaya-b1a034206/">
                    <BrandGithub className={creatorsStyles.github} size={30} />
                  </a>
                  <a href="https://www.linkedin.com/in/eren-karakaya-b1a034206/">
                    <BrandTwitter className={creatorsStyles.twitter} size={30} />
                  </a>
                  <a href="https://www.linkedin.com/in/eren-karakaya-b1a034206/">
                    <Mail className={creatorsStyles.mail} size={30} />
                  </a>
                </Group>
              </Card.Section>
            </Card>
          </Col>
          <Col className={creatorsStyles.col} span={6} data-aos="fade-left" data-aos-duration="1200">
            gasdgs
          </Col>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default creators