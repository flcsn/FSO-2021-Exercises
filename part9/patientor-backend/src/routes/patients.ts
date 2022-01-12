import express = require('express');
import patientService from '../services/patientService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  const patients = patientService.getPatientsNonSensitive();
  return res.json(patients);
})

export default patientsRouter;