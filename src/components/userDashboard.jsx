import React, { Component } from 'react';
import "./userDashboard.css"
class UserDashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: localStorage.getItem("name"),
            email: localStorage.getItem("email")
        }
    }
    render() {
        const imageStyle = {
            width: "100 %",
            height: "80vh"
        };
        return (
            <div className="container mt-2 mb-2">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">My Profile</a>
                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Orders</a>
                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Wished Item</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="container pt-3">
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-md-12 lead text-left">User profile
                    <hr />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 text-center">
                                                    <img className="img-circle avatar avatar-original" style={imageStyle}
                                                        src="http://robohash.org/sitsequiquia.png?size=120x120" />
                                                    <div className="p-2">
                                                        <label className="btn btn-primary p-2">
                                                            Change Picture
                        <input type="file" style={{ display: "none" }} />
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-8">
                                                    <div className="row text-left">
                                                        <div className="col-md-12">
                                                            <h2 className="">Username: {this.state.username} </h2>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <span className="text-muted text-left">Email:{this.state.email} </span>
                                                            <br>
                                                            </br>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12  text-left">
                                                    <hr />
                                                    <button className="btn btn-default pull-right" data-toggle="modal" data-target="#editUserDataModal">
                                                        <i className="glyphicon glyphicon-pencil"></i> Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        sam
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        sam
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDashboardComponent;
