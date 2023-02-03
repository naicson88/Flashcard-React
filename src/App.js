import './App.css';
import { render } from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import FolderPage from './pages/FolderPage';

function App() {
  return (
    <Router>
        <div className="container">
          <Switch>
              <Route  path="/" exact  component={LoginPage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/home" component={HomePage} /> 
              <Route path="/folder" component={FolderPage} /> 
          </Switch>
        </div>       
     </Router>
  );
}

export default App;
