import {
    SET_USER,
    USER_ERROR
} from './authTypes'


const initialState = {
    isAuthenticated: false,
    user: {},
    error: {}
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER: {
            return{
                user: action.payload.user,
                isAuthenticated: Object.keys(action.payload.user).length != 0,
                error: {}
            }
        }

        case USER_ERROR: {
            return{
                ...state,
                error: action.payload.error
            }
        }

        default: return state
    }
}


export default authReducer