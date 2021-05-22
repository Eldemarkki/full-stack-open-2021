import React from 'react'
import Part from './Part.js'

const Content = (props) => {
    return (
        <div>
            <Part partName={props.parts[0].name} exerciseCount={props.parts[0].exercises} />
            <Part partName={props.parts[1].name} exerciseCount={props.parts[1].exercises} />
            <Part partName={props.parts[2].name} exerciseCount={props.parts[2].exercises} />
        </div>
    )
}

export default Content