import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Alert from './components/Alert'
import store from './store'
import { loadApp } from './actions/auth'
import './App.css';
import MainLayout from './components/Layout/MainLayout';

function App() {
  //Подготовка приложения для корректной работы
  useEffect(() => {
    store.dispatch(loadApp())
  }, [])

  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Alert />
          <Routes>
            <Route exact path="/" element={ <MainLayout /> } />
            <Route exact path="/viewing" element={ <MainLayout /> } />
            <Route exact path="/registration" element={ <RegistrationForm /> } />
            <Route exact path="/login" element={ <LoginForm /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
