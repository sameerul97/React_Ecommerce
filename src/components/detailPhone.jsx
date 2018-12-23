import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import myClass from 
import "./detailPhone.css"
import authservice from "../services/authenticationService";

class DetailPhoneComponent extends Component {
    constructor(props) {
        super(props);
        // var className = new myClass;
        console.log(authservice.authservice())
        console.log(authservice.setData("BOIII"));
        console.log(authservice.authservice());

        this.state = {
            android: Boolean,
            mobilePhone: {
                _id: "",
                topSpec: {

                },
                mobileName: "",
                fullSpec: {

                },
                mobileStock: "",
                mobileId: "",
                mobilePrice: "",
                sizeVariant: {

                },
                colourVariant: {

                },
                imageUrl: ""
            },
            selectedSizeVariant: "",
            selectedColorVariant: ""
        };
    }
    setSizeVariant(sizeVariant){
        // console.log(sizeVariant);
        this.setState({selectedSizeVariant:sizeVariant})
    }
    setColourVariant(colourVariant){
        this.setState({selectedColorVariant:colourVariant})
    }
    componentDidMount() {
        console.log("Im detail comp")
        // console.log(this.props.match.params);
        // console.log(this.props.match.params.mobileid);
        const mobileIdToSearch = this.props.match.params.mobileid;
        console.log(mobileIdToSearch)
        var url = new URL("http://localhost:3000/getPhone/" + mobileIdToSearch)
        var params = { mobileId: mobileIdToSearch }
        // var params = [['lat', '35.696233'], ['long', '139.570431']]
        console.log(params.mobileId)
        url.search = new URLSearchParams(params)

        const colorVariant = [];
        fetch("http://localhost:3000/getPhone/" + mobileIdToSearch)
            .then(function (response) {
                return response.json();
            })
            // .then(response => response.json())
            .then(function (myJson) {
                console.log((myJson));
                return myJson.MobileData;
            })
            .then(details => {

                this.setState({ mobilePhone: details })

                this.setState({ selectedColorVariant: this.state.mobilePhone.colourVariant["colour1"] });
                this.setState({ selectedSizeVariant: this.state.mobilePhone.sizeVariant["size1"] });
                if (this.state.mobilePhone.topSpec.os == "Android") {
                    this.setState({ android: true });
                }
                else {
                    this.setState({ android: false });

                }
                console.log("last one  ", this.state.android);
                var tempColours = details.colourVariant;
                console.log(tempColours)
                for (let key in tempColours) {
                    let value = tempColours[key];
                    this.setState({ phoneDetails: details })
                    colorVariant.push(value);
                }
                this.setState({ colorVar: colorVariant })

                console.log(tempColours);
                console.log(colorVariant);
                console.log();
                console.log(this.state.mobilePhone);

            })
        // var temp = new URLSearchParams(this.props.location);
        // console.log(temp)
        // console.log(this.props.location.search);
        this.loginFunction()
    }
    loginFunction() {
        var userEmail = "sameerul97@gmail.com3"
        var userPassword = "saharjath12";


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
                localStorage.setItem("email", myJson.email)
                localStorage.setItem("userId", myJson.userId)
                localStorage.setItem("name", myJson.name)
                localStorage.setItem("token", myJson.token)

                return myJson.MobileData;
            })

    }
    render() {
        const colourVariants = Object.keys(this.state.mobilePhone.colourVariant).map(color =>
            <span className="btn btn-outline-primary font-weight-light text-capitalize mr-1 " onClick={this.setColourVariant.bind(this,this.state.mobilePhone.colourVariant[color])}>
                {this.state.mobilePhone.colourVariant[color]}
            </span>
        );

        const tifOptions = Object.keys(this.state.mobilePhone.sizeVariant).map(key =>
            <span value={key} className="btn btn-outline-primary font-weight-light text-capitalize mr-1" onClick={this.setSizeVariant.bind(this,this.state.mobilePhone.sizeVariant[key])} >
                {this.state.mobilePhone.sizeVariant[key]}
            </span>
        )

        const fullSpec = Object.keys(this.state.mobilePhone.fullSpec).map((spec, index) =>
            <tr >
                <th>{index}</th>
                <th scope="row">{spec}</th>
                <td >{this.state.mobilePhone.fullSpec[spec]}</td>
            </tr>
        )
        const phone = this.state.mobilePhone;

        return (
            <div>
                {/* <h1>{samName}</h1> */}
                <div className="detailPageBody bg-light">
                    <div className="container bg-white">
                        <div className="row p-3">
                            <div className=" col-md-6">
                                <div className="imagePlaceHolder text-center">
                                    <img src={phone.imageUrl} />
                                </div>
                            </div>
                            <div className=" col-md-6 ">
                                <p className="font-weight-bold text-left text-uppercase">{phone.mobileName}</p>
                                <p className=" font-weight-bold text-left text-uppercase">Size :
                                    <span className="font-weight-light text-capitalize">
                                        {this.state.selectedSizeVariant}
                                    </span>
                                </p>
                                <div className="text-left">
                                    {tifOptions}

                                </div>
                                <p className=" font-weight-bold text-left text-uppercase">Color :
                                    <span className="font-weight-light text-capitalize">
                                        {this.state.selectedColorVariant}
                                    </span>
                                </p>
                                <div className="text-left">
                                    {colourVariants}
                                </div>


                                <p className="font-weight-bold text-left text-uppercase">Availability :
                                    <span className="font-weight-light text-capitalize ">{phone.mobileStock}</span>
                                </p>
                                <p className="font-weight-bold text-left text-uppercase">Price
                                    <span className="font-weight-light text-capitalize">
                                        £{phone.mobilePrice}
                                    </span>
                                </p>
                                <div className="text-left">

                                    <button type="button" className="btn btn-primary font-weight-bold text-center text-uppercase shadow-lg" >Add
          to basket</button>
                                    <button type="button" className="btn btn-primary font-weight-bold text-center text-uppercase shadow-lg">Add
          to wish list</button>
                                </div>
                            </div>
                        </div >
                        <div className="shadow p-3 mb-5 mt-4 bg-light rounded">
                            <p className=" font-weight-light text-capitalize text-center" style={{ fontSize: "1.5rem;" }}>Top Spec</p>

                            <div className="row text-center p-2">
                                <div className="col">
                                    <i className="fas fa-camera fa-2x"></i>
                                    <p className="text-monospace font-weight-bold text-info">Camera</p>
                                    <p className="font-weight-light"> {this.state.mobilePhone.topSpec.camera}</p>
                                </div>
                                <div className="col">
                                    <i className="fas fa-battery-three-quarters fa-2x"></i>
                                    <p className="text-monospace font-weight-bold text-info">Battery</p>
                                    <p className="font-weight-light"> {this.state.mobilePhone.topSpec.battery}</p>
                                </div>
                                <div className="col">
                                    {this.state.android ? (
                                        <i className="fab fa-android fa-2x"></i>
                                    ) : (
                                            <i className="fab fa-apple fa-2x"></i>
                                        )}
                                    <p className="text-monospace font-weight-bold text-info">OS</p>
                                    <p className="font-weight-light"> {this.state.mobilePhone.topSpec.os} </p>
                                </div>
                                <div className="col">
                                    <i className="fas fa-hdd fa-2x"></i>
                                    <p className="text-monospace font-weight-bold text-info">Storage</p>
                                    <p className="font-weight-light"> {this.state.mobilePhone.topSpec.storage}</p>
                                </div>
                                <div className="col">
                                    <i className="fas fa-mobile-alt fa-2x"></i>
                                    <i className="far fa-mobile-android "></i>
                                    <p className="text-monospace font-weight-bold text-info">Display</p>
                                    <p className="font-weight-light"> {this.state.mobilePhone.topSpec.display} </p>
                                </div>
                            </div>
                        </div>
                        <div className="shadow p-3 mb-5 bg-light rounded">
                            <p className="font-weight-light text-capitalize text-center" >Full Spec</p>
                            <table className="table table-striped">

                                <tbody>
                                    {fullSpec}
                                </tbody>
                            </table>
                        </div>
                    </div >

                </div >
            </div >
        )
    }

}
// withRouter(DetailPhoneComponent)

export default withRouter(DetailPhoneComponent);
