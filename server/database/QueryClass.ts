const query = require("./db_config")

export default class Query {
  private table: string
  private select: string
  private where: string

  constructor(table: string) {
    this.table = table
    this.select = "*"
    this.where = "true"
  }

  public getSelect = () => {
    return this.select
  }

  public setSelect = (value: string) => {
    this.select = value
  }

  public getWhere = () => {
    return this.where
  }

  public setWhere = (value: string) => {
    this.where = value
  }

  findOne = async (columns: any) => {
    let where: string = Object.keys(columns)
      .map((key) => `${key} = \"${columns[key]}\"`)
      .join(" AND ")

    this.setWhere(where)

    let queryString: string = `SELECT ${this.select} FROM ${this.table} WHERE ${this.where};`

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
