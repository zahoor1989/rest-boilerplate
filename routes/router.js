const express = require("express");
const router = express.Router();

// add single router files
const routeFiles = ["partners"];
routeFiles.forEach((route) => {
  let routeFile = require(`./${route}.js`);

  try {
    router.use(`/${route}`, routeFile);
  } catch (err) {
    console.log(`\u001b[31m[ERR] Router file ${routeFile} does not exists.`);
  }
});

module.exports = router;
