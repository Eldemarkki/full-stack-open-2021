import React from "react";
import { CoursePart } from "../App";
import { Part } from "./Part";

export interface ContentProps {
  courseParts: CoursePart[]
}

export const Content = (props: ContentProps) => {
  return <div>
    {props.courseParts.map(part => (
      <Part key={part.name} coursePart={part}/>
    ))}
  </div>;
};