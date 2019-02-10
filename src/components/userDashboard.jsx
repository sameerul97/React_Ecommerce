import React, { Component } from 'react';
import "./userDashboard.css";
import { withRouter } from "react-router-dom";

class UserDashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wishedItems: [],
            ordererdItems: [{
                mobileId: "",
                mobileImageUrl: "",
                mobileName: "",
                mobilePrice: "",
                orderedAt: "",
                userId: "",
                __v: "",
                _id: "",
            }],
            username: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
        };
    }

    testFunction(mobileId) {
        console.log(mobileId);
        this.props.history.push("/detailPhone/" + mobileId)
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem("userId")
        console.log(token)
        fetch("http://localhost:3000/myOrders/" + userId, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": "Bearer " + token
            },
        }).then(function (response) {
            return response.json();
        })
            // .then(response => response.json())
            .then(myJson => {
                console.log((myJson));
                console.log((myJson.Orders));
                if (myJson.Orders != "None") {
                    this.setState({ ordererdItems: myJson.Orders })
                    console.log(this.state);
                    this.state.ordererdItems.forEach(element => {
                        console.log(element)
                    });
                }
            })
        fetch("http://localhost:3000/myWishedProduct/" + userId, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": "Bearer " + token
            },
        }).then(function (response) {
            return response.json();
        })
            // .then(response => response.json())
            .then(myJson => {
                console.log((myJson));
                console.log((myJson.result));
                // if (myJson.result != "None") {
                this.setState({ wishedItems: myJson.result })
                console.log(this.state);
                // this.state.ordererdItems.forEach(element => {
                //     console.log(element)
                // });
                // }
            })

    }
    render() {
        const imageStyle = {
            width: "100 %",
            height: "80vh"
        };
        const { ordererdItems } = this.state;

        const myOrders = this.state.ordererdItems.map((phone) =>
            <div className="col-12 col-md-6 col-lg-3 d-flex p-2" key={phone._id} >
                <div className="card flex-fill shadow-sm"  >
                    <div className="card-header text-primary">
                        {phone.mobileName}
                    </div>
                    <div className="view overlay">
                        <img className="img-thumbnail" src={phone.mobileImageUrl} alt="Card image cap" />
                    </div>
                    <div className="card-body">
                        <span className="text-primary font-weight-light ">£{phone.mobilePrice}</span>
                        <div>
                            <a className=" btn btn-info text-white" onClick={this.testFunction.bind(this, phone.mobileId)} >Buy Again
                            </a>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <p>Ordered on: {phone.orderedAt}</p>
                    </div>
                </div>
            </div>
        );
        const { wishedItems } = this.state;

        const myWishedItems = wishedItems.map((phone) =>
            <div className="col-12 col-md-6 col-lg-3 d-flex p-2" key={phone._id} >
                <div className="card flex-fill shadow-sm"  >
                    <div className="card-header text-primary">
                        {phone.mobileName}
                    </div>
                    <div className="view overlay">
                        <img className="img-thumbnail" src={phone.mobileImageUrl} alt="Card image cap" />
                    </div>
                    <div className="card-body">
                        <span className="text-primary font-weight-light ">{phone.mobilePrice}</span>
                        <div>
                            <a className=" btn btn-info text-white" onClick={this.testFunction.bind(this, phone.mobileId)} >Buy Now
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        );
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
                        <div className="container text-center">
                            <div className="row" >
                                {myOrders}

                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <div className="container text-center">
                            <div className="row">
                                {myWishedItems}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserDashboardComponent);
