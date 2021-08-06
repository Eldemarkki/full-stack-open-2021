import express from "express";
import { addPatient, getNonSensitivePatients, getPatient } from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils/utils";
import { EntryType } from "../types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  const nonSensitivePatients = getNonSensitivePatients();
  res.json(nonSensitivePatients);
});

patientsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Missing id");
    return;
  }

  const patient = getPatient(id);
  if (patient) {
    res.json(patient);
    return;
  }

  res.status(404).send("No patient found with id '" + id + "'");
});

patientsRouter.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = addPatient(newPatient);
  res.json(addedPatient);
});

patientsRouter.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Missing id");
    return;
  }

  const patient = getPatient(id);
  if (!patient) {
    res.status(404).send(`No patient found with id '${id}'`);
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const type: EntryType = req.body.type;
  if (type === undefined || type === null || !Object.values(EntryType).includes(type)) throw new Error("Invalid or missing field 'type', " + type);

  const newEntry = toNewEntry(type, req.body);
  patient.entries = patient.entries.concat(newEntry);
  res.json(newEntry);
});

export default patientsRouter;