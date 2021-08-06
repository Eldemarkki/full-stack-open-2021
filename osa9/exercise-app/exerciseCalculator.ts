interface Rating {
  rating: number;
  ratingDescription: string;
}

export interface ExerciseCalculatorParameters {
  daily_exercises: number[];
  target: number;
}

const parseExerciseArguments = (providedArguments: string[]): ExerciseCalculatorParameters => {
  const args = providedArguments.slice(2); // remove the first two parameters
  if(args.length === 0) throw new Error("Too few arguments");

  const daily_exercises = args.slice(0, args.length - 1);
  const target = args[args.length - 1];

  if(daily_exercises.some(time => isNaN(Number(time)))) throw new Error("Not all of the times were numbers");
  if(isNaN(Number(target))) throw new Error("The target was not a number");

  return {
    daily_exercises: daily_exercises.map(time => Number(time)),
    target: Number(target)
  };
};

const determineRating = (average: number, target: number): Rating => {
  if (average >= target) {
    return {
      rating: 3,
      ratingDescription: "Great job, you passed your target!"
    };
  }
  else if (average >= target * 0.6) {
    return {
      rating: 2,
      ratingDescription: "You almost hit your target!"
    };
  }
  else {
    return {
      rating: 1,
      ratingDescription: "You didn't hit your target, try a bit harder next time. You can do it!"
    };
  }
};

export const calculateExercises = (times: number[], target: number) => {
  const periodLength = times.length;
  const trainingDays = times.filter(time => time > 0).length;
  const average = times.reduce((prev, curr) => prev + curr, 0) / times.length;
  const success = average >= target;
  const { rating, ratingDescription } = determineRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const {daily_exercises, target} = parseExerciseArguments(process.argv);
  console.log(calculateExercises(daily_exercises, target));
}
catch (e) {
  if (e instanceof Error) {
    console.log("An error occured:", e.message);
  }
  else {
    throw e;
  }
}