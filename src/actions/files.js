import {instance as axios} from '../utills/axios'
import {
    GET_FILES,
    POST_FILES,
    DELETE_FILE,
    ADD_FILESPREVIEW,
    DELETE_FILEPREVIEW,
    UPDATE_STATE
} from './types'

import { setAlert } from './alert'

//Получение всех загруженных на сервер файлов
export const getFiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/media')
        const files = res.data.files

        //Подготовка промиссов для дальнейшей обработки
        const arrayPromise = res.data.files.map( file => {
            return axios({
                   url: file.url,
                   method: 'GET',
                   responseType: 'blob'
               })
           })
        //Преобразование ссылки для скачивания файла   
        Promise.all(arrayPromise).then(values => {
            for (let i = 0; i < files.length; i++) {
                const url = window.URL.createObjectURL(new Blob([values[i]]))
                files[i].url = url
            }
            dispatch({
                type: GET_FILES,
                payload: files
            })
        })
    } catch (error) {
        const messageError = error.response.data.message
        dispatch(setAlert(messageError, 'danger'))
    }
}

//Отправка файлов на сервер
export const postFiles = files => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    //Преобразования массива файлов для
    //корректной передачи его серверу
    const formData = new FormData()
    files.forEach(file => {
        formData.append('files[]', file)
    });
    try {
    await axios.post('/api/media/upload', formData, config)
    
    dispatch({
        type: POST_FILES
    })

    dispatch(setAlert('Файл(ы) успешно загружены на сервер', 'success'))

    } catch (error) {
        const messageError = error.response.data.message
        dispatch(setAlert(messageError, 'danger'))
    }
}

//Удаление файла на сервере
export const deleteFile = fileId => async dispatch => {
    try {
        await axios.delete(`/api/media/${fileId}`)
    
        dispatch({
            type: DELETE_FILE,
            payload: fileId
        })

        dispatch(setAlert('Файл удалён', 'dark'))
    } catch (error) {
        const messageError = error.response.data.message
        dispatch(setAlert(messageError, 'danger'))
    }
}
//Добавления файла для предпросмотра
export const addFilesPreview = files => dispatch => {
    dispatch({
        type: ADD_FILESPREVIEW,
        payload: files
    })
}

//Очищение массива файлов, чтоб избежать смешивания
//файлов для предпросмотра и загруженых на сервер
export const updateState = () => dispatch => {
    dispatch({
        type: UPDATE_STATE
    })
}
//Удаление файла из предпросмотра
export const deleteFilePreview =  fileId => dispatch => {
    dispatch({
        type: DELETE_FILEPREVIEW,
        payload: fileId
    })
}
