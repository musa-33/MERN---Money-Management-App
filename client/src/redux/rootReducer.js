import { combineReducers} from 'redux'
import registerReducer from './register/registerReducer'

const rootReducer = combineReducers({
    register: registerReducer
})

export default rootReducer