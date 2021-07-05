export const setNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    notification
  }
}

export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification
    default:
      return state
  }
}