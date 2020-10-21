import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { SET_USER, USER_ERROR } from './authTypes'
import setAuthToken from '../../utils/setAuthToken'

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
            if(error.response && error.response.data){
                dispatch({
                    type: USER_ERROR,
                    payload: {
                        error: error.response.data
                    }
                })
            }
        })
    }
}

export const login = ( user, history) =>{
    return (dispatch) =>{
        axios.post('/api/user/login', user)
            .then(res =>{
                const token = res.data.token
                setAuthToken(token)
                localStorage.setItem('auth_token', token)
                const decoded = jwtDecode(token)
                
                dispatch({
                    type: SET_USER,
                    payload: {
                        user: decoded
                    }
                })
                history.push('/')
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

export const logout = history =>{
    localStorage.removeItem('auth_token')
    history.push('/login')
    return {
        type: SET_USER,
        payload: {
            user: {}
        }
    }
}

