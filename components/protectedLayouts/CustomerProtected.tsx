import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import AuthenticateContext from "components/contexts/authenticate"
import UserContext from "components/contexts/user"
import Loading from "components/Loading"
import { showNotification } from "@mantine/notifications"

const CustomerProtected = ({ children }: { children: any }) => {
  const { isAuth } = useContext(AuthenticateContext)
  const { user } = useContext(UserContext)
  const router = useRouter()
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)
  const [isUserLoaded, setIsUserLoaded] = useState(false)

  useEffect(() => {
    if (isAuth === null || user === null || user === undefined) return

    if (!isAuth) {
      showNotification({
        autoClose: 5000,
        title: "Not Logged In!",
        message: "You need to log in to access this page",
        color: "red",
      })
      router.push("/login")
    } else {
      setIsAuthLoaded(true)

      if (user.type !== "customer") {
        showNotification({
          autoClose: 5000,
          title: "Wrong User Type!",
          message: "Only the customer users can access this page",
          color: "red",
        })
        router.push("/trades")
      } else setIsUserLoaded(true)
    }
  }, [isAuth, user])

  if (!isAuthLoaded || !isUserLoaded) return <Loading />

  return <>{children}</>
}

export default CustomerProtected
