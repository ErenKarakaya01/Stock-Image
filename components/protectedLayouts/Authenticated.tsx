import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import AuthenticateContext from "components/contexts/authenticate"
import Loading from "components/Loading"
import { showNotification } from "@mantine/notifications"

const Authenticated = ({ children }: { children: any }) => {
  const { isAuth } = useContext(AuthenticateContext)
  const router = useRouter()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (isAuth === null) return

    if (!isAuth) {
      showNotification({
        autoClose: 5000,
        title: "Not Logged In!",
        message: "You need to log in to access this page",
        color: "red",
      })
      router.push("/login")
    } else setLoad(true)
  }, [isAuth])

  if (!load) return <Loading />

  return <>{children}</>
}

export default Authenticated
