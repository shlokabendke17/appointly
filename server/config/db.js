import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "VB@mysql",
  database: "vbapp",
});

db.connect((err) => {
  if (err) console.error("DB Connection Error:", err);
  else console.log("✅ MySQL Connected");
});

export default db;

// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();

// const db = mysql
//   .createConnection({
//     host: process.env.DB_HOST || "localhost",
//     user: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "VB@mysql",
//     database: process.env.DB_NAME || "vbapp",
//   })
//   .promise(); // 👈 THIS IS THE MAGIC LINE

//   db.connect((err) => {
//   if (err) console.error("DB Connection Error:", err);
//   else console.log("✅ MySQL Connected");
// });

// export default db;

// import mysql from "mysql2/promise"; // 👈 use promise version directly
// import dotenv from "dotenv";

// dotenv.config();

// const db = await mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "VB@mysql",
//   database: process.env.DB_NAME || "vbapp",
// });

// console.log("✅ MySQL Connected");

// export default db;

