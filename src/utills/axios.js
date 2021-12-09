import axios from 'axios'

//Создание инстанца Axios'а для дальнейшей работы
//С установлением базового адресса
const instance = axios.create({
    baseURL: 'https://test.kitactive.ru:8089'
  });

  export {instance}