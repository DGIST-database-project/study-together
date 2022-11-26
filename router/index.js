const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
// const signUp = require("./signUp/index");

router.use(express.static(path.join(__dirname, "../build")));

// router.get("/", (req, res) => {
//   //   res.sendFile(path.join("/index.html"));
//   //   res.send("hi");
//   res.sendFile(path.join(__dirname, "../build/index.html"));
//   //   res.sendFile(path.join(__dirname, "../public/index.html"));
//   //   res.sendFile("index.js");
// });

module.exports = router;
