import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import CheckOut from './components/CheckOut/CheckOut'
import Orders from './components/Orders/Orders';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import AdminControl from './components/AdminControl/AdminControl';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NoMatch from './components/NoMatch/NoMatch';

export const UserContext = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState({
    signed: 'false',
    username: '',
    email: '',
    photoURL: '',
    password: '',
    error: ''
  })
  return (
    <UserContext.Provider value={[loggedUser, setLoggedUser]}>
      <div style={{backgroundColor: 'lightGray', minHeight: '100vh'}}>
        <Router>
          <div>
            <Header />

            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/checkout/:bookid">
                <CheckOut />
              </PrivateRoute>
              <PrivateRoute path="/admin">
                <AdminControl />
              </PrivateRoute>
              <PrivateRoute path="/orders">
                <Orders />
              </PrivateRoute>
              <Route path="/">
                <Home />
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
