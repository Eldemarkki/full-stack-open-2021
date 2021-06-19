import React from "react"

const Notification = ({ message }) => {
  if (message === null)
    return null
  return (<p style={{
    backgroundColor: "lightgray",
    color: "blue",
    padding: "10px",
    border: "solid blue 4px",
    borderRadius: "5px",
  }}>{message}</p>)
}

export default Notification