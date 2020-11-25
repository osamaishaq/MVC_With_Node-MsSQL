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

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      console.log("lol");
      next();
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("lol 2");
});

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
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "test", email: "test@testgmail.com" });
    }
    return user;
  })
  .then((user) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
