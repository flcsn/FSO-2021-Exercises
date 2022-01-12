import express = require('express');
import patientService from '../services/patientService';
import { toNewPatientData } from '../utils/helpers'

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  const patients = patientService.getPatientsNonSensitive();
  return res.json(patients);
})

patientsRouter.post('/', (req, res) => {
  const newPatientData = toNewPatientData(req.body);
  const newPatient = patientService.addPatient(newPatientData);
  return res.json(newPatient);
})

export default patientsRouter;