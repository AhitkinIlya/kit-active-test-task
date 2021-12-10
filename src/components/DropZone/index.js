import React, { useState, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';


import { addFilesPreview, deleteFilePreview, postFiles, updateState } from '../../actions/files'
import { setAlert } from '../../actions/alert'
import './DropZone.scss'

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px',
    borderWidth: 5,
    borderColor: '#0095f6',
    borderStyle: 'dashed',
    backgroundColor: '#ffff',
    color: '#000',
    fontSize: '20px',
  };

const DropZone = ({files, addFilesPreview, deleteFilePreview, postFiles, currentItems, updateState, setAlert}) => {

    //Локальный стейт для контроля превышения
    //лимита по объёму файлов и кол-ву
    const [isSize, setIsSize] = useState(true)
    const [isCount, setIsCount] = useState(true)
    //Локальный стейт для отображения текущего
    //общего размера файлов и их кол-ва
    const [currentCount, setCurrentCount] = useState(0)
    const [currentSize, setCurrentSize] = useState(0)

    //Стили для DropZone
    const style = useMemo(() => ({
    ...baseStyle
    }), []);

    //Обнуление стейта файлов
    //во избежании перемешки загруженных на сервере файлов
    //и локальный для отображения клиенту
    useEffect(() => {
        updateState()
    }, [])

    //коллбэк для DropZon, получающий загруженные
    //в браузер файлов клиентом
    const onDrop = acceptedFiles => {
        searchSameFiles(acceptedFiles)
    } 

    //Сравнивает переданные файлы с уже загруженными
    //Если файл уже загружен, то отправляемый файл не добоавляется
    //Чтоб избежать отправки одинаковых файлов
    const searchSameFiles = (acceptedFiles) => {
        if (acceptedFiles.length && files.length) {
        
            loop: for(let i = 0; i < acceptedFiles.length; i++) {
                    for(let y = 0; y < files.length; y++) {
                        if(acceptedFiles[i].lastModified === files[y].lastModified) {
                            acceptedFiles.splice(i, 1)
                            if (acceptedFiles.length === 0) {
                                break loop
                            }
                            i = 0;
                            y = 0;
                        }
                    }
            }
        }
        //добавления в массив файлов для пред просмотра клиенту
        addFilesPreview(acceptedFiles)
    }

    //Отслеживание превышения лимита по кол-ву
    //загружаемых файлов
    useMemo(() => {
        if (files.length > 20) {
            setIsCount(false)
        } else {
            setIsCount(true)
        }
        setCurrentCount(files.length)
    }, [files])

    //Отслеживание превышения размера
    //загружаемых файлов
    useMemo(() => {
        let count = 0
        for (let i = 0; i < files.length; i++) {
            count = count + +(files[i].size / 1024**2)
        }
        if (count > 1) {
            setIsSize(false)
        } else {
            setIsSize(true)
        }
        count = count.toFixed(2)
        setCurrentSize(count)
    }, [files])
    
    //Удаление файла из пред просмотра
    const deleteItem = (id) => {
        deleteFilePreview(id)
    }

    //Оповещение клиента в случае превышения
    //заданного лимита по размеру и кол-ву файлов
    const postItems = () => {
        if (isCount && isSize) {
            postFiles(files)
        } else if (isCount) {
            setAlert('Нельзя отправить файлы суммарно больше 1МБ', 'danger')
        } else {
            setAlert('Нельзя отправить больше 20 файлов за раз', 'danger') 
        }
    }

    //Шаблон для отображения загруженных для пред просмотра файлов
    const listFiles = currentItems.length !==0 && !currentItems[0].mimeType ? (currentItems.map(file => (
        <li key={file.lastModified} className="dropZone-listItem">
            <div className="dropZone-block">
                <div className="dropZone-name">
                    Название:
                    <div className="dropZone-text">{
                        //Если имя файла больше 10 символов,
                        //то обрезать и поставить многоточия
                        file.name.split('.')[0].length < 10 ?
                        file.name.split('.')[0] :
                        file.name.split('.')[0].substr(0, 10) + '...'}
                    </div>
                </div>
                <div className="dropZone-info">
                    <div className="dropZone-size">
                        Размер: 
                        <div className="dropZone-text">{Math.round(file.size / 1024)}Кб</div>
                    </div>
                    <div className="dropZone-type">
                        Тип:
                        <div className="dropZone-text">{
                            file.type.length < 24 ?
                            file.type :
                            file.type.substr(0, 24) + '...'}
                        </div>
                    </div>
                </div>
                <div className="dropZone-button">
                    <button className="dropZone-btn" onClick={(e) => deleteItem(file.lastModified)}>Удалить</button>
                </div>
            </div>
        </li>
    ))) : null


    const {
        getRootProps,
        getInputProps
    } = useDropzone({    
        maxFiles:20,
        onDrop
    });
  
    return (
        <section className="dropZone">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <div>Перетащите файлы либо кликните по области</div>
            </div>
            <div className="dropZone-countInfo">
                <div className="dropZone-count">Общий размер файлов: <div className={isSize ? 'dropZone-access' : 'dropZone-error'}>{currentSize}МБ</div>из 1МБ</div>
                <div className="dropZone-count">Количество файлов: <div className={isCount ? 'dropZone-access' : 'dropZone-error'}>{currentCount}</div> из 20</div>
            </div>
            <ul className="dropZone-list">
                {listFiles}
            </ul>
            <div className="dropZone-post">
               {currentItems.length !==0  ? <button className="dropZone-btn btn-post"  onClick={(e) => postItems()}>Отправить</button> : null}
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    files: state.files.files
})

export default connect(mapStateToProps, { addFilesPreview, deleteFilePreview, postFiles, updateState, setAlert })(DropZone)