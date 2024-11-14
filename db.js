import mysql from "mysql2/promise";

export let db;

export async function conectarDB() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "db_user",
    password: "db_user_pass",
    database: "restaurante",
  });
}
