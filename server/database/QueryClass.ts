const mysql = require('mysql2/promise')

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
  
  findOne = (columns: any) => {
    let where: string = Object.keys(columns).map(key => `${key} = ${columns[key]}`).join(" AND ")
    this.setWhere(where)
    return this
  }

  insertOne = () => {
    
  }

  execute = async () => {
    try {
      let query: string = `SELECT ${this.select} FROM ${this.table} WHERE ${this.where};`

      const [rows,] = await mysql.query(query)

      return rows
    } catch (err) {
      console.log(err)
    }
  }
}