import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import myClass from 
import "./detailPhone.css"
import authservice from "../services/authenticationService";

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        console.log(props)
    }
    componentDidMount() {
        console.log(this.props)
        var functionA = this.props.updateLink;
        functionA();
        console.log(this.props.updateLink);
        console.log(this.props.isLogged)
        // var temp = this.props.isLoggedIn
        // this.setState({
            
        // })
    }
    render() {
        var { passedFunction, ...otherProps } = this.props.updateLink;

        return (
            <div onClick={passedFunction }{...otherProps }>
                <h1>Login Comp comp</h1>
            </div>
        )
    }
}

export default LoginComponent;
