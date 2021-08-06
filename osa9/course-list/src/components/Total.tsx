import React from "react";
import { CoursePartBase } from "../App";

export interface TotalProps {
  courseParts: CoursePartBase[];
}

export const Total = (props: TotalProps) => {
  return <p>
    Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>;
};