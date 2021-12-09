import { useEffect } from 'react'
import { deleteFile, getFiles } from '../../actions/files'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './ShowFiles.scss'

//Компонент для отображения 
//доступных для скачивания файлов с сервера
const ShowFiles = ({deleteFile, getFiles, currentItems}) => {

    //Получение с сервера всех файлов, которые были загружены
    // При каждом рендере компонента
    useEffect(() => {
        getFiles()
    }, [])

    //Вызов action'а для удаления файла с сервера
    const deleteItem = (id) => {
        deleteFile(id)
    }

    //Блок, если никакие файлы не были загружены
    const noneFiles = (
        <div className="showFiles-noneBlock">
            <div className="showFiles-noneText">Никакие файлы не были загружены</div>
            <Link className="showFile-noneLink" to="/">Загрузить</Link>
        </div>
    )

    //Шаблон основного блока компонента
    const listFiles = currentItems.length !==0 && !currentItems[0].type ? (currentItems.map(file => (
        <li key={file.id} className="showFiles-listItem">
            <div className="showFiles-block">
                <div className="showFiles-name">
                    Название:
                    <div className="showFiles-text">{
                        //Сначала убирает лишнии символы после точки
                        //Затем, если слишком длинное название файла
                        //Обрезать и поставить многоточие
                        file.fileName.split('.')[0].length < 10 ?
                        file.fileName.split('.')[0] :
                        file.fileName.split('.')[0].substr(0, 10) + '...'}
                    </div>
                </div>
                <div className="showFiles-info">
                    <div className="showFiles-type">
                        Тип:
                        {/* Так же с типами, они слишком длинными бывают */}
                        <div className="showFiles-text">{
                            file.mimeType.length < 24 ?
                            file.mimeType :
                            file.mimeType.substr(0, 24) + '...'}
                        </div>
                    </div>
                    <div className="showFiles-size">
                        Дата создания:
                        {/* Отображение 'Человеческого' вида времени */}
                        <div className="showFiles-date">{new Date(file.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</div>
                    </div>
                </div>
                <div className="showFiles-btns">
                    <div className="showFiles-button">
                        {/* Ссылка на скачивание файла уже с преобразованным url */}
                        <a className="showFiles-btn btn-download" href={file.url} download={file.fileName}>Скачать</a>
                    </div>
                    <div className="showFiles-button">
                        <a className="showFiles-btn" onClick={(e) => deleteItem(file.id)}>Удалить</a>
                    </div>
                </div>
            </div>
        </li>))) : null

    return (
        <>
            <ul className="dropZone-list">
                {listFiles}
            </ul>
            {currentItems.length === 0 ? noneFiles : null}
        </>
    )
}



export default connect(null, { deleteFile, getFiles })(ShowFiles)