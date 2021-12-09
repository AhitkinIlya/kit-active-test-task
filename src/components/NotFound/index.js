import { Link } from 'react-router-dom'

import './NotFound.scss'
//Компонент для Страница не найдена
const NotFound = () => {
  return (
    <div className="notFound-block">
      <h1 className="notFound-title">
        <i className="notFound-text">Страница не найдена</i>
      </h1>
      <p className="notFound-textLarge">Извините, такой страницы не существует :(</p>
      <Link className="notFound-link" to="/">Вернуться на главную страницу</Link>
    </div>
  )
}

export default NotFound