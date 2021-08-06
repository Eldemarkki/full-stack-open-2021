import React from "react";
import { CoursePart } from "../App";

export interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const Part = (props: PartProps) => {
  const part = props.coursePart;
  switch (part.type) {
    case "groupProject":
      return <div>
        <p><strong>{part.name} {part.exerciseCount}</strong></p>
        <p>Group exercises: {part.groupProjectCount}</p>
      </div>;
    case "normal":
      return <div>
        <p><strong>{part.name} {part.exerciseCount}</strong></p>
        <p><i>{part.description}</i></p>
      </div>;
    case "submission":
      return <div>
        <p><strong>{part.name} {part.exerciseCount}</strong></p>
        <p>Submit exercises to {part.exerciseSubmissionLink}</p>
      </div>;
    case "special":
      return <div>
        <strong>{part.name} {part.exerciseCount}</strong>
        <p><i>{part.description}</i></p>
        <p>Required skills: {part.requirements.join(", ")}</p>
      </div>;
    default:
      assertNever(part);
      return null;
  }
};