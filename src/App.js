import React, { Component } from 'react';
import './App.css';
import Router from "./router";

class App extends Component {
  render() {
    const name = 'Sam';
    return (
      <div className="App">
      <Router />
      <h1>{name}</h1>
      </div>
    );
  }
}

export default App;
