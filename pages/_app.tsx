import { AppProps } from "next/app"
import Head from "next/head"
import { MantineProvider } from "@mantine/core"
import { TypographyStylesProvider } from "@mantine/core"
import { NotificationsProvider } from '@mantine/notifications';
import "../sass/global.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  useEffect(() => {
    AOS.init()
    AOS.refresh()
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
            <Component {...pageProps} />
          </NotificationsProvider>
        </TypographyStylesProvider>
      </MantineProvider>
    </>
  )
}

export default App
