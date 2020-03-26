import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <div>
          <Header></Header>
          <Sidebar></Sidebar>
          <Route path="/dashboard" component={Dashboard} />
          <Footer></Footer>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
