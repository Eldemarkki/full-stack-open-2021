import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Entry, EntryType, HealthCheckRating, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthCareEntry } from "../types";

interface FormValues {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: never[];
  type: EntryType;
  employerName: string;
  startDate: string;
  endDate: string;
  dischargeDate: string;
  dischargeCriteria: string;
  healthCheckRating: HealthCheckRating;
}

export const AddEntryForm = () => {
  const [{ diagnoses, patients }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();
  const patient = patients[id];
  if (!patient) {
    return <div>
      No patient found with id {id}
    </div>;
  }

  const getSpecificFieldsForType = (type: EntryType) => {
    switch (type) {
      case EntryType.Hospital:
        return <div>
          <Field label="Discharge date" placeholder="Discharge date" name="dischargeDate" component={TextField} />
          <Field label="Discharge criteria" placeholder="Discharge criteria" name="dischargeCriteria" component={TextField} />
        </div>;
      case EntryType.OccupationalHealthcare:
        return <div>
          <Field label="Employer name" placeholder="Employer name" name="employerName" component={TextField} />
          <Field label="Sick leave start date" placeholder="Sick leave start date" name="startDate" component={TextField} />
          <Field label="Sick leave end date" placeholder="Sick leave end date" name="endDate" component={TextField} />
        </div>;
      case EntryType.HealthCheck:
        return <div>
          <Field label="Health check rating" placeholder="Health check rating" name="healthCheckRating" min={0} max={3} component={NumberField} />
        </div>;
      default:
        return <div>
          Not supported
        </div>;
    }
  };

  const createEntry = (values: FormValues) => {
    switch (Number(values.type)) {
      case EntryType.Hospital:
        const newHospitalEntry: NewHospitalEntry = {
          ...values,
          type: EntryType.Hospital,
          discharge: {
            criteria: values.dischargeCriteria,
            date: values.dischargeDate
          }
        };
        return newHospitalEntry;
      case EntryType.OccupationalHealthcare:
        const newOccupationalHealthcareEntry: NewOccupationalHealthCareEntry = {
          ...values,
          type: EntryType.OccupationalHealthcare,
          sickLeave: {
            startDate: values.startDate,
            endDate: values.endDate
          },
          employerName: values.employerName
        };
        return newOccupationalHealthcareEntry;
      case EntryType.HealthCheck:
        const newHealthCheckEntry: NewHealthCheckEntry = {
          ...values,
          type: EntryType.HealthCheck,
          healthCheckRating: values.healthCheckRating,
        };
        return newHealthCheckEntry;
      default:
        break;
    }
  };

  const initialValues: FormValues = {
    description: "",
    date: (new Date).toISOString().split("T")[0],
    specialist: "",
    diagnosisCodes: [],
    type: EntryType.Hospital,
    employerName: "",
    startDate: "",
    endDate: "",
    dischargeDate: "",
    dischargeCriteria: "",
    healthCheckRating: HealthCheckRating.Healthy
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        const entry = createEntry(values);
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          entry
        );
        patient.entries = patient.entries.concat(newEntry);
        dispatch(updatePatient(patient));
      }}
      validate={values => {
        const requiredError = "Field is required";
        const invalidDateError = "Field must be a valid date";
        const errors: { [field: string]: string } = {};
        if (!values.date) errors.date = requiredError;
        else if (!Date.parse(values.date)) errors.date = invalidDateError;
        if (!values.description) errors.description = requiredError;
        if (!values.specialist) errors.specialist = requiredError;
        if (values.type === undefined || values.type === null) errors.type = requiredError;

        if (Number(values.type) === EntryType.Hospital) {
          if (!values.dischargeDate) errors.dischargeDate = requiredError;
          else if (!Date.parse(values.dischargeDate)) errors.dischargeDate = invalidDateError;
          if (!values.dischargeCriteria) errors.dischargeCriteria = requiredError;
        }
        else if (Number(values.type) === EntryType.OccupationalHealthcare) {
          if (!values.employerName) errors.employerName = requiredError;
          if (!values.startDate) errors.startDate = requiredError;
          else if (!Date.parse(values.startDate)) errors.startDate = invalidDateError;
          if (!values.endDate) errors.endDate = requiredError;
          else if (!Date.parse(values.endDate)) errors.endDate = invalidDateError;
        }
        else if (Number(values.type) === EntryType.HealthCheck) {
          if (values.healthCheckRating === undefined || values.healthCheckRating === null) errors.healthCheckRating = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, resetForm, values }) => {
        return (
          <Form className="form ui">
            <Field as="select" name="type">
              <option value={EntryType.Hospital}>Hospital</option>
              <option value={EntryType.OccupationalHealthcare}>Occupational healthcare</option>
              <option value={EntryType.HealthCheck}>Health check</option>
            </Field>
            <Field label="Date" placeholder="Date" name="date" component={TextField} />
            <Field label="Description" placeholder="Description" name="description" component={TextField} />
            <Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
            <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={Object.values(diagnoses)} />
            { /* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {getSpecificFieldsForType(Number((values as any).type || 0))}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={() => resetForm()} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};