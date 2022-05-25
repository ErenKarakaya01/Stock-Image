import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import AuthenticateContext from "components/contexts/authenticate"
import UserContext from "components/contexts/user"
import axios from "axios"

const CustomerProtected = ({ children }: { children: any }) => {
  const router = useRouter()
  const [isAuthFetched, setIsAuthFetched] = useState(false)
  const [isUserFetched, setIsUserFetched] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get("/users/isauthenticated")
      setIsAuthFetched(true)
      console.log(data.isAuthenticated)

      if (data.isAuthenticated) {
        const { data } = await axios.get("/users/getuser")

        if (data.user.type !== "customer") {
          setIsUserFetched(true)
          router.push("/browse")
        }
        setIsUserFetched(true)
      } else {
        router.push("/login")
      }
    })()
  }, [])

  if (!isAuthFetched || !isUserFetched) return null

  return <>{children}</>
}

export default CustomerProtected
