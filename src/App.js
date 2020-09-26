import React, { Component } from "react";
import "./App.css";
import MainComponent from "./Components/MainComponent";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <MainComponent />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
