const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || "3000";

app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/greet", (req, res) => {
  const cur_year = new Date().getFullYear();
  const user_dob = parseInt(req.query.year);
  const age = cur_year - user_dob;
  res.send(
    `Hello, ${req.query.name}!<br>You are ${age - 1} or ${age} years old.`
  );
});

app.get("/math/:num1/:op/:num2", (req, res) => {
  const num1 = parseInt(req.params.num1);
  const op = req.params.op;
  const num2 = parseInt(req.params.num2);

  let result;

  switch (op) {
    case "plus":
      result = num1 + num2;
      break;
    case "minus":
      result = num1 - num2;
      break;
    case "times":
      result = num1 * num2;
      break;
    case "dividedby":
      result = num1 / num2;
      break;
    case "tothepowerof":
      result = num1 ** num2;
      break;
    default:
      result = "Incorrect operator";
  }

  res.render("math", { result });
});

const facts = require("./facts.json");

app.get("/pandorasbox", (req, res) => {
  const mode = Math.floor(Math.random() * 3);
  let message;

  switch (mode) {
    case 0:
      const index = Math.floor(Math.random() * facts.length);
      message = facts[index]["fact"];
      break;
    case 1:
      const images_path = path.join("public", "images");
      const images = fs.readdirSync(images_path);
      const img_count = images.length;
      const img_index = Math.floor(Math.random() * img_count);
      const img_name = images[img_index];
      message = `${img_name}`;
  }
  res.render("pandorasbox", { title: "Pandora's Box", message, mode });
});
