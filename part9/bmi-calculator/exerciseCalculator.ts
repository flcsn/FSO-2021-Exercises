interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exerciseHours: Array<number>, target: number): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(h => h > 0).length;
  const trainingHours = exerciseHours.reduce((initial: number, current:number) => initial + current);
  const averageTrainingHours = trainingHours / periodLength;

  let success; 
  let rating; 
  let ratingDescription;

  if (averageTrainingHours >= target) {
    success = true;
    rating = 3;
    ratingDescription = 'great';
  } else if (averageTrainingHours < target && averageTrainingHours > target * 0.5 ) {
    success = false;
    rating = 2;
    ratingDescription = 'not bad';
  } else {
    success = false;
    rating = 1;
    ratingDescription = 'bad';
  }

  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average: averageTrainingHours
  };

  return result;
};
/*

const exerciseHours = JSON.parse(process.argv[3]) as Array<number>;
const target = Number(process.argv[2]);

console.log(calculateExercises(exerciseHours, target));
*/
export = calculateExercises;
