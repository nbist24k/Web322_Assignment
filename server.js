//require the express module
const express = require("express");

//get the app object from express
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

//add a route for the root URL
app.get("/", (req, res) => {
  res.send("Nirajan Bist - 157716226");
});

//run the web server
app.listen(HTTP_PORT, () => {
  console.log("Server is running on http://localhost:" + HTTP_PORT);
});
