export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
  }
}

export const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.user
    default:
      return state
  }
}