import React from 'react'

const Header = ({courseName}) => <h2>{courseName}</h2>
const Content = ({ parts }) => parts.map(part => <Part key={part.name} partName={part.name} exerciseCount={part.exercises} />)
const Part = (props) => <p>{props.partName} {props.exerciseCount}</p>
const Total = ({parts}) => {
    const total = parts.reduce((acc, val) => acc + val.exercises, 0)
    return <p><strong>Total of {total} exercises</strong></p>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course