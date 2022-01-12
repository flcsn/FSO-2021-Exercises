"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientData = void 0;
const types_1 = require("../types");
const toNewPatientData = (object) => {
    const newPatientData = {
        name: parseName(object.name),
        dateOfBirth: parseBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
    return newPatientData;
};
exports.toNewPatientData = toNewPatientData;
const parseName = (name) => {
    if (!name || !isString(name))
        throw new Error(`Missing or malformatted name: ${name}`);
    return name;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseBirth = (birth) => {
    if (!birth || !isString(birth) || !isDate(birth))
        throw new Error(`Missing or malformatted birth date; ${birth}`);
    return birth;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn))
        throw new Error(`Missing or malformatted ssn: ${ssn}`);
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender))
        throw new Error(`Missing or malformatted gender: ${gender}`);
    return gender;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation))
        throw new Error(`Missing or malformatted occupation: ${occupation}`);
    return occupation;
};
