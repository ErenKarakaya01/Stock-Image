import QueryClass from "./QueryClass"

const table = (table: string) => {
  const queryClass = new QueryClass(table)
  return queryClass
}

export default table