const mySQL = require("mysql");
const connection = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "notes",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log("Connect failed!", err);
  } else {
    console.log("Connected successfully!");
  }
});

module.exports = connection;
