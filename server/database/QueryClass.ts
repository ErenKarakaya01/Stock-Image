const query = require("./db_config")

interface LooseObject {
  [key: string]: any
}

export default class Query {
  private table: string
  private selectColumns: string
  private whereString: string
  private onString: string
  private leftJoinString: string
  private innerJoinString: string
  private orderByString: string
  private groupByString: string

  constructor(table: string) {
    this.table = table
    this.selectColumns = "*"
    this.whereString = "true"
    this.onString = ""
    this.leftJoinString = ""
    this.innerJoinString = ""
    this.orderByString = ""
    this.groupByString = ""
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
    return this
  }

  getOnString = () => {
    return this.onString
  }

  setOnString = (value: string) => {
    this.onString = value
  }

  getLeftJoinString = () => {
    return this.leftJoinString
  }

  setLeftJoinString = (value: string) => {
    this.leftJoinString = value
  }

  getInnerJoinString = () => {
    return this.innerJoinString
  }

  setInnerJoinString = (value: string) => {
    this.innerJoinString = value
  }

  getOrderByString = () => {
    return this.orderByString
  }

  setOrderByString = (value: string) => {
    this.orderByString = value
  }

  getGroupByString = () => {
    return this.groupByString
  }

  setGroupByString = (value: string) => {
    this.groupByString = value
  }

  select = (columns: string[]) => {
    this.setSelectColumns(columns.join(","))

    return this
  }

  where = (columns: LooseObject) => {
    let where: string = Object.keys(columns)
      .map((key) => `${key} = \"${columns[key]}\"`)
      .join(" AND ")

    this.setWhereString(where)

    return this
  }

  on = (columns: LooseObject) => {
    let on: string = Object.keys(columns)
      .map((key) => `${key} = ${columns[key]}`)
      .join(" AND ")

    this.setOnString(on)
  }

  orderBy = (column: string) => {
    this.setOrderByString(`ORDER BY ${column}`)

    return this
  }

  groupBy = (column: string) => {
    this.setGroupByString(`GROUP BY ${column}`)

    return this
  }

  /* fullJoin = async (
    tables: [string, string],
    leftColumns: LooseObject,
    rightColumns: LooseObject
  ) => {
    const getWhereFormat = (table: string, columns: LooseObject) => {
      let where: string = Object.keys(columns)
        .map((key) => `${table}.${key} = \"${columns[key]}\"`)
        .join(" AND ")

      return where
    }

    const select: string = `SELECT ${this.select} FROM`
    const leftJoin: string = `LEFT JOIN ${tables[1]} ON ${getWhereFormat(
      tables[0],
      leftColumns
    )}}`
    const rightJoin: string = `RIGHT JOIN ${tables[0]} ON ${getWhereFormat(
      tables[1],
      rightColumns
    )}`

    const queryString: string = `${select} ${tables[0]} ${leftJoin} UNION ${select} ${tables[1]} ${rightJoin};`

    const rows = await query(queryString)

    return rows
  } */

  leftJoin = (columns: LooseObject, table: string) => {
    this.on(columns)

    this.setLeftJoinString(
      `${this.leftJoinString} LEFT JOIN ${table} ON ${this.onString}`
    )

    return this
  }

  innerJoin = (columns: LooseObject, table: string) => {
    this.on(columns)

    this.setInnerJoinString(
      `${this.innerJoinString} INNER JOIN ${table} ON ${this.onString}`
    )

    return this
  }

  // Queries
  find = async (columns?: LooseObject) => {
    if (columns) {
      this.where(columns)
    }

    let queryString: string = `SELECT ${this.selectColumns} FROM ${this.table} ${this.leftJoinString} ${this.innerJoinString} WHERE ${this.whereString} ${this.groupByString} ${this.orderByString};`

    let rows = await query(queryString)

    return rows
  }

  findOne = async (columns: LooseObject) => {
    this.where(columns)

    let queryString: string = `SELECT ${this.selectColumns} FROM ${this.table} ${this.leftJoinString} ${this.innerJoinString} WHERE ${this.whereString} ${this.groupByString} ${this.orderByString} LIMIT 1;`

    let rows = await query(queryString)

    return rows[0]
  }

  insertOne = async (columns: LooseObject) => {
    let columnItems = `(${Object.keys(columns).join(",")})`
    let valueItems = `(${Object.values(columns)
      .map((v) => `\"${v}\"`)
      .join(",")})`

    let queryString: string = `INSERT INTO ${this.table} ${columnItems} VALUES ${valueItems};`

    let rows = await query(queryString)

    return rows
  }

  deleteOne = async (columns: LooseObject) => {
    this.where(columns)

    let queryString: string = `DELETE FROM ${this.table} WHERE ${this.whereString};`

    let rows = await query(queryString)

    return rows[0]
  }

  updateOne = async (where: LooseObject, columns: LooseObject) => {
    let setString: string = Object.keys(columns)
      .map((key) => `${key} = ${columns[key]}`)
      .join(",")

    this.where(where)

    let queryString: string = `UPDATE ${this.table} SET ${setString} WHERE ${this.whereString};`

    let rows = await query(queryString)

    return rows[0]
  }
}
