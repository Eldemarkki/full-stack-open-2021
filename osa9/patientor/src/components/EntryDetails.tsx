import React from "react";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Entry, EntryType } from "../types";

export interface EntryDetailsProps {
  entry: Entry
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const EntryDetails = (props: EntryDetailsProps) => {
  const entry = props.entry;
  const [{ diagnoses }] = useStateValue();

  switch (entry.type) {
    case EntryType.Hospital:
      return <List.Item>
        <List.Icon name="hospital" size="big" />
        <List.Content>
          <List.Header>{entry.date}</List.Header>
          <List.Description>{entry.description}</List.Description>
          {entry.diagnosisCodes &&
            <ul>
              {entry.diagnosisCodes.map(code => {
                const name = diagnoses[code];
                if (!name) {
                  return <li key={code}>{code}</li>;
                }
                else {
                  return <li key={code}>{code}: {diagnoses[code].name}</li>;
                }
              })}
            </ul>
          }
        </List.Content>
      </List.Item>;
    case EntryType.HealthCheck:
      return <List.Item>
        <List.Icon name="doctor" size="big" />
        <List.Content>
          <List.Header>{entry.date}</List.Header>
          <List.Description>{entry.description}</List.Description>
          <p>Health check rating: {entry.healthCheckRating}</p>
          {entry.diagnosisCodes &&
            <ul>
              {entry.diagnosisCodes.map(code => {
                const name = diagnoses[code];
                if (!name) {
                  return <li key={code}>{code}</li>;
                }
                else {
                  return <li key={code}>{code}: {diagnoses[code].name}</li>;
                }
              })}
            </ul>
          }
        </List.Content>
      </List.Item>;
    case EntryType.OccupationalHealthcare:
      return <List.Item>
        <List.Icon name="building" size="big" />
        <List.Content>
          <List.Header>{entry.date}</List.Header>
          <List.Description>{entry.description}</List.Description>
          <p>Employer: {entry.employerName}</p>
          {entry.diagnosisCodes &&
            <ul>
              {entry.diagnosisCodes.map(code => {
                const name = diagnoses[code];
                if (!name) {
                  return <li key={code}>{code}</li>;
                }
                else {
                  return <li key={code}>{code}: {diagnoses[code].name}</li>;
                }
              })}
            </ul>
          }
        </List.Content>
      </List.Item>;
    default:
      return assertNever(entry);
  }
};