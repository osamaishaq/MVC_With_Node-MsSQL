const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const Product = require("./models/product");
const User = require("./models/user");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//? Mapping Relationships between User and Product
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

//? This will create sql table by looking at the models
//? force: true ==> will create new table on every npm start
//! Important: force: true ==> should only be used in Devlopment
sequelize
  .sync({ force: true })
  .then((result) => {
    //console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000);
