import React, { Component } from 'react';
import './homePage.css';
import BestSelling from "./bestSelling";
import MostlyWished from "./mostlyWished";
import MostlyReviewed from "./mostlyReviewed";
class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="landingPage">
                    {/* <div className="col col1"> */}
                    <div className=" titlePageText text-white text-uppercase position-sticky">
                        <p className="display-4">React Store</p>
                        <hr></hr>
                    </div>
                    {/* </div> */}
                </div>
                <BestSelling />
                <MostlyWished />
                <MostlyReviewed />
            </div>
        )
    }
}

export default HomePage;
