import express = require('express');
import cors = require('cors');
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();

app.use(cors())
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  return res.json('pong');
})

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})