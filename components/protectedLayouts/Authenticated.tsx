import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import AuthenticateContext from "components/contexts/authenticate"

const Authenticated = ({ children }: { children: any }) => {
  const { isAuth } = useContext(AuthenticateContext)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth)
      router.push("/login")
  }, [])


  return (<>
  {children}
  </>)
}

export default Authenticated
