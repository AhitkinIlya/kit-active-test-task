import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../actions/auth'
import './LoginForm.scss'

const LoginForm = ({ isAuthenticated, login, isLoading }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    
    const { email, password} = formData

    //Установка в локальный стейт полученных значений формы при каждом изменении
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
    }
    //Если клиент уже авторизирован
    //Перенаправить на главную страницу
    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <div className="form-block-login">
            <form onSubmit={(e) => onSubmit(e)} className="form-registration">
                <div className="form-input">
                    <label className="form-label-input" htmlFor="email">Почта</label>
                    <input 
                        className="form-input-control" 
                        type="email" 
                        name="email" 
                        id="email" 
                        required 
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-input">
                    <label className="form-label-input" htmlFor="password">Пароль</label>
                    <input 
                        className="form-input-control" 
                        type="password" 
                        name="password" 
                        id="password" 
                        required 
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-block-text">
                    <div className="form-text">
                        Ещё нет аккаунта?
                    </div>
                    <Link to='/registration' className="form-link">Зарегистрироваться</Link>
                </div>
                <button type="submit" className="form-btn">Войти</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.loading
})

export default connect(mapStateToProps, { login })(LoginForm)