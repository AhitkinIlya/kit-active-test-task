import {instance as axios} from './axios'

//Установка заранее в хэдер запроса токена
const setAuthToken = token => {
  if(token) {
    axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }

}
  
  export default setAuthToken