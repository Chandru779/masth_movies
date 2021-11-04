import './components/style.css';
import './components/spinner.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';
import AnimePage from './components/AnimePage';


function App() {
  return (
    <Router className="body">
    <div className="App">
      <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/anime/:id">
            <AnimePage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
