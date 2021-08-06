import { BaseEntry, EntryType, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewPatient, OccupationalHealthCareEntry } from "../types";
import { v1 as uuid } from "uuid";
import { getDiagnoses } from "../services/diagnosisService";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Invalid or missing string: " + name);
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Invalid or missing date: " + date);
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Invalid or missing gender: " + gender);
  }

  return gender;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (healthCheckRating === undefined || healthCheckRating === null || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Invalid or missing health check rating: " + healthCheckRating);
  }

  return healthCheckRating;
};

const parseSickLeave = (startDate: unknown, endDate: unknown) => {
  if (!startDate || !endDate) {
    return undefined;
  }

  return {
    startDate: parseDate(startDate),
    endDate: parseDate(endDate)
  };
};

const parseDiagnosisCodes = (codes: unknown[]) => {
  const diagnoses = getDiagnoses();
  if (codes.every(code => parseString(code) && diagnoses.some(diagnosis => diagnosis.code === code))) {
    // all codes match some diagnosis
    return codes.map(code => code as string);
  }

  // get the codes that don't match any diagnosis
  const invalidCodes = codes.filter(code => !diagnoses.some(d => d.code === code));
  throw new Error(`Invalid codes: [${invalidCodes.join(", ")}]`);
};

type NewPatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    ssn: parseString(ssn),
    entries: []
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (type: EntryType, body: any) => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    date: parseDate(body.date),
    description: parseString(body.description),
    specialist: parseString(body.specialist),
    diagnosisCodes: parseDiagnosisCodes(body.diagnosisCodes),
  };

  switch (type) {
    case EntryType.HealthCheck:
      const newHealthCheckEntry: HealthCheckEntry = {
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(body.healthCheckRating),
        type: EntryType.HealthCheck
      };
      return newHealthCheckEntry;
    case EntryType.OccupationalHealthcare:
      const newOccupationalHealthCareEntry: OccupationalHealthCareEntry = {
        ...baseEntry,
        employerName: parseString(body.employerName),
        sickLeave: parseSickLeave(body.startDate, body.endDate),
        type: EntryType.OccupationalHealthcare,
      };
      return newOccupationalHealthCareEntry;
    case EntryType.Hospital:
      const newHospitalEntry: HospitalEntry = {
        ...baseEntry,
        type: EntryType.Hospital,
        discharge: {
          date: parseDate(body.dischargeDate),
          criteria: parseString(body.dischargeCriteria)
        }
      };
      return newHospitalEntry;
    default:
      assertNever(type);
  }

  throw new Error("Invalid entry type " + type);
};
