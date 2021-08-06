import express from "express";
import diagnosesRouter from "./src/routes/diagnosesRouter";
import patientsRouter from "./src/routes/patientsRouter";
import cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("Pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});