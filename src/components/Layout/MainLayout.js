import { Route, Routes } from "react-router-dom";
import Pagination from '../Pagination'
import PrivateRoute from '../routing/PrivateRoute'
import Header from '../Header'

const MainLayout = () => {

  return (
    <>
        <Header />
        <div className="container">
        <Routes>
            <Route exact path="/" element={ <PrivateRoute /> }>
                <Route exact path="/" element={ <Pagination /> } />
            </Route>
            <Route exact path="/viewing" element={ <PrivateRoute /> }>
                <Route exact path="/viewing" element={ <Pagination /> } />
            </Route>
        </Routes>
        </div>
    </>
  );
}

export default MainLayout;