import React, { Component } from 'react';
import "./mostlyWished.css";
import { withRouter } from "react-router-dom";

class AllPhones extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mobilePhones: [],
        };
    }
    testFunction(mobileId) {
        console.log(mobileId);
        this.props.history.push("/detailPhone/" + mobileId)
    }
    componentDidMount() {
        fetch("http://localhost:3000/allPhones")
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log((myJson.result));
                return myJson.result;
            })
            .then(mostlyWished => {
                this.setState({ mobilePhones: mostlyWished });
                console.log(this.state)
            })
    }
    render() {
        const itemName = this.state.mobilePhones.map((phone) =>
            <div className="col-12 col-md-6 col-lg-3 d-flex p-2" key={phone.mobileId} >
                <div className="card flex-fill shadow-sm"  >
                    <div className="view overlay">
                        <img className="img-thumbnail" src={phone.mobileImageUrl} />
                    </div>
                    <div className="card-body">
                        {phone.mobileName}
                    </div>
                    
                    <div className="card-footer text-muted ">
                        <span className="float-left mt-1">
                            <span>{phone.mobilePrice}</span>
                        </span>
                        <span className="float-right">
                            <a className=" btn btn-info btn-sm text-white" onClick={this.testFunction.bind(this, phone.mobileId)}>
                                <span>
                                    <i className="lnr lnr-cart"></i>
                                </span>Select Phone</a>
                        </span>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                <div className="text-center">
                    <div className="container">
                        <div className="row">
                            {itemName}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AllPhones);
