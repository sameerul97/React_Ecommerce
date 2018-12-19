import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AboutPageComponent from "./pages/aboutPage"
import HomePageComponent from "./pages/homePage"
import AllPhonesComponent from "./pages/allPhonesPage"

const Index = () => <HomePageComponent></HomePageComponent>;
const About = () => <AboutPageComponent></AboutPageComponent>;
const AllPhones = () => <AllPhonesComponent></AllPhonesComponent>;
// const Users = () => <h2>Users</h2>;

const AppRouter = () => (
    <Router>
        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
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
                </div>
            </nav>
            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/allPhones/" component={AllPhones} />
        </div>

    </Router>
);

export default AppRouter;