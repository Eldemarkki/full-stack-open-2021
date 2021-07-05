import { createStore } from "redux"
import { combineReducers } from "redux"
import { blogsReducer } from "./reducers/blogsReducer"
import { currentUserReducer } from "./reducers/currentUserReducer"
import { notificationReducer } from "./reducers/notificationReducer"

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  currentUser: currentUserReducer
})

const store = createStore(reducer)

export default store