import { Diagnose } from "../types";
import DiagnosesData from '../data/diagnoses';

const getDiagnoses = (): Array<Diagnose> => {
  return DiagnosesData;
}

export default {
  getDiagnoses
}

