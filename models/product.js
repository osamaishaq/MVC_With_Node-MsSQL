// const { poolPromise } = require("../util/database");

// const Cart = require("./cart");

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   async save() {
//     const pool = await poolPromise;
//     console.log("YE ==> " + this.title);
//     return pool
//       .request()
//       .query(
//         `INSERT INTO products (title, price, imageUrl, description) VALUES ('${this.title}',${this.price} ,'${this.imageUrl}', '${this.description}')`
//       );
//   }

//   static deleteById(id) {}

//   static async fetchAll() {
//     const pool = await poolPromise;
//     return pool.request().query("SELECT * FROM products");
//   }

//   static async findById(id) {
//     const pool = await poolPromise;
//     return pool
//       .request()
//       .query(`SELECT * FROM products WHERE products.id = ${id}`);
//   }
// };

// ? Below is The example of squlize

const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
