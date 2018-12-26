import React, { Component } from 'react';

class basketComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemInBasket: [],
            success: false,
            username: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
        };
    }

    testFunction(mobileId) {
        console.log(mobileId);
        this.props.history.push("/detailPhone/" + mobileId)
    }
    componentDidMount() {
        this.setState({ itemInBasket: [] })
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem("userId")
        console.log(token)
        fetch("http://localhost:3000/basket/" + userId, {
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
                if (myJson.basketItems != "None") {
                    this.setState({ itemInBasket: myJson.basketItems })
                }
            })
    }
    orderPhone(phone) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem("userId")
        console.log(token, phone);
        // Requires:  userId,mobileId,mobileName,mobilePrice,mobileImageUrl
        // var userId = localStorage.getItem("userId")
        var mobileId = phone.mobileId;
        var mobileName = phone.mobileName;
        var mobilePrice = phone.mobilePrice;
        var mobileImageUrl = phone.mobileImageUrl;
        fetch("http://localhost:3000/orderPhone/", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": "Bearer " + token
            },
            body: new URLSearchParams("userId=" + userId +
                "&mobileId=" + mobileId +
                "&mobileName=" + mobileName +
                "&mobilePrice=" + mobilePrice +
                "&mobileImageUrl=" + mobileImageUrl), // body data type must match "Content-Type" header

        }).then(function (response) {
            return response.json();
        }).then(myJson => {
            // console.log(myJson);
            this.setState({ success: true })
            setTimeout(
                function () {
                    this.setState({ success: false });
                }
                    .bind(this),
                3000
            );
            this.deleteItemInBasket(phone, token);
            
        })
    }
    deleteItemInBasket(phone, token) {
        console.log(phone._id)
        fetch("http://localhost:3000/basket/" + phone._id, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": "Bearer " + token
            }
        }).then(function (response) {
            return response.json();
        }).then(myJson => {
            console.log(myJson);
            this.componentDidMount();
        })
    }
    render() {
        const myBasket = this.state.itemInBasket.map((phone) =>
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
                            <a className=" btn btn-info text-white" onClick={this.orderPhone.bind(this, phone)}>Buy Now
                        </a>
                        </div>
                    </div>

                </div>
            </div>
        );
        return (
            <div>
                <div className="container text-center">
                    {this.state.success &&
                        <div className="alert alert-success mt-2" role="alert">
                            success, your order has been placed
                            </div>
                    }
                    <div className="row">
                        {myBasket}
                    </div>
                </div>
            </div >
        )
    }
}

export default basketComponent;
