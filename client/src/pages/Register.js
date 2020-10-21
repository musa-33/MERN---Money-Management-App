import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../redux'

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: []
    }

    // static getDerivedStateFromError(nextProps, prevProps){
    //     if(JSON.stringify(nextProps.register.error) != JSON.stringify(prevProps.error)){
    //         return{
    //             error: nextProps.register.error  
    //         }
    //     }

    //     return null
    // }

    changeHandler = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event =>{
        event.preventDefault()
        const { name, email, password, confirmPassword} = this.state
        this.props.register({ name, email, password, confirmPassword}, this.props.history)
    }

    render() {
        const { name, email, password, confirmPassword, error} = this.state
        
        return (
            <div className='row'>
                <div className='col-md-6 offset-md-2'>
                    <h1 className='text-center display-4'>Register Here</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className='form-group'>
                            <label htmlFor='name'>Name: </label>
                            <input 
                                type='text'
                                className={this.props.error.name ? 'form-control is-invalid' : 'form-control'}
                                placeholder='Enter your name'
                                name='name'
                                id='name'
                                value={name}
                                onChange={this.changeHandler}
                            />
                            { this.props.error.name && <div className='invalid-feedback'>
                                {this.props.error.name}
                            </div>}
                        </div>
                        

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
                                className={this.props.error.password ? 'form-control is-invalid' : 'form-control'}
                                placeholder='Enter your password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={this.changeHandler}
                            />
                            {this.props.error.password && <div className='invalid-feedback'>
                                {this.props.error.password}
                            </div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='confirmPassword'>Confirm Password: </label>
                            <input 
                                type='password'
                                className={this.props.error.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                                placeholder='Enter confirm password'
                                name='confirmPassword'
                                id='confirmPassword'
                                value={confirmPassword}
                                onChange={this.changeHandler}
                            />
                            { this.props.error.confirmPassword && <div className='invalid-feedback'>
                                {this.props.error.confirmPassword}
                            </div>}
                        </div>
                        <Link to='/login'>Already have an account? Login Here</Link>
                        <button className='btn btn-primary my-2 d-block'>Register</button>
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
        register: (user, history) => dispatch(register(user, history))
    }
}

 export default connect(
     mapStateToProps, 
     mapDispatchToProps
     )(Register)