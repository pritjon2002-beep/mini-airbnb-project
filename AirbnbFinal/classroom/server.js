const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretcode"));

//cookies route
app.get("/getcookies", async (req, res) => {
  res.cookie("greet", "Namaste");
  res.cookie("madeIn", "Nepal");
  res.send("we send a cookies");
  console.dir(req.cookies);
});

app.get("/greet", (req, res) => {
  let { name = "anoymous" } = req.cookies;
  res.send(`Hi,${name}`);
});

//signed cookies
app.get("/getsignedcookies", (req, res) => {
  res.cookie("countryName", "India", { signed: true });
  res.send("signed cookies");
});

//verify signed cookies
app.get("/verify", (req, res) => {
  console.log(req.signedCookies); // print signed cookies only
  res.send("verified");
});

//home route
app.get("/", (req, res) => {
  res.send("expressRouter");
});

//using routes/user.js file
app.use("/users", users);

//using routes/post.js file
app.use("/posts", posts);

app.listen(8080, () => {
  console.log("sever is running on port 8080");
});
