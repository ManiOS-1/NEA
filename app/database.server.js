import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export const getDb = async () => {
  console.log(`attempting to open DB`)

  const db = await open({
    filename: `./app/databaseForNEA.db`,
    driver: sqlite3.Database,
  })
  return db
}