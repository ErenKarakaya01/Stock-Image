import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import AuthenticateContext from "components/contexts/authenticate"
import UserContext from "components/contexts/user"

const CreatorProtected = ({ children }: { children: any }) => {
  const { isAuth } = useContext(AuthenticateContext)
  const { user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth)
      router.push("/login")
    else {
      if (user!.type !== "creator")
        router.push("/browse")
    }
  }, [])

  if (isAuth === null) return null

  return (<>
  {children}
  </>)
}

export default CreatorProtected