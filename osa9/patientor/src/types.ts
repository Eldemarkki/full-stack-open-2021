export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum EntryType {
  "Hospital",
  "OccupationalHealthcare",
  "HealthCheck"
}

export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, "id">;
export interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export type NewHospitalEntry = Omit<HospitalEntry, "id">;
export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  }
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;
