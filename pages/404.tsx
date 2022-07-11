import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import AuthenticateContext from "components/contexts/authenticate"
import Loading from "components/Loading"
import { showNotification } from "@mantine/notifications"

// Navigating a user a valid page instead of returning 404 page
const Page404 = () => {
  const { isAuth } = useContext(AuthenticateContext)
  const router = useRouter()

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
    } else {
      showNotification({
        autoClose: 5000,
        title: "Already Logged In!",
        message: "You are already logged in",
        color: "red",
      })
      router.push("/trades")
    }
  }, [isAuth])

  return <Loading />
}

export default Page404
