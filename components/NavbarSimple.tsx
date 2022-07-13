import React, { useContext } from "react"
import { createStyles, Navbar, Group, Code, Text } from "@mantine/core"
import {
  Receipt2,
  Upload,
  Logout,
  Search,
  Photo,
  User,
} from "tabler-icons-react"
import Link from "next/link"
import pageStyles from "../sass/pages.module.scss"
import UserContext from "components/contexts/user"
import AuthenticateContext from "components/contexts/authenticate"
import { useRouter } from "next/router"
import axios from "axios"
import { showNotification } from "@mantine/notifications"

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon")
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.blue[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        cursor: "pointer",

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === "dark"
            ? theme.white
            : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === "dark" ? 5 : 7
            ],
        },
      },
    },
  }
})

// Sidebar item datas
const data = [
  { link: "/browse", label: "Browse", icon: Search, type: "customer" },
  { link: "/upload", label: "Upload", icon: Upload, type: "creator" },
  { link: "/trades", label: "Trades", icon: Receipt2, type: "everyone" },
  { link: "/gallery", label: "Gallery", icon: Photo, type: "creator" },
]

export default function NavbarSimple() {
  const { classes } = useStyles()
  const { user, setUser } = useContext(UserContext)
  const { setIsAuth } = useContext(AuthenticateContext)
  const router = useRouter()

  // Sidebar items
  const links = data
    .filter((v) => v.type === user?.type || v.type === "everyone")
    .map((item) => (
      <Link href={item.link} key={item.label}>
        <div className={classes.link}>
          <item.icon className={classes.linkIcon} />
          <span>{item.label}</span>
        </div>
      </Link>
    ))

  // Handles logout
  const handleLogout = async () => {
    const { data } = await axios.get("/users/logout")

    if (data.isLoggedOut) {
      setUser!(null)
      setIsAuth!(false)
      router.push("/login")
    } else
      showNotification({
        autoClose: 5000,
        title: "Error",
        message: "An unknown error occurred",
        color: "red",
      })
  }

  return (
    <Navbar className={pageStyles.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
            <Code sx={{ fontWeight: 700 }}>npm run dev</Code>
          </a>
          <Text className={pageStyles.navbarText}>Stock Beyaz</Text>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link href="/creator">
          <div className={classes.link}>
            <User className={classes.linkIcon} />
            <span>Creator</span>
          </div>
        </Link>

        <div className={classes.link} onClick={handleLogout}>
          <Logout className={classes.linkIcon} />
          <span>Logout</span>
        </div>
      </Navbar.Section>
    </Navbar>
  )
}
