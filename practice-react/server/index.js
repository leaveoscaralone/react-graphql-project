const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./router");
const db = require("./models");
const PORT = 3005;

app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  try {
    await db;
    app.listen(PORT, () => {
      console.log("connecting to port " + PORT);
    });
  } catch (err) {
    console.log(err);
  }
})();
