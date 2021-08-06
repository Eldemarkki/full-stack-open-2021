import { patients } from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

export const getPatients = () => patients;

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return getPatients().map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

export const getPatient = (id: string) => {
  return getPatients().find(p => p.id === id);
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid()
  };

  return newPatient;
};