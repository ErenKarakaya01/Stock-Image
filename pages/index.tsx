import { Grid } from "@mantine/core"
import NavbarSimple from "components/NavbarSimple"
import mainpagesyles from "../sass/style.module.scss"

const Home = () => {
  return <Grid columns={24} className={mainpagesyles.grid}>
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
