const express = require("express");
const app = express();
const postRoute = require("./controllers/postRoutes");
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/", postRoute);

app.listen(port, () => {
  console.log(`server starting on port ${port}`);
});

module.exports = app;
