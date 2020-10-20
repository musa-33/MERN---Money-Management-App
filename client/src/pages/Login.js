import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
    }

    render() {
        const { name, email, password, confirmPassword, error} = this.state
        return (
            <div className='row'>
                <div className='col-md-6 offset-md-2'>
                    <h1 className='text-center display-4'>Login Here</h1>
                    <form onSubmit={this.submitHandler}>
                        
                        <div className='form-group'>
                            <label htmlFor='email'>Email: </label>
                            <input 
                                type='email'
                                className='form-control'
                                placeholder='Enter your email'
                                name='email'
                                id='email'
                                value={email}
                                onChange={this.changeHandler}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password: </label>
                            <input 
                                type='password'
                                className='form-control'
                                placeholder='Enter your password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={this.changeHandler}
                            />
                        </div>

                        
                        <Link to='/register'>Don't have an account? Register Here</Link>
                        <button className='btn btn-primary my-2 d-block'>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}
 export default Register