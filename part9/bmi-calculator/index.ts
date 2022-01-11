import express = require('express');
import calculateBmi = require('./bmiCalculator');
import calculateExercises = require('./exerciseCalculator');
const app = express();

const allElementsAreInt = (array: Array<any>): boolean => {
  const arrayOfNumbers = array.filter(e => typeof(e) === 'number');
  console.log(arrayOfNumbers, array);
  return arrayOfNumbers.length === array.length;
}

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || ! weight) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }
  const bmi = calculateBmi(height, weight);

  return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({
      error: 'parameters missing'
    })
  }

  const dailyExercises = req.body.daily_exercises;
  const target = req.body.target;

  if (!Array.isArray(dailyExercises) || !allElementsAreInt(dailyExercises) || !Number(target)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    })
  }

  return res.json(calculateExercises(dailyExercises, target));
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});