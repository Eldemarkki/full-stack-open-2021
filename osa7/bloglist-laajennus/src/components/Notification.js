import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector(state => state.notification)
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