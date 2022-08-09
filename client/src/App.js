import './App.css';
import Navbar from './components/Navbar';
import Room from './components/Room'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/login_state';


function App() {
  return (<>
  <NoteState>
  <Router>
    <Navbar/>
    <Switch>
    <Route exact path="/"> 
    <Room/>
    </Route> 
    <Route exact path="/login">
    <Login/>
    </Route>
    </Switch>
  </Router>
  </NoteState>
    </>
  );
}

export default App;
