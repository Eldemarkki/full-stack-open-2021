import React from 'react'

const Total = (props) => {
    const exerciseCount = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;

    return (
        <p>
            Number of exercises {exerciseCount}
        </p>
    )
}

export default Total