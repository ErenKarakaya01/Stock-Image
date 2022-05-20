export default function Post() {
  return <div>div</div>
}

/* export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (url: any) => {
  const postData = await getPostData(url.params.id as string)
  return {
    props: {
      postData
    }
  }
} */
