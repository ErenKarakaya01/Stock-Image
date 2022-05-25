import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import AuthenticateContext from "components/contexts/authenticate"

const Authenticated = ({ children }: { children: any }) => {
  const { isAuth } = useContext(AuthenticateContext)
  const router = useRouter()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (isAuth === null) return

    if (!isAuth) router.push("/login")
    else setLoad(true)
  }, [isAuth])

  if (!load) return null

  return <>{children}</>
}

export default Authenticated
