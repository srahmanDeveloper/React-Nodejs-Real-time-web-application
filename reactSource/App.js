import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import ProductForm from "./components/ProductForm";
import ContactUs from "./components/ContactUs";
import ProductShop from "./components/ProductShop";
import BirdGallery from "./components/BirdGallery";
class NavLink extends Component {

  render() {
      return (
        <li className={"nav-item" + (this.props.isActive ? "active": "")}>

          <h4 className="nav-link navigationItemStyling" onClick={() => this.props.onClick()}> 
            {this.props.text}
          </h4>
              
        </li>
      );
  }
}

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {path: "/", text: "Home", isActive: false},
        {path: "/ProductShop", text: "Product Shop", isActive: false},
        {path: "/ProductForm", text: "Product Form", isActive: false},
        {path: "/About", text: "About Us", isActive: false},
        {path: "/BirdGallery", text: "Gallery", isActive: false},
      ]
    }
  }

  handleClick(i) {
    
    console.log(i);
    console.log(this.state);
    const links = this.state.links.slice(); 
    for (const j in links) {
      links[j].isActive = i == j ;
      
    }
    this.setState({links: links});
    location.href = links[i].path;
  }

  render() {
    return (
      
      <div className="App">
	      
	      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            {this.state.links.map((link, i) => 
              < NavLink
                path={link.path} 
                text={link.text} 
                isActive={link.isActive}
                key={link.path} 
                onClick={() => this.handleClick(i)}
              /> 
              )}
          </ul>
        </nav>
	      <Router>
		      <div>
		      	<Route exact path="/" component={Home} />
	            <Route exact path="/About" component={About} />
	            <Route exact path="/ProductForm" component={ProductForm} />
	            <Route exact path="/Contact" component={ContactUs} />
	            <Route exact path="/ProductShop" component={ProductShop} />
              <Route exact path="/BirdGallery" component={BirdGallery} />
            
		      </div>
	      </Router>
      </div>
    );
  }
}

export default App;