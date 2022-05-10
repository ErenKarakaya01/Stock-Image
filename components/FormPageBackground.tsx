import { Group, Grid, Col, Paper } from "@mantine/core"
import formStyles from "../sass/style.module.scss"

const FormPageBackground = () => {
  return (
    <Grid className={formStyles.background}>
      <Col span={4}>
        <Group>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src="/images/beyaz5.jpg"
              alt="beyaz5"
              className={formStyles.image}
            />
          </Paper>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src="/images/beyaz2.jpg"
              alt="beyaz2"
              className={formStyles.image}
            />
          </Paper>
        </Group>
      </Col>
      <Col span={4}>
        <Group>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src="/images/beyaz3.jpg"
              alt="beyaz3"
              className={formStyles.image}
            />
          </Paper>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src="/images/beyaz4.jpg"
              alt="beyaz4"
              className={formStyles.image}
            />
          </Paper>
        </Group>
      </Col>
      <Col span={4}>
        <Group>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src="/images/beyaz1.jpg"
              alt="beyaz1"
              className={formStyles.image}
            />
          </Paper>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src="/images/beyaz6.jpg"
              alt="beyaz6"
              className={formStyles.image}
            />
          </Paper>
        </Group>
      </Col>
    </Grid>
  )
}

export default FormPageBackground
