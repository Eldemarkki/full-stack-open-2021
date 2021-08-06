interface BmiCalculationParameters {
  heightCm: number;
  weightKg: number
}

const parseBmiArguments = (args: string[]): BmiCalculationParameters => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightCm: Number(args[2]),
      weightKg: Number(args[3])
    };
  }
  else {
    throw new Error("Provided values were not numbers");
  }
};

export const calculateBmi = (heightCm: number, weightKg: number) => {
  if (heightCm === 0) throw new Error("Can not divide by zero");

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return "Underweight";
  }
  else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  }
  else {
    return "Overweight";
  }
};

try {
  const { heightCm, weightKg } = parseBmiArguments(process.argv);
  console.log(calculateBmi(heightCm, weightKg));
}
catch (e) {
  if (e instanceof Error) {
    console.log("An error occured:", e.message);
  }
  else {
    throw e;
  }
}