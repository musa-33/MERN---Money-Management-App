import axios from 'axios'

import {
    SET_USER,
    USER_ERROR
} from './registerTypes'

export const register = (user, history) =>{
    return (dispatch) => {
        axios.post('/api/user/register', user)
        .then( res =>{
            dispatch({
                type: USER_ERROR,
                payload: {
                    error: {}
                }
            })
            console.log(res)
            history.push('/login')
        })
        .catch(error => {
            dispatch({
                type: USER_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
    }
}

