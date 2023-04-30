const db = require("./db.js");
const express = require("express");
const cors = require("cors");
const app = express();

const morgan = require("morgan");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const port = 4200;

app.get("/", (req, res) => {
  res.send("Welcome to Bd Geo Api!");
});

app.get("/divisions", (req, res) => {
  const divisions = [
    "dhaka",
    "chottogram",
    "sylhet",
    "rajshahi",
    "barishal",
    "khulna",
    "rangpur",
    "mymensingh",
  ];
  res.status(200).send(divisions);
});

app.get("/divisions/:divisionName", (req, res) => {
  const { divisionName } = req.params;
  const { district } = req.query;

  try {
    const divisionData = db.find(
      (item) => item?.division.toLowerCase() === divisionName.toLowerCase()
    );

    if (!divisionData) {
      throw new Error("Division not found");
    }

    if (!district) {
      res.status(200).send(divisionData);
      return;
    }

    const districtData = divisionData.district.find(
      (item) => item.district.toLowerCase() === district.toLowerCase()
    );

    if (!districtData) {
      throw new Error("District not found");
    }

    res.status(200).send(districtData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`);
});
