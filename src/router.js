import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import AboutPageComponent from "./components/aboutPage"
import HomePageComponent from "./components/homePage"
import AllPhonesComponent from "./components/allPhonesPage"
import DetailPhoneComponent from "./components/detailPhone";
import ErrorComponent from "./components/errorComponent";
import LoginComponent from "./components/loginComponent"
import UserDashboardComponent from "./components/userDashboard"
import decode from "jwt-decode";
import authservice from "./services/authenticationService";
   
const Index = () => <HomePageComponent></HomePageComponent>;
const About = () => <AboutPageComponent></AboutPageComponent>;
const AllPhones = () => <AllPhonesComponent></AllPhonesComponent>;
const DetailPhone = () => <DetailPhoneComponent></DetailPhoneComponent>;
const Login = () => <LoginComponent></LoginComponent>;
const UserDashboard = () => <UserDashboardComponent></UserDashboardComponent>;
const NoMatch = () => <ErrorComponent></ErrorComponent>;
// const Users = () => <h2>Users</h2>;
const state = {
    isLoggedIn: authservice.isAuthenticated()
}
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

            state.isLoggedIn = authservice.isAuthenticated();
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
// function PrivateRoute({ component: Component, ...rest }) {
//     console.log(authenticated())
//     return (
//         <Route
//             {...rest}
//             render={props =>

//                 authenticated() ? (
//                     <Component {...props} />
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/login"
//                             }}
//                         />
//                     )
//             }
//         />
//     );
// }
const AppRouter = () => (

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
                        {authservice.isAuthenticated() &&
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
                        {!authservice.isAuthenticated() &&
                            <li className="nav-item" >
                                <a className="nav-link" routerLink="/register">Register</a>
                            </li>
                        }
                        {!authservice.isAuthenticated() &&

                            <li className="nav-item" >
                                <a className="nav-link" routerLink="/login">Login</a>
                            </li>
                        }
                        {authservice.isAuthenticated() &&
                            <li className="nav-item" >
                                <a className="nav-link" routerLink="/basket">My Basket
                            </a>
                            </li>
                        }
                        {authservice.isAuthenticated() &&

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
                <Route path="/login" component={Login} />
                <PrivateRoute path="/userDashboard" component={UserDashboard} />
                <Route component={NoMatch} />
            </Switch>


        </div>

    </Router>
);

export default AppRouter;