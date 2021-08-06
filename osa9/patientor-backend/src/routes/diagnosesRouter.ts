import express from "express";
import { getDiagnoses } from "../services/diagnosisService";
const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  const diagnoses = getDiagnoses();
  res.json(diagnoses);
});

export default diagnosesRouter;