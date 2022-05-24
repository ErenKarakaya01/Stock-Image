import { AppProps } from "next/app"
import Head from "next/head"
import { MantineProvider } from "@mantine/core"
import { TypographyStylesProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import "../sass/global.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect, useState } from "react"
import AuthenticateContext from "components/contexts/authenticate"
import UserContext from "components/contexts/user"
import axios from "axios"

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  const [isAuth, setIsAuth] = useState<true | false>(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    AOS.init()
    AOS.refresh()
    ;(async () => {
      const { data } = await axios.get("/users/isauthenticated")

      if (data.isAuthenticated) {
        const { data } = await axios.get("/users/getuser")

        setUser(data.user)
      }

      setIsAuth(data.isAuthenticated)
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Stock Image</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <TypographyStylesProvider>
          <NotificationsProvider>
            <AuthenticateContext.Provider value={{ isAuth, setIsAuth }}>
              <UserContext.Provider value={{ user, setUser }}>
                <Component {...pageProps} />
              </UserContext.Provider>
            </AuthenticateContext.Provider>
          </NotificationsProvider>
        </TypographyStylesProvider>
      </MantineProvider>
    </>
  )
}

export default App
