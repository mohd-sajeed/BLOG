const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { result } = require("lodash");
const blogRoutes=require('./routes/blogRoutes.js');

//express app
const app = express();

// connect mongodb
const dbURI =
  "mongodb+srv://netninja:D3O0EImZPX86ZRbI@atlascluster.i8sr5zy.mongodb.net/nodetuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});


//blog routes
app.use("/blogs",blogRoutes)

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// k3gDhJ8TzpZvmvJr
