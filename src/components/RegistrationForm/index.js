import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import './RegistrationForm.scss'

//Компонент регистрации
const RegistrationForm = ({ isAuthenticated, register, setAlert }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const navigate = useNavigate()

    const { name, email, password, password2 } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    //При корректно заполненых данных регистрирует
    //пользователя и перекидывает на форму логина
    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            setAlert('Пароли не совпадают', 'dark')
        } else {
            //action регистрации, с переданным коллбэком
            // для переадресации на форму логина
            register({ name, email, password }, () => {
                navigate('/login')
            })
        }
    }
    //Если пользователь уже авторизирован
    //благодаря наличию Токена, то отправить
    //клиента на главную страницу
    if(isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <div className="form-block-registration">
            <form onSubmit={(e) => onSubmit(e)} className="form-registration">
                <div className="form-input">
                    <label className="form-label-input" htmlFor="name">Имя</label>
                    <input 
                        className="form-input-control"
                        type="text"
                        name="name" 
                        id="name" 
                        required
                        onChange={e => onChange(e)} 
                    />
                </div>
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
                <div className="form-input">
                    <label className="form-label-input" htmlFor="password2">Повторить пароль</label>
                    <input 
                        className="form-input-control" 
                        type="password" 
                        name="password2"
                        id="password2" 
                        required 
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-block-text">
                    <div className="form-text">
                        Уже есть аккаунт?
                    </div>
                    <Link to='/login' className="form-link">Войти в аккаунт</Link>
                </div>
                <button type="submit" className="form-btn">Зарегистрироваться</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, setAlert })(RegistrationForm)