const path = require("path");
const express = require("express");
const app = express();
const data = require("./data.json");
const router = express.Router();

app.use(express.static(path.join(__dirname, "public")));

router.get("/", function (req, res) {
  console.log(data);
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

router.get("/products", function (req, res) {
  res.render("pages/products.ejs", {
    productid1: data[0].id,
    productname1: data[0].productname,
    productid2: data[1].id,
    productname2: data[1].productname,
  });
  //res.send(data);
});

router.get("/newproduct", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/newproduct.html"));
  res.render("pages/newproducts.ejs");
});

app.get("/getproducts", (req, res) => {
  const productsString = fs.readFileSync("data.json").toString();
  const productArray = productsString.split("\n");
  res.send(productArray);
});

app.post("/productspage", (req, res) => {
  fs.appendFile("data.json", "\n" + req.query.fname, function (err) {
    res.send("Saved!");
  });
});

//add the router
app.use("/", router);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/NotFound.html"));
});

app.listen(8000, () => {
  console.log("Application listening on port 8000!");
});
