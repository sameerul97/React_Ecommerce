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
import Register from "./components/register"
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
    this.state = { logged: false, noOfItemsInBasket: "", userName: "" }
    this.TokenData = localStorage.getItem("token");
    this.updateLink = this.updateLink.bind(this);
    this.signOut = this.signOut.bind(this);
    this.updateBasketNo = this.updateBasketNo.bind(this);
  }
  updateBasketNo(num) {
    this.setState({ noOfItemsInBasket: num });
    this.setState({ userName: localStorage.getItem("name") })
  }
  updateLink = () => {
    console.log("updating");
    this.setState({ logged: true })
  }
  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      try {
        const expiration = decode(localStorage.getItem("token"));
        if (expiration.exp < new Date().getTime() / 1000) {
          this.setState({
            logged: false
          })
        }
        else {
          this.setState({
            logged: true
          })
          this.setState({ userName: localStorage.getItem("name") })
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      this.setState({
        logged: false
      })
    }
  }
  signOut() {
    console.log("Signing out");
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    this.setState({ logged: false })
    this.setState({ userName: "" })
    console.log("Signed Out");
  }
  render() {
    return (
      <div className="App" >
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info position-sticky shadow">
            <div className="container">
              <Link to="/" className="navbar-brand">React Store</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link" >Home <span className="sr-only">(current)</span> </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/allPhones/" className="nav-link">All Phones</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about/" className="nav-link">About</Link>
                  </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                  {this.state.logged &&
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        {this.state.userName}
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to="/userDashboard" className="nav-link text-dark">My Dashboard</Link>
                      </div>
                    </li>
                  }
                  {!this.state.logged &&
                    <li className="nav-item" >
                      <Link to="/register" className="nav-link">Register</Link>
                    </li>
                  }
                  {!this.state.logged &&
                    <li className="nav-item" >
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                  }
                  {this.state.logged &&
                    <li className="nav-item" >
                      <Link to="/basket" className="nav-link">My Basket  <span className="badge badge-light">{this.state.noOfItemsInBasket}</span></Link>
                    </li>
                  }
                  {this.state.logged &&
                    <li className="nav-item">
                      <a className="nav-link" onClick={this.signOut.bind(this)} >Sign Out</a>
                    </li>
                  }
                </ul>
              </div>
              </div>
            </nav>
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/about/" component={About} />
              <Route path="/allPhones/" component={AllPhones} />
              <Route path="/detailPhone/:mobileid" component={DetailPhone} />
              <Route path="/register" component={Register} />
              <Route path="/login" render={props => <LoginComponent signOut={this.signOut} updateLink={this.updateLink} updateBasketNo={this.updateBasketNo} isLogged={this.state.logged} {...props} />} />
              <PrivateRoute path="/userDashboard" component={UserDashboard} />
              <PrivateRoute path="/basket" component={Basket} />
              {/* <PrivateRoute path="/userDashboard" component={UserDashboard} /> */}
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
        {/* <h1>{name}</h1> */}
      </div >
    );
  }
}

export default App;
