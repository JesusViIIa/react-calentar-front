import { combineReducers } from "redux"
import { calendarReducer } from "./calendarReducer"
import { uiReducer } from "./uiReducer"
import { authreducer } from './authreducer';

export const rootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authreducer
})