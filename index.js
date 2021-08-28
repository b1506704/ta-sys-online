import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1377;
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const server = app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
);

app.use(express.static("./client/dist/ta-sys-online"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "./client/dist/ta-sys-online" });
});
