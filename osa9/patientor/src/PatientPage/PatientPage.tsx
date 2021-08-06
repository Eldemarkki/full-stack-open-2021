import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon, List } from 'semantic-ui-react';
import { EntryDetails } from '../components/EntryDetails';
import { AddEntryForm } from '../components/AddEntryForm';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Gender, Patient } from '../types';

export const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    if (patients[id] && patients[id].occupation && patients[id].ssn) {
      setPatient(patients[id]);
    }
    else {
      const url = apiBaseUrl + "/patients/" + id;
      axios.get<Patient>(url).then(p => {
        setPatient(p.data);
        dispatch(updatePatient(p.data));
      }).catch(() => {
        setError("No patient found");
      });
    }
  }, [id]);

  if (error) return <p>Error: {error}</p>;

  if (!id) return null;
  if (!patient) return null;

  let genderIcon = "";
  switch (patient.gender) {
    case Gender.Female:
      genderIcon = "venus";
      break;
    case Gender.Male:
      genderIcon = "mars";
      break;
    default:
      break;
  }

  return (
    <div>
      <h2>{patient.name} <Icon className={genderIcon} /></h2>
      <p>ssn: {patient.ssn || "Unknown"}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <h4>Add new entry</h4>
      <AddEntryForm />
      <List divided relaxed>
      {
        patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)
      }
      </List>
    </div>
  );
};
