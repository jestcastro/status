import * as React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
