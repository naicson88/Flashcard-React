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
import FolderDetails from './pages/FolderDetails';
import AnswerPage from './pages/AnswerPage';

function App() {
  return (
    <Router>
        <div className="container">
          <Switch>
              <Route  path="/" exact  component={LoginPage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/home" component={HomePage} /> 
              <Route path="/folder" exact component={FolderPage} /> 
              <Route path="/folder/details" component={FolderDetails} /> 
              <Route path="/answer" component={AnswerPage} /> 
          </Switch>
        </div>       
     </Router>
  );
}

export default App;
