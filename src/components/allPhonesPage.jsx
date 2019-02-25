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
    getBestSelling(){
        fetch(process.env.REACT_APP_ECOM_API_URL+"/bestSelling")
        .then(function (response) {
            return response.json();
        }).then(myJson =>{
            console.log(myJson)
            this.setState({ mobilePhones : myJson.result})
        })
    }
    getMostlyReviewed(){
        fetch(process.env.REACT_APP_ECOM_API_URL+"/mostlyReviewed")
        .then(function (response) {
            return response.json();
        }).then(myJson =>{
            console.log(myJson)
            this.setState({ mobilePhones : myJson.result})
        })
    }
    getLowToHigh(){
        fetch(process.env.REACT_APP_ECOM_API_URL+"/lowToHigh")
        .then(function (response) {
            return response.json();
        }).then(myJson =>{
            console.log(myJson)
            this.setState({ mobilePhones : myJson.result})
        })
    }
    getHighToLow(){
        fetch(process.env.REACT_APP_ECOM_API_URL+"/highToLow")
        .then(function (response) {
            return response.json();
        }).then(myJson =>{
            console.log(myJson)
            this.setState({ mobilePhones : myJson.result})
        })
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_ECOM_API_URL+"/allPhones")
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
                  <div className="container">
                    <div className="row">
                        <div className="col">
                        <div className="p-3 mb-2 text-center">
                            <button type="button" className="btn btn-outline-info m-1">Samsung</button>
                            <button type="button" className="btn btn-outline-info m-1">Apple</button>
                        </div>
                        </div>
                        <div className="col">
                        <div className="p-3 mb-2 text-white">

                            <div className="dropdown  text-left">
                            <label className="text-body pr-1">Sort By</label>
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                Mix
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={this.getLowToHigh.bind(this)}>Low to High</a>
                                <a className="dropdown-item" onClick={this.getHighToLow.bind(this)}>High to Low</a>
                                <a className="dropdown-item" onClick={this.getMostlyReviewed.bind(this)}>Mostly Reviewed</a>
                                <a className="dropdown-item" onClick={this.getBestSelling.bind(this)} >Best Selling</a>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
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
