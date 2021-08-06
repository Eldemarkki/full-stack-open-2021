import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseCalculatorParameters } from "./exerciseCalculator";

const app = express();
app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).end("malformatted parameters");
  }
  else {
    const result = calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi: result
    });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseCalculatorParameters;
  if(!daily_exercises || !target){
    res.status(400).end("parameters missing");
  }
  if (daily_exercises.some(e => isNaN(e)) || isNaN(target)) {
    res.status(400).end("malformatted parameters");
  }
  else {
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});