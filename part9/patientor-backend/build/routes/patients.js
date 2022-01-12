"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const patientService_1 = __importDefault(require("../services/patientService"));
const patientsRouter = express.Router();
patientsRouter.get('/', (_req, res) => {
    const patients = patientService_1.default.getPatientsNonSensitive();
    return res.json(patients);
});
exports.default = patientsRouter;
