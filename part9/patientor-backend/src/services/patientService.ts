import { NewPatientData, PatientWithoutSSN, PatientWithSSN } from "../types";
import patientsData from "../data/patients";
import { v4 as uuid } from 'uuid';

const getPatientsSensitive = (): Array<PatientWithSSN> => {
  return patientsData;
}

const getPatientsNonSensitive = (): Array<PatientWithoutSSN> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const addPatient = (data: NewPatientData): PatientWithSSN => {
  const newPatient = {
    id: uuid(),
    ...data
  }

  patientsData.push(newPatient);
  return newPatient;
}

export default {
  getPatientsSensitive,
  getPatientsNonSensitive,
  addPatient
}