const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

mongoose
  .connect(
    "mongodb+srv://vadityaraj67:Q6GjYqSO2UFD6xhm@cluster0.yvftnur.mongodb.net/paytm_proj"
  )
  .then(() => app.listen(3000));
