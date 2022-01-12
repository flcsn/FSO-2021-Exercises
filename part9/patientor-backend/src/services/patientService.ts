import { PatientWithoutSSN, PatientWithSSN } from "../types";
import patientsData from "../data/patients";

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

export default {
  getPatientsSensitive,
  getPatientsNonSensitive
}