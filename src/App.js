import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import Login from "./components/dashboard";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
const isLoggedIn = () => {
  return localStorage.getItem('TOKEN_KEY') != null;
};

const SecuredRoute = ({ component: Component, ...rest}) => (
  <Route 
    {...rest}
    render={props => 
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
); // end of SecuredRoute

export default class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
          <div>
            {
              isLoggedIn() && (
                <>
                  <Header></Header>
                  <Sidebar></Sidebar>
                </>
              )} 
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <SecuredRoute path="/dashboard" component={Dashboard} />
            {isLoggedIn() && <Footer></Footer>}
            
          </div>
        </Switch>
      </Router>
    );
  }
}

