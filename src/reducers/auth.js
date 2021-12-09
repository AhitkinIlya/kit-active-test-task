import {
  LOGIN_SUCCESS,
  LOGOUT,
  APP_LOAD,
  APP_LOADFAILED
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false
}

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action
  
    switch(type) {
      case LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token)
        return {
          ...state,
          ...payload,
          isAuthenticated: true
        }
        case APP_LOAD:
          return {
            ...state,
            isAuthenticated: true
        }  

      case LOGOUT:
      case APP_LOADFAILED:
        localStorage.removeItem('token')
        return {
          ...state,
          token: null,
          isAuthenticated: false,
        }
      default:
        return state
    }
  }