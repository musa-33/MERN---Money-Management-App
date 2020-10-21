import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../redux'

class Register extends Component {

    state = {
        email: '',
        password: '',
        error: []
    }

    changeHandler = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event =>{
        event.preventDefault()
        const { email, password } = this.state
        this.props.login({ email, password }, this.props.history)
    }

    render() {
        const { email, password} = this.state
        return (
            <div className='row'>
                <div className='col-md-6 offset-md-2'>
                    <h1 className='text-center display-4'>Login Here</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className='form-group'>
                            <label htmlFor='email'>Email: </label>
                            <input 
                                type='email'
                                className={this.props.error.email ? 'form-control is-invalid' : 'form-control'}
                                placeholder='Enter your email'
                                name='email'
                                id='email'
                                value={email}
                                onChange={this.changeHandler}
                            />
                            { this.props.error.email && <div className='invalid-feedback'>
                                {this.props.error.email}
                            </div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password: </label>
                            <input 
                                type='password'
                                className={this.props.error.password || this.props.error.message ? 'form-control is-invalid' : 'form-control'}
                                placeholder='Enter your password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={this.changeHandler}
                            />
                            { this.props.error.password || this.props.error.message && <div className='invalid-feedback'>
                                {this.props.error.password ? this.props.error.password : this.props.error.message}
                            </div>}
                        </div>
                        <Link to='/register'>Don't have an account? Register Here</Link>
                        <button className='btn btn-primary my-2 d-block'>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        login: (user, history) => dispatch(login(user, history))
    }
}

 export default connect(mapStateToProps, mapDispatchToProps) (Register)