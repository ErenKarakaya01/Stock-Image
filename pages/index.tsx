import { Grid } from "@mantine/core"
import NavbarSimple from "components/NavbarSimple"
import pagestyles from "../sass/style.module.scss"

const Home = () => {
  return <Grid columns={24} className={pagestyles.grid}>
    <NavbarSimple />
  </Grid >
}

export default Home

/* export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
} */
