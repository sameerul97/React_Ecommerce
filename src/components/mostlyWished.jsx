import React, { Component } from 'react';
import "./mostlyWished.css"
import { withRouter } from "react-router-dom";

class MostlyWished extends Component {

    render() {
        // card component
        const itemName = this.state.hits.map((phone) =>
            <div className="col d-flex" key={phone.mobileId} >
                <div className="card flex-fill shadow-sm"  >
                    <div className="view overlay">
                        <img className="img-thumbnail" src={phone.mobileImageUrl} />
                    </div>
                    <div className="card-body">
                        {phone.mobileName}
                    </div>
                    <div className="card-footer text-muted ">
                        <span className="float-center mt-1">
                            <span>{phone.mobilePrice}</span>
                        </span>
                        <span className="float-right">
                            <a className=" btn btn-info text-white" onClick={this.testFunction.bind(this, phone.mobileId)}>
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
                <div>
                    <div className="container">
                        <div className="display-4 p-2 text-center">Mostly Wished</div>
                        <div className="row">
                            {itemName}
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    constructor(props) {
        super(props);

        this.state = {
            hits: [],
        };
    }
    testFunction(mobileId) {
        console.log(mobileId);
        this.props.history.push("/detailPhone/" + mobileId)
    }
    componentDidMount() {
        const mostlyWishedArr = [];
        fetch("http://localhost:3000/mostlyWished")
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log((myJson.result));
                return myJson.result;
            })
            .then(mostlyWished => {
                this.setState({ hits: mostlyWished })
            })
    }
}



export default withRouter(MostlyWished);
