import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContextProvider from './components/context/AuthContext';
import AtmContextProvider from './components/context/AtmContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register'
import Home from './components/Home';

const App = () => {
  return (
    <AuthContextProvider>
      <AtmContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/home' exact component={Home}/>
          </Switch>
        </Router>
      </AtmContextProvider>
    </AuthContextProvider>
  );
}

export default App;
