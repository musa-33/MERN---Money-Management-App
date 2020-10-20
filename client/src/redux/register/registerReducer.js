import {
    SET_USER,
    USER_ERROR
} from './registerTypes'


const initialState = {
    isAuthenticated: false,
    users: {},
    error: {}
}

const registerReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER: {
            return{
                users: action.payload.user,
                isAuthenticated: Object.keys(action.payload.user).length === 0,
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


export default registerReducer