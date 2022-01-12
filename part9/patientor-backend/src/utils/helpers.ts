import { Gender, NewPatientData } from "../types";

export const toNewPatientData = (object: any): NewPatientData => {
  const newPatientData: NewPatientData = {
    name: parseName(object.name),
    dateOfBirth: parseBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  }
  
  return newPatientData;
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name))
    throw new Error(`Missing or malformatted name: ${name}`);
  
    return name;
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseBirth = (birth: unknown): string => {
  if (!birth || !isString(birth) || !isDate(birth))
    throw new Error(`Missing or malformatted birth date; ${birth}`)

  return birth;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn))
    throw new Error(`Missing or malformatted ssn: ${ssn}`)

  return ssn;
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender))
    throw new Error(`Missing or malformatted gender: ${gender}`)

  return gender;
}

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error(`Missing or malformatted occupation: ${occupation}`)

  return occupation;
}


