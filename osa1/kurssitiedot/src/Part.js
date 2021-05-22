import React from 'react'

const Part = (props) => {
    return (
        <p>
            {props.partName} {props.exerciseCount}
        </p>
    )
}

export default Part