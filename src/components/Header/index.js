import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import './Header.scss'
import heartIcon from '../../assets/img/heart.png'

const Header = ({ auth: { isAuthenticated }, logout }) => {

    const header = (
        <header className="header">
            <div className="header__left">
                <div className="header__text">
                    Powered by
                    <a className="header__link"  href='https://github.com/AhitkinIlya' target="_blank" rel="noreferrer">Ilya Ahitkin</a>
                    special for <img alt='heart' src={heartIcon}/>
                    <a className="header__link" href='https://kitactive.ru/' target="_blank" rel="noreferrer">Kit Active</a>
                </div>
            </div>
            <div className="header__right">
                <NavLink to='/' className="header__btn">Загрузить файлы</NavLink>
                <NavLink to='/viewing' className="header__btn">Просмотреть файлы</NavLink>
                <a onClick={logout} href="#!" className="header__btn">Выйти из аккаунта</a>
            </div>
        </header>
    )

    return (
        <>{isAuthenticated ? header : null}</>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps, { logout })(Header)