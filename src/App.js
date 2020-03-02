import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
 import  DisplayItems from './components/displayitems';
 import 'materialize-css/dist/css/materialize.min.css';
 import M from "materialize-css";
function App() {
  return (
    <Router>
    <Route path = "/" component = {DisplayItems}></Route>
      
       
   
  
 </Router>
  );
}

export default App;
