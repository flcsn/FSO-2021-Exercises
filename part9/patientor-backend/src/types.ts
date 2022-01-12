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
  gender: string,
  occupation: string
}

export type PatientWithoutSSN = Omit<PatientWithSSN, 'ssn'>