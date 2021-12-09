import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { filesReducer } from './files'
import { alertReducer } from './alert'

export default combineReducers({
    auth: authReducer,
    files: filesReducer,
    alert: alertReducer
})