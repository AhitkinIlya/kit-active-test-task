import {
    GET_FILES,
    DELETE_FILE,
    POST_FILES,
    DELETE_FILEPREVIEW,
    ADD_FILESPREVIEW,
    SET_CURRENTFILES,
    UPDATE_STATE
} from '../actions/types'

const initialState = {
    files: [],
    currentFiles: []
}

export const filesReducer = (state = initialState, action) => {
    const { type, payload } = action
  
    switch(type) {
        case GET_FILES:
            return {
            ...state,
            files: payload
            }
        case POST_FILES:
        case UPDATE_STATE:
            return {
            ...state,
            files: [],
            }
        case SET_CURRENTFILES:
            return {
                ...state,
                currentFiles: payload
            }
        case DELETE_FILE:
            return {
            ...state,
            files: state.files.filter(file => file.id !== payload),
            }
        case ADD_FILESPREVIEW:
            return {
                ...state,
                files: [...payload, ...state.files],
            }
        case DELETE_FILEPREVIEW:
            return {
                ...state,
                files: state.files.filter(file => file.lastModified !== payload)
            }
      default :
        return state
    }
  }