import logo from './logo.svg';
import './App.css';
import { render } from "react-dom";
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
                <div className="container">
                <Switch>
                    <Route exact path="/"> <Login/> </Route>
                    <Route path={"/:login"} exact component={Login} />
                </Switch>
                </div>       
     </Router>
  );
}

export default App;
