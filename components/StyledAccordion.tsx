import { Accordion, AccordionProps, createStyles } from "@mantine/core"
import { CurrencyDollar } from "tabler-icons-react"

const useStyles = createStyles((theme, _params, getRef) => ({
  icon: { ref: getRef("icon") },

  control: {
    ref: getRef("control"),
    border: 0,
    opacity: 0.6,
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.blue[7],

    "&:hover": {
      backgroundColor: "transparent",
      opacity: 1,
    },
  },

  item: {
    borderBottom: 0,
    transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
    border: "1px solid transparent",
    borderRadius: theme.radius.sm,
    overflow: "hidden",

    "&:hover": {
      outline: `1px solid ${theme.colors.indigo[3]}`,
    },
  },

  itemOpened: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.indigo[3],

    "&:hover": {
      outline: "none",
    },

    [`& .${getRef("control")}`]: {
      opacity: 1,
    },

    [`& .${getRef("icon")}`]: {
      transform: "rotate(45deg)",
    },
  },

  content: {
    paddingLeft: 0,
  },
}))

const StyledAccordion = (props: AccordionProps) => {
  const { classes } = useStyles()
  return (
    <Accordion
      classNames={classes}
      icon={<CurrencyDollar size={16} />}
      {...props}
    />
  )
}

export default StyledAccordion
