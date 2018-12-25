import React, { Component } from 'react';
import './App.css';
// import Router from "./router";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import AboutPageComponent from "./components/aboutPage";
import HomePageComponent from "./components/homePage";
import AllPhonesComponent from "./components/allPhonesPage";
import DetailPhoneComponent from "./components/detailPhone";
import ErrorComponent from "./components/errorComponent";
import LoginComponent from "./components/login";
import UserDashboardComponent from "./components/userDashboard";
import Basket from "./components/basket";
import decode from "jwt-decode";
// import authservice from "./services/authenticationService";


const Index = () => <HomePageComponent></HomePageComponent>;
const About = () => <AboutPageComponent></AboutPageComponent>;
const AllPhones = () => <AllPhonesComponent></AllPhonesComponent>;
const DetailPhone = () => <DetailPhoneComponent></DetailPhoneComponent>;
const Login = () => <LoginComponent></LoginComponent>;
const UserDashboard = () => <UserDashboardComponent></UserDashboardComponent>;
const NoMatch = () => <ErrorComponent></ErrorComponent>;
// const Users = () => <h2>Users</h2>;
// const state = {
//   isLoggedIn: localStorage.getItem("token")
// }
const authenticated = () => {

  const token = localStorage.getItem('token');
  if (!token) {
    console.log("HEr")
    return false;
  }
  try {
    // { exp: 12903819203 }
    const expiration = decode(token);
    console.log(expiration)
    console.log(expiration.exp)
    if (expiration.exp < new Date().getTime() / 1000) {
      // loginService.setTrue();

      // state.isLoggedIn = true;
      return false;
    }

  } catch (e) {
    return false;
  }

  return true;
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => (
      authenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    )}
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false }
    this.TokenData = localStorage.getItem("token");
    // this.logOutFn = this.logOutFn.bind(this);
    this.updateLink = this.updateLink.bind(this);
  }
  updateLink() {
    // console.log("cald");
    // if(localStorage.getItem("token") !== undefined)
    // {

    // }
  }
  updateLink = () => {
    console.log("updating");
    this.setState({ logged: true })
    // this.setState({ word: 'bar' })
  }


  render() {
    const name = 'Sam';
    const isLoggedIn = this.state.logged;
    let button;

    if (isLoggedIn) {
      button = <li className="nav-item" >
        <a className="nav-link" >Temp Button True</a>
      </li>
    } else {
      button = <li className="nav-item" >
        <a className="nav-link" routerLink="/register">Temp Buttn False</a>
      </li>
    }
    return (
      <div className="App" mydata={this.state.userIsLoggedIn, this.state.name}>
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky">
              <a className="navbar-brand" href="#">React Store</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link" >Home <span className="sr-only">(current)</span> </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about/" className="nav-link">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/allPhones/" className="nav-link">All Phones</Link>
                  </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                  {this.state.logged &&
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        {/* {userName} */}
                      </a>

                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="nav-link text-dark" routerLink="/userDashboard">My Dashboard</a>
                      </div>

                    </li>
                  }
                  {!this.state.logged &&
                    <li className="nav-item" >
                      <a className="nav-link" routerLink="/register">Register</a>
                    </li>
                  }
                  {button}
                  {!this.state.logged &&

                    <li className="nav-item" >
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                  }
                  {this.state.logged &&
                    <li className="nav-item" >
                      <a className="nav-link" routerLink="/basket">My Basket
                            </a>
                    </li>
                  }
                  {this.state.logged &&
                    <li className="nav-item">
                      <a className="nav-link" routerLink="/home">Sign Out</a>
                    </li>
                  }
                </ul>
              </div>
            </nav>
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/about/" component={About} />
              <Route path="/allPhones/" component={AllPhones} />
              <Route path="/detailPhone/:mobileid" component={DetailPhone} />
              <Route path="/login" render={props => <LoginComponent updateLink={this.updateLink} isLogged={this.state.logged} {...props} />} />
              <PrivateRoute path="/userDashboard" component={UserDashboard} />
              <PrivateRoute path="/basket" component={Basket} />
              {/* <PrivateRoute path="/userDashboard" component={UserDashboard} /> */}
              <Route component={NoMatch} />
            </Switch>


          </div>

        </Router>
{/* <h1>{name}</h1> */ }
      </div >
    );
  }
}

export default App;
