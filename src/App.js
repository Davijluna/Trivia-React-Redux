import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Config from './pages/Config';
import ScreenPlay from './pages/ScreenPlay';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Switch>
          <Route exact path="/" component={ ScreenPlay } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/config" component={ Config } />

        </Switch>
      </header>
    </div>
  );
}
