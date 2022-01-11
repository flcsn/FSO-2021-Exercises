const calculateBmi = (heightInCm: number, weightInKg: number) => {
  const bmi = weightInKg / (heightInCm/100)**2;

  if (bmi < 18.5)
    return 'Underweight (not healthy weight)';
  else if (bmi >= 18.5 && bmi < 25)
    return 'Normal (healthy weight)';
  else if (bmi >= 25 && bmi < 30)
    return 'Overweight (not healthy weight)';
  else
    return 'Obese (not healthy weight)'
}

const heightInCm = Number(process.argv[2]);
const weightInKg = Number(process.argv[3]);

console.log(calculateBmi(heightInCm, weightInKg));

export = calculateBmi;