import React, { Component } from 'react';
import "./mostlyWished.css"
class MostlyWished extends Component {

    render() {
        const itemName = this.state.hits.map((phone) =>
            <div className="col" key={phone.mobileId} >
                <div className="card"  >
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
                            <a className=" btn btn-info text-white" onClick={this.testFunction.bind(this,phone.mobileId)}>
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

                        {/* <ul>
                            {itemName}
                        </ul> */}
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
    testFunction(mobileId){
        console.log("HEllo, Im test function");
        console.log(mobileId)
    }
    componentDidMount() {
        const mostlyWishedArr = [];
        // this.state = {
        //     mobilePhone: [{}]
        // }

        // .then(response => response.json())
        // .then(data => mostlyWishedArr.push(data.result));
        //   console.log(mostlyWishedArr);
        //   console.log(mostlyWishedArr[0]);
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
                // this.state.setState({ hits: mostlyWished[0] })
                // console.log("last one  ", this.state);
            })


        // .then(response => response.json())
        // .then(response => console.log(response))
        // .then(data => console.log(data));



        // .then(data => this.setState({ hits: data }), function () {
        //     console.log(this.state.hits);
        // })

        // console.log(this.state.hits)


    }
}



export default MostlyWished;
