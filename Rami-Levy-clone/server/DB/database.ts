import mysql from "mysql2";


const sqlPassword = process.env.SQLPASSWORD;

//@ts-ignore
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: sqlPassword,
  database: "rami_levy_db"
})

connection.connect((err) => {
  try {
    if (err) throw err;
    console.log("connected to rami 🎉")
  } catch (error) {
    console.error(error)
  }
})

export default connection