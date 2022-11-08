const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());

//Course Data
const courses = require("./service.json");

// API Loading
app.get("/service", (req, res) => {
  res.send(courses);
});

app.get("/service/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const catagoryService = courses.find((item) => item._id == id);
  // console.log(catagory_news);
  res.send(catagoryService);
});


app.get("/service/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  console.log(courses);
  const selectedService = courses.find((item) => item._id == id);
  console.log(selectedService);
  res.send(selectedService);
});

// Initial message
app.get("/", (req, res) => {
  res.send("Learn With Fun!");
});

app.listen(port, () => {
  console.log("Learn with Fun site running on port:", port);
});
