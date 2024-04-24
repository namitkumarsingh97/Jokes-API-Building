const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/routes");

const app = express();

const PORT = 8001;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server Started...");
});

// Mounting the joke routes
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
