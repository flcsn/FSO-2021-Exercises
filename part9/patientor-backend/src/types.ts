export type Diagnose = {
  code: string,
  name: string,
  latin?: string
}

export type PatientWithSSN = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type PatientWithoutSSN = Omit<PatientWithSSN, 'ssn'>

export type NewPatientData = Omit<PatientWithSSN, 'id'>

export enum Gender {
  Male = 'male',
  Female = 'female',
  Others = 'others'
}