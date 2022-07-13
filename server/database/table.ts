import QueryClass from "./QueryClass"

// Returns the entry object to select the database table
const table = (table: string) => {
  const queryClass = new QueryClass(table)
  return queryClass
}

export default table