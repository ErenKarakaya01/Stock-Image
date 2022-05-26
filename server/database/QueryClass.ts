const query = require("./db_config")

export default class Query {
  private table: string
  private selectColumns: string
  private where: string

  constructor(table: string) {
    this.table = table
    this.selectColumns = "*"
    this.where = "true"
  }

  getSelectColumns = () => {
    return this.selectColumns
  }

  setSelectColumns = (value: string) => {
    this.selectColumns = value
  }

  getWhere = () => {
    return this.where
  }

  setWhere = (value: string) => {
    this.where = value
  }

  select = (columns: string[]) => {
    this.setSelectColumns(columns.join(","))

    return this
  }

  find = async (columns: any) => {
    let where: string = Object.keys(columns)
      .map((key) => `${key} = \"${columns[key]}\"`)
      .join(" AND ")

    this.setWhere(where)

    let queryString: string = `SELECT ${this.selectColumns} FROM ${this.table} WHERE ${this.where};`

    let rows = await query(queryString)

    return rows
  }

  findOne = async (columns: any) => {
    let where: string = Object.keys(columns)
      .map((key) => `${key} = \"${columns[key]}\"`)
      .join(" AND ")

    this.setWhere(where)

    let queryString: string = `SELECT ${this.selectColumns} FROM ${this.table} WHERE ${this.where} LIMIT 1;`

    let rows = await query(queryString)

    return rows[0]
  }

  insertOne = async (columns: any) => {
    let columnItems = `(${Object.keys(columns).join(",")})`
    let valueItems = `(${Object.values(columns).map(v => `\"${v}\"`).join(",")})`

    let queryString: string = `INSERT INTO ${this.table} ${columnItems} VALUES ${valueItems};`

    let rows = await query(queryString)

    return rows
  }
}
