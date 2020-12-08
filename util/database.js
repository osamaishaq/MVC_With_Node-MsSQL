// const sql = require("mssql");

// const config = {
//   user: "sa",
//   password: "OsamaSQL",
//   server: "localhost", // You can use 'localhost\\instance' to connect to named instance
//   database: "Test",
// };

// const poolPromise = new sql.ConnectionPool(config)
//   .connect()
//   .then((pool) => {
//     console.log("Connected to MSSQL");
//     return pool;
//   })
//   .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

// module.exports = {
//   sql,
//   poolPromise,
// };

//? Sequlize Implementaion

const Sequelize = require("sequelize");

const sequelize = new Sequelize("Test", "sa", "OsamaSQL", {
  dialect: "mssql",
  dialectOptions: {
    // Observe the need for this nested `options` field for MSSQL
    // options: {
    //   // Your tedious options here
    //   useUTC: false,
    //   dateFirst: 1
    // }
  },
});

module.exports = sequelize;
