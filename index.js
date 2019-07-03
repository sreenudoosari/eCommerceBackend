const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");

//Created a custom middlewares
const auth = require("./middlewares/auth");
const error = require("./middlewares/error");
const logger = require("./middlewares/logger")(__filename);
require("./startup/prod")(app);

//configuration
const config = require("config");
const morgan = require("morgan");

//Routers is added
const productrouter = require("./routes/products");
const categoryrouter = require("./routes/categories");
const orderrouter = require("./routes/orders");
const usersrouter = require("./routes/users");
const employerrouter = require("./routes/employers");
const homerouter = require("./routes/home");
const authrouter = require("./routes/auth");

//Connecting to th Database
mongoose
  .connect(config.get("db.host"))
  .then(() =>
    console.log(
      `Successfully connected to mongodb host : ${config.get("db.host")}`
    )
  )
  .catch(err => console.log("Failed to connect to db....", err));

const corsOptions = {
  exposedHeaders: "x-auth-token"
};
app.use(cors(corsOptions));

//add a middle ware to convert your json bodycle
app.use(express.json());
//app.use(auth);
app.use(bodyparser.json());

//configuration the files
app.use("/api", productrouter);
app.use("/api/orders", orderrouter);
app.use("/api/categories", categoryrouter);
app.use("/api/users", usersrouter);
app.use("/api/employers", employerrouter);
app.use("/api/home", homerouter);
app.use("/api/auth", authrouter);

//views folder
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));

process.on("uncaughtException", ex => {
  logger.error("uncaughtException occured :", ex);
});

process.on("unhandledRejection", ex => {
  logger.error("unhandledRejection occured :", ex);
});

//third party middlewares
app.use(morgan("tiny"));
app.use(error);

app.get("/home", (req, res) => {
  res.render("index", {
    appTitle: "Ecommerce BackEnd Project",
    message: "Welcome to ECommerce Web Site"
  });
});
//posting data using index.pug
app.post("/", function(req, res) {
  console.log(req.body);
  res.send("Received the request");
});
//to change enivorment set NODE_ENV=production or development or stagging or it takes default.json
console.log("app name: ", config.get("app.name"));
console.log("mail server host:", config.get("mail.host"));

const port = process.env.ECBPORT || 3900;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
module.exports = server;
