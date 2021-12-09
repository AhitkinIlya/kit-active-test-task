import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Alert from './components/Alert'
import Pagination from './components/Pagination'
import PrivateRoute from './components/routing/PrivateRoute'
import Header from './components/Header'
import store from './store'
import { loadApp } from './actions/auth'
import './App.css';

function App() {
  //Подготовка приложения для корректной работы
  useEffect(() => {
    store.dispatch(loadApp())
  }, [])

  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Header />
          <Alert />
          <div className="container">
            <Routes>
              <Route exact path="/" element={ <PrivateRoute /> }>
                <Route exact path="/" element={ <Pagination /> } />
              </Route>
              <Route exact path="/viewing" element={ <PrivateRoute /> }>
                <Route exact path="/viewing" element={ <Pagination /> } />
              </Route>
              <Route exact path="/registration" element={ <RegistrationForm /> } />
              <Route exact path="/login" element={ <LoginForm /> } />
              <Route path="*" element={ <NotFound /> } />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
