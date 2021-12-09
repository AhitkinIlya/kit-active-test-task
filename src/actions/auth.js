import { instance as axios } from '../utills/axios'
import { setAlert } from './alert'
import {
    LOGIN_SUCCESS,
    LOGOUT,
    APP_LOAD,
    APP_LOADFAILED
} from './types'

import setAuthToken from '../utills/setAuthToken'

//Подготовка приложения для корректной работы
export const loadApp = () => async dispatch => {
  //Получение токена из локал стороджа
  if(localStorage.getItem('token')) {
    //Установка его в хэддер запроса
    setAuthToken(localStorage.getItem('token'))

    try {
      //Т.к. сервер не отправляет время жизни токена
      //и не реализовано Апи на подобии
      // axios.get('/api/auth),который бы проверял
      //с помощью токена авторизирован ли пользователь
      //или нет, решил обращаться на данный апи
      //проверяя рабочий ли еще токен, чтобы лишний раз
      //не дергать клиента с авторизацией в ручную
      const res = await axios.get('/api/media')
      if (res.status === 200) {
        dispatch({
          type: APP_LOAD
        })
      }
    } catch(error) {
      const messageError = error.response.data.message
      dispatch(setAlert(messageError, 'danger'))
      dispatch({
        type: APP_LOADFAILED
      })
    }
  }
}

//Регистрация
export const register = ({ name, email, password }, callback) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  
    const body = JSON.stringify({ name, email, password })
  
    try {
      const res = await axios.post('/api/register', body, config)
      if(res.data.status === 'ok') {
        callback()
      }
      dispatch(setAlert('Регистрация прошла успешна', 'primary'))
    } catch (error) {
      const messageError = error.response.data.message
      dispatch(setAlert(messageError, 'danger'))
    }
}
//Вход в приложения, получаю токе в ответ
export const login = (email, password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  
    const body = JSON.stringify({ email, password })
  
    try {
      const res = await axios.post('/api/login', body, config)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch(setAlert('Вы успешно вошли в аккаунт', 'primary'))
    } catch (error) {
      console.log('error', error)
      const messageError = error.response.data.message
      dispatch(setAlert(messageError, 'danger'))
    }
}
//Выход из системы
export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
    dispatch(setAlert('Вы вышли из аккаунта', 'dark'))
}