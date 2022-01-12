"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const patientService_1 = __importDefault(require("../services/patientService"));
const helpers_1 = require("../utils/helpers");
const patientsRouter = express.Router();
patientsRouter.get('/', (_req, res) => {
    const patients = patientService_1.default.getPatientsNonSensitive();
    return res.json(patients);
});
patientsRouter.post('/', (req, res) => {
    const newPatientData = (0, helpers_1.toNewPatientData)(req.body);
    const newPatient = patientService_1.default.addPatient(newPatientData);
    return res.json(newPatient);
});
exports.default = patientsRouter;
