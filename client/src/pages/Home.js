import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>This is home page</h1>
                {this.props.isAuthenticated ?
                    <button 
                        className='btn btn-danger'
                        onClick={()=>this.props.logout(this.props.history)} 
                        >Logout</button>:
                    <Link to='/login'><button className='btn btn-primary' >Login</button></Link>    
                }
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        logout: history => dispatch(logout(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home)