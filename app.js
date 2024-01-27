const express = require("express");
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

app.get("/pandorasbox", (req, res) => {
  res.render("pandorasbox", { title: "Pandora's Box" });
});
