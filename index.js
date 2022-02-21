const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// login api
app.use((req, res, next)=>{
  console.log(`${req.method}:: ${req.protocol}:://${req.hostname}:${process.env.PORT}${req.url}`);
  next();
});

// add router for all routes
const router = require("./routes/partners");
app.use("/api", router);

// handle unhandled 404 requests
app.use("/", (req, res) => {
  res.status(200).send({
    success:'Welcome to Nodejs project',
  });
});

// handle unhandled 404 requests
app.use("*", (req, res) => {
  res.status(404).send({
    error:`Route does not exists: ${req.baseUrl}`,
  });
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`\x1b[0m[LOG] Server running on port ${process.env.PORT}`)
);
