const query = require("./db_config")

export default class Query {
  private table: string
  private selectColumns: string
  private whereString: string

  constructor(table: string) {
    this.table = table
    this.selectColumns = "*"
    this.whereString = "true"
  }

  getSelectColumns = () => {
    return this.selectColumns
  }

  setSelectColumns = (value: string) => {
    this.selectColumns = value
  }

  getWhereString = () => {
    return this.whereString
  }

  setWhereString = (value: string) => {
    this.whereString = value
  }

  select = (columns: string[]) => {
    this.setSelectColumns(columns.join(","))

    return this
  }

  where = (columns: any) => {
    let where: string = Object.keys(columns)
      .map((key) => `${key} = \"${columns[key]}\"`)
      .join(" AND ")

    this.setWhereString(where)
  }

  find = async (columns?: any) => {
    if (columns) {
      this.where(columns)
    }

    let queryString: string = `SELECT ${this.selectColumns} FROM ${this.table} WHERE ${this.whereString};`

    let rows = await query(queryString)

    return rows
  }

  findOne = async (columns: any) => {
    this.where(columns)

    let queryString: string = `SELECT ${this.selectColumns} FROM ${this.table} WHERE ${this.whereString} LIMIT 1;`

    let rows = await query(queryString)

    return rows[0]
  }

  insertOne = async (columns: any) => {
    let columnItems = `(${Object.keys(columns).join(",")})`
    let valueItems = `(${Object.values(columns)
      .map((v) => `\"${v}\"`)
      .join(",")})`

    let queryString: string = `INSERT INTO ${this.table} ${columnItems} VALUES ${valueItems};`

    let rows = await query(queryString)

    return rows
  }

  deleteOne = async (columns: any) => {
    this.where(columns)

    let queryString: string = `DELETE FROM ${this.table} WHERE ${this.whereString};`

    let rows = await query(queryString)

    return rows[0]
  }

  updateOne = async (where: any, columns: any) => {
    let setString: string = Object.keys(columns)
      .map((key) => `${key} = ${columns[key]}`)
      .join(",")

    this.where(where)

    let queryString: string = `UPDATE ${this.table} SET ${setString} WHERE ${this.whereString};`

    let rows = await query(queryString)

    return rows[0]
  }

  /* SELECT customer_id, trade_date, price FROM trading 
  LEFT JOIN image ON trading.image_id = image.image_id 
  UNION 
  SELECT customer_id, trade_date, price FROM image 
  RIGHT JOIN trading ON image.image_id = trading.image_id; */
  fullJoin = async (tables: [string, string], leftColumns: any, rightColumns: any) => {
    const getWhereFormat = (table: string, columns: any) => {
      let where: string = Object.keys(columns)
      .map((key) => `${table}.${key} = \"${columns[key]}\"`)
      .join(" AND ")

      return where
    }

    const select: string = `SELECT ${this.select} FROM`
    const leftJoin: string = `LEFT JOIN ${tables[1]} ON ${getWhereFormat(tables[0], leftColumns)}}`
    const rightJoin: string = `RIGHT JOIN ${tables[0]} ON ${getWhereFormat(tables[1], rightColumns)}`

    const queryString: string = `${select} ${tables[0]} ${leftJoin} UNION ${select} ${tables[1]} ${rightJoin};`

    const rows = await query(queryString)

    return rows
  }
}
