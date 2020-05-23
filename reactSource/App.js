import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Form from "./components/Form";
import ContactUs from "./components/ContactUs";

class App extends Component {
  render() {
    return (
      <div className="App">
	      <Router>
		      <div>
			      <Route exact path="/" component={Home} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Form" component={Form} />
            <Route exact path="/Contact" component={ContactUs} />
            
		      </div>
	      </Router>
      </div>
    );
  }
}

export default App;