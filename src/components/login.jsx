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
        this.state = {
            username: "",
            password: "",
            serverResponse: ""
        }
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        console.log(this.props)

        // console.log(this.props.updateLink);
        // console.log(this.props.isLogged);
        // this.loginFunction();
        // var temp = this.props.isLoggedIn
        // this.setState({

        // })
    }
    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
        console.log(this.state)
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    loginFunction() {
        var userEmail = this.state.username
        var userPassword = this.state.password;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/x-www-form-urlencoded');
        fetch("http://localhost:3000/login/", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams("email=" + userEmail + "&password=" + userPassword), // body data type must match "Content-Type" header
        }).then(function (response) {
            return response.json();
        })
            // .then(response => response.json())
            .then(myJson => {
                console.log((myJson));
                if (myJson.Message == "Okay") {
                    localStorage.setItem("email", myJson.email)
                    localStorage.setItem("userId", myJson.userId)
                    localStorage.setItem("name", myJson.name)
                    localStorage.setItem("token", myJson.token)
                    var functionA = this.props.updateLink;
                    functionA();
                    this.setState({
                        serverResponse: myJson.Message
                    })
                    this.props.history.push("/userDashboard" )

                }
                this.setState({
                    serverResponse: myJson.Message
                })
                return myJson.MobileData;
            })

    }
    handleSubmit(event) {
        // console.log("HS")
        event.preventDefault();
        console.log(this.state);
        this.loginFunction();
    }
    render() {
        var { passedFunction, ...otherProps } = this.props.updateLink;
        const style = {
            margin: "auto",
            width: "100%",
            maxWidth: "330px",
            padding: "15px",
        }
        return (
            <div className="container">
                <div className="text-center">
                    <form className="text-center form-signin" onSubmit={this.handleSubmit} style={style}>
                        <div className="form-group">
                            {/* <div className="alert alert-primary" role="alert">
                                loginMessage
                            </div> */}
                            <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>

                            <label>Username*</label>
                            <input type="text" className="form-control" value={this.state.username} onChange={this.handleChangeUsername} placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password*</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={this.handleChangePassword} placeholder="Enter password" />

                        </div>

                        <h2 className="font-weight-light">{this.state.serverResponse}</h2>
                        <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
                        <p className="mt-3 mb-3 text-muted">© 2017-2018</p>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginComponent;
