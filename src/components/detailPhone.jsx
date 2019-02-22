import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import myClass from 
import "./detailPhone.css"
import authservice from "../services/authenticationService";

class DetailPhoneComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.userIsLoggedIn)
        console.log(authservice.authservice())
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
            success: false,
            loggInMessage: "",
            selectedSizeVariant: "",
            selectedColorVariant: "",
            tokenValidationBool: "",
            reviewStarCount: [1, 2, 3, 4, 5],
            givenStar: 0,
            userReviews: [],
            totalReviewCount: 0,
            userGivenStar: 0,
            userGivenOpinion: "",
            oneStars: 0,
            twoStars: 0,
            threeStars: 0,
            fourStars: 0,
            fiveStars: 0,
            questionAndAnswers: [],
            questionAndAnswersCount: 0,
            question: "",
            selectedQuestion: "",
            myAnswer: "",
            myQuestion: "",
        };
        this.addToBasket = this.addToBasket.bind(this);
        this.myFunction = this.myFunction.bind(this);
        this.sendReview = this.sendReview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }
    myFunction(e) {
        this.setState({ userGivenStar: e.target.value })
    }
    handleChange(event) {
        this.setState({ userGivenOpinion: event.target.value });
    }
    loadQuestionIntoModal(qandA) {
        this.setState({ question: qandA.question })
        this.setState({ selectedQuestion: qandA });
    }
    handleQuestionChange(event) {
        this.setState({ myQuestion: event.target.value })
    }
    handleAnswerChange(event) {
        this.setState({ myAnswer: event.target.value });
    }
    setSizeVariant(sizeVariant) {
        this.setState({ selectedSizeVariant: sizeVariant })
    }
    setColourVariant(colourVariant) {
        this.setState({ selectedColorVariant: colourVariant })
    }
    checkTokenValidation() {
        fetch("http://localhost:3000/checkToken", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(myJson => {
                this.setState({ tokenValidationBool: myJson.Message })
                return this.state.tokenValidationBool;
            });
        return this.state.tokenValidationBool;
    }
    sendQuestion() {
        fetch("http://localhost:3000/postQuestion/", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: new URLSearchParams(
                "userId=" +
                localStorage.getItem("userId") +
                "&userName=" +
                localStorage.getItem("name") +
                "&question=" +
                this.state.myQuestion +
                "&mobileId=" +
                this.state.mobilePhone.mobileId
            ) // body data type must match "Content-Type" header
        })
            .then(function (response) {
                return response.json();
            })
            .then(myJson => {
                console.log(myJson);
                if (myJson.Message != "Success") {
                    this.setState({ loggInMessage: myJson.Message + "! Please Login Before continuing" })
                    setTimeout(
                        function () {
                            this.setState({ loggInMessage: "" })
                        }.bind(this),
                        2000
                    );
                } else {
                    this.setState({ success: true })
                    setTimeout(
                        function () {
                            this.setState({ success: false });
                            var element = document.getElementById(
                                "loadQuestionIntoModalCloseButton"
                            );
                            element.click();
                            this.componentDidMount();
                        }
                            .bind(this),
                        3000
                    );
                }
            });
    }
    sendAnswer() {
        console.log(this.state.myAnswer);
        fetch("http://localhost:3000/postAnswer/", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: new URLSearchParams(
                "userId=" +
                localStorage.getItem("userId") +
                "&userName=" +
                localStorage.getItem("name") +
                "&answer=" +
                this.state.myAnswer +
                "&questionId=" +
                this.state.selectedQuestion._id
            ) // body data type must match "Content-Type" header
        })
            .then(function (response) {
                return response.json();
            })
            .then(myJson => {
                console.log(myJson);
                if (myJson.Message != "Success") {
                    this.setState({ loggInMessage: myJson.Message + "! Please Login Before continuing" })
                    setTimeout(
                        function () {
                            this.setState({ loggInMessage: "" })
                        }.bind(this),
                        2000
                    );
                } else {
                    this.setState({ success: true })
                    setTimeout(
                        function () {
                            this.setState({ success: false });
                            var element = document.getElementById("AnswerModalcloseButton");
                            element.click();
                            this.componentDidMount();
                        }
                            .bind(this),
                        3000
                    );
                }
            });
    }
    sendReview(event) {
        this.setState({ userGivenOpinion: event.target.value });
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem("userId");
        // console.log(this.checkTokenValidation());
        // if (this.checkTokenValidation()) {
        fetch("http://localhost:3000/writeMyReview/", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": "Bearer " + token
            },
            body: new URLSearchParams("userId=" + userId +
                "&userName=" + localStorage.getItem("name") +
                "&noOfStars=" + this.state.userGivenStar +
                "&opinionText=" + this.state.userGivenOpinion + // body data type must match "Content-Type" header
                "&mobileId=" + this.state.mobilePhone.mobileId), // body data type must match "Content-Type" header

        }).then(function (response) {
            return response.json();
        }).then(myJson => {
            console.log(myJson);
            if (myJson.Message != "success") {
                this.setState({ loggInMessage: myJson.Message + "! Please Login Before continuing" })
                setTimeout(
                    function () {
                        this.setState({ loggInMessage: "" })
                    }.bind(this),
                    2000
                );
            } else {
                this.setState({ success: true })
                setTimeout(
                    function () {
                        this.setState({ success: false });
                        var element = document.getElementById("closeButton");
                        element.click();
                        this.componentDidMount();
                    }
                        .bind(this),
                    3000
                );
            }
        })
    }
    addToBasket(phone) {
        console.log(phone)
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem("userId")
        // Requires:  userId,mobileId,mobileName,mobilePrice,mobileImageUrl
        // var userId = localStorage.getItem("userId")
        var mobileId = phone.mobileId;
        var mobileName = phone.mobileName;
        var mobilePrice = phone.mobilePrice;
        var mobileImageUrl = phone.imageUrl;
        fetch("http://localhost:3000/basket", {
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
            console.log(myJson.Message);
            if (myJson.Message != "success") {
                this.setState({ loggInMessage: myJson.Message + " ! Please Login Before continuing" })
                setTimeout(
                    function () {
                        this.setState({ loggInMessage: "" })
                    }.bind(this),
                    2000
                );
            } else {
                this.setState({ success: true })
                setTimeout(
                    function () {
                        this.setState({ success: false });
                    }
                        .bind(this),
                    3000
                );
            }
        })
    }

    addToWishlist(phone) {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token")
        var mobileId = phone.mobileId;
        fetch("http://localhost:3000/myWishedProduct", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": "Bearer " + token
            },
            body: new URLSearchParams("userId=" + userId +
                "&mobileId=" + mobileId), // body data type must match "Content-Type" header

        }).then(function (response) {
            return response.json();
        }).then(myJson => {
            console.log(myJson.Message);
            if (myJson.Message != "success") {
                this.setState({ loggInMessage: myJson.Message + "! Please Login Before continuing" })
                setTimeout(
                    function () {
                        this.setState({ loggInMessage: "" })
                    }.bind(this),
                    2000
                );
            } else {
                this.setState({ loggInMessage: myJson.Content })
                // this.setState({ success: true })
                setTimeout(
                    function () {
                        // this.setState({ success: false });
                        this.setState({ loggInMessage: "" })
                    }
                        .bind(this),
                    3000
                );
            }
        })
    }
    componentDidMount() {

        const mobileIdToSearch = this.props.match.params.mobileid;
        var url = new URL("http://localhost:3000/getPhone/" + mobileIdToSearch)
        var params = { mobileId: mobileIdToSearch }
        url.search = new URLSearchParams(params)

        const colorVariant = [];
        fetch("http://localhost:3000/getPhone/" + mobileIdToSearch)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
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
                var tempColours = details.colourVariant;
                for (let key in tempColours) {
                    let value = tempColours[key];
                    this.setState({ phoneDetails: details })
                    colorVariant.push(value);
                }
                this.setState({ colorVar: colorVariant })
                console.log(this.state.mobilePhone)
            })
        fetch("http://localhost:3000/productReview/" + mobileIdToSearch)
            .then(function (response) {
                return (response.json())
            }).then(function (jsonVal) {
                return jsonVal
            }).then(reviews => {
                console.log(reviews);
                if (reviews.reviews != "None") {
                    this.setState({ totalReviewCount: reviews.totalReviews })
                    this.setState({ userReviews: reviews.reviews })
                    this.setState({ givenStar: reviews.ratings });

                    this.setState({ oneStars: parseInt(parseInt(reviews.oneStars) / parseInt(reviews.totalReviews) * 100 + "%") })
                    this.setState({ twoStars: parseInt(parseInt(reviews.twoStars) / parseInt(reviews.totalReviews) * 100 + "%") })
                    this.setState({ threeStars: parseInt(parseInt(reviews.threeStars) / parseInt(reviews.totalReviews) * 100 + "%") })
                    this.setState({ fourStars: parseInt(parseInt(reviews.fourStars) / parseInt(reviews.totalReviews) * 100 + "%") })
                    this.setState({ fiveStars: parseInt(parseInt(reviews.fiveStars) / parseInt(reviews.totalReviews) * 100 + "%") })
                    // console.log(this.state.oneStars);
                    this.setState({ oneStars: this.state.oneStars + "%" })
                    this.setState({ twoStars: this.state.twoStars + "%" })
                    this.setState({ threeStars: this.state.threeStars + "%" })
                    this.setState({ fourStars: this.state.fourStars + "%" })
                    this.setState({ fiveStars: this.state.fiveStars + "%" })
                    // console.log(this.state.oneStars);
                } if (reviews.reviews == "None") {
                    this.setState({ totalReviewCount: 0 })
                    this.setState({ userReviews: [] });
                }
            });
        fetch("http://localhost:3000/getQAndAs/" + mobileIdToSearch)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                return myJson;
            })
            .then(details => {
                console.log(details.qAndAs);
                if (details.qAndAs != "None") {
                    console.log(this.state.questionAndAnswers);
                    this.setState({ questionAndAnswers: details.qAndAs });
                    console.log(this.state.questionAndAnswers);
                    this.setState({ questionAndAnswersCount: 1 })
                }
                if (details.qAndAs == "None") {
                    console.log("its none")
                    this.setState({ questionAndAnswers: [] })
                    this.setState({ questionAndAnswersCount: 0 })
                }
                console.log(this.state.questionAndAnswers.length)
            })
    }
    render() {
        const colourVariants = Object.keys(this.state.mobilePhone.colourVariant).map(color =>
            <span className="btn btn-outline-primary font-weight-light text-capitalize mr-1 " onClick={this.setColourVariant.bind(this, this.state.mobilePhone.colourVariant[color])}>
                {this.state.mobilePhone.colourVariant[color]}
            </span>
        );

        const tifOptions = Object.keys(this.state.mobilePhone.sizeVariant).map(key =>
            <span value={key} key={key} className="btn btn-outline-primary font-weight-light text-capitalize mr-1" onClick={this.setSizeVariant.bind(this, this.state.mobilePhone.sizeVariant[key])} >
                {this.state.mobilePhone.sizeVariant[key]}
            </span>
        )

        const fullSpec = Object.keys(this.state.mobilePhone.fullSpec).map((spec, index) =>
            <tr key={index} >
                <th>{index}</th>
                <th scope="row">{spec}</th>
                <td >{this.state.mobilePhone.fullSpec[spec]}</td>
            </tr>
        )
        const phone = this.state.mobilePhone;
        const postQuestion =
            (
                <div>
                    <hr />
                    <div className="text-left">
                        <p className="font-weight-bold">Answer a question</p>
                        <button type="button" className="btn btn-outline-info btn-block" data-toggle="modal" data-target="#postQuestion">Post
                        question</button>
                    </div>
                </div>
            );
        const postAnswer =
            (
                <div className="shadow p-3 mb-5 mt-4 bg-light rounded text-left">
                    <p className="font-weight-light">Write your answer</p>
                    <div className="form-group">
                        <p className="font-weight-bold">Qualty of camera ?</p>
                        <textarea className="form-control" rows="5" placeholder="your answer" id="comment"></textarea>
                    </div>
                    <button type="button" className="btn btn-primary">Post Answer</button>

                </div>
            );
        const questionAndAnswer =
            (
                <div className="shadow  p-3 mb-5 mt-4 bg-light rounded text-left">
                    <div className="border border-primary p-3 mb-5 mt-4 bg-light rounded">
                        <p className="font-weight-bold">Qualty of camera ?</p>
                        <p className="font-weight-normal">Decent camera, for the budget phone its decent.</p>
                        <div className="card-footer text-muted">
                            Answered by sam
                    </div>
                    </div>
                    <div className="border border-primary p-3 mb-5 mt-4 bg-light rounded">
                        <p className="font-weight-bold">Qualty of camera ?</p>
                        <p className="font-weight-normal">Decent camera, for the budget phone its decent.</p>
                        <div className="card-footer text-muted">
                            Answered by sam
                    </div>
                    </div>
                </div>
            );
        // const ShortAnswer = ({ allAnswers }) => { allAnswers.map((item) => <li>{item}</li>) }

        const ShortAnswer = ({ allAnswers }) =>
            [...Array(allAnswers.length)].map((answer, i) =>
                <div className="p-1 ml-3 mb-2 mt-2" key={i}>
                    <p className="font-weight-light">{allAnswers[i].answer}</p>
                    <div className="card-footer text-muted">
                        <img className="bg-secondary userIcon" src={"https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars/default._CR0,0,1024,1024_SX48_.png"} />
                        Answered by{allAnswers[i].userName}
                    </div>
                </div>
            )
        const LongAnswer = ({ allAnswers }) =>
            [...Array(allAnswers.length)].map((answer, i) =>
                <div className="p-1 ml-3 mb-2 mt-2" key={i}>
                    <p className="font-weight-light">{allAnswers[i].answer}</p>
                    <div className="card-footer text-muted">
                        <img className="bg-secondary userIcon" src="https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars/default._CR0,0,1024,1024_SX48_.png" />
                        Answered by {allAnswers[i].userName}
                    </div>
                </div>
            )
        const questionAndAnswersComp = this.state.questionAndAnswers.map((qAndAs) =>
            <div key={qAndAs._id} className="shadow bg-light rounded text-left" >
                <div className="border  p-3 mb-5 mt-4">
                    <p className="font-weight-bold  text-primary">{qAndAs.question}</p>
                    <div className="card-footer text-muted">
                        <img className="bg-secondary userIcon" src={"https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars/default._CR0,0,1024,1024_SX48_.png"} />
                        {qAndAs.userName}
                        <span className="float-right mt-1">
                            <a className=" btn btn-info text-light btn-sm" onClick={this.loadQuestionIntoModal.bind(this, qAndAs)} data-toggle="modal" data-target="#writingAnAnswer">
                                Answer {qAndAs.userName} question </a>
                        </span>
                    </div>
                    {qAndAs.answers.length < 2 ? (
                        <ShortAnswer allAnswers={qAndAs.answers} />
                    ) :
                        <div className="accordion" id="accordionExample">
                            <h5 className="mb-0">
                                <button className="btn btn-link " type="button" data-toggle="collapse"
                                    aria-expanded="false" aria-controls="collapseOne">
                                    <i className="fas fa-chevron-circle-down"></i>
                                </button>
                                <span className="btn btn-link fullSpecLink" data-toggle="collapse" data-target={"#demo" + qAndAs._id}
                                    aria-expanded="false" aria-controls="collapseOne">View answer</span>
                            </h5>
                            <div id={"demo" + qAndAs._id} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <LongAnswer allAnswers={qAndAs.answers} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        );

        const viewsStars = this.state.reviewStarCount.map((stars, index) =>
            <span className="text-left" key={index}>
                {stars <= this.state.givenStar ? (
                    <span className="fa fa-star checked"></span>
                ) :
                    <span className="fa fa-star noStar"></span>
                }
            </span>
        );

        const n = 5; // Or something else
        const GivenStarsInReview = ({ noOfStars }) =>
            [...Array(n)].map((e, i) =>
                <span className="text-left">
                    {i + 1 <= noOfStars ? (
                        <span className="fa fa-star checked"></span>
                    ) :
                        <span className="fa fa-star noStar"></span>
                    }
                </span>
            )

        const OneStarBarWidth = {
            width: this.state.oneStars
        };
        const TwoStarBarWidh = {
            width: this.state.twoStars
        };
        const ThreeStarBarWidh = {
            width: this.state.threeStars
        };
        const FourStarBarWidh = {
            width: this.state.fourStars
        };
        const FiveStarBarWidh = {
            width: this.state.fiveStars
        };
        const writeReview =
            (
                <span className="text-left">
                    <p className="text-center">
                        {this.state.totalReviewCount} Cutomer Reviews
                </p>
                    <div className="row rounded">
                        <div className="side">
                            <div>5 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                                <div style={FiveStarBarWidh} className="bar-5"></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.fiveStars}</div>
                        </div>
                        <div className="side">
                            <div>4 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                                <div style={FourStarBarWidh} className="bar-4"></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.fourStars}</div>
                        </div>
                        <div className="side">
                            <div>3 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                                <div style={ThreeStarBarWidh} className="bar-3"></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.threeStars}</div>
                        </div>
                        <div className="side">
                            <div>2 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                                <div className="bar-2" style={TwoStarBarWidh} ></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.twoStars}</div>
                        </div>
                        <div className="side">
                            <div>1 star</div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                                <div className="bar-1" style={OneStarBarWidth} ></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{this.state.oneStars}</div>
                        </div>
                    </div>
                </span>
            );
        const allReviews =
            this.state.userReviews.map(review =>
                <div key={review._id} className="shadow bg-light rounded text-left">
                    <div className="border  p-3 mb-5 mt-4">
                        <div className="mt-1 mb-1 starRating">
                            <GivenStarsInReview noOfStars={review.noOfStars} />
                        </div>
                        <p className="font-weight-bold">{review.opinion}</p>
                        <p className="font-weight-normal">{review.opinion}</p>
                        <div className="card-footer text-muted">
                            <img src={"https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars/default._CR0,0,1024,1024_SX48_.png"}
                                className="bg-secondary userIcon" />
                            {review.userName}
                        </div>
                    </div>
                </div>
            );

        return (

            <div>
                <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Review</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container text-left">
                                    {this.state.success &&
                                        <div className="alert alert-success mt-2" role="alert">
                                            Success
                                </div>
                                    }
                                    {this.state.loggInMessage.length > 0 &&
                                        <div className="alert alert-info mt-2" role="alert">
                                            {this.state.loggInMessage}
                                        </div>
                                    }
                                    <span>Stars</span>
                                    <div>
                                        <fieldset className="rating">
                                            <input type="radio" id="star5" name="rating" value="5" onClick={this.myFunction.bind(this)} /><label className="full"
                                                for="star5"></label>
                                            <input type="radio" id="star4" name="rating" value="4" onClick={this.myFunction} /><label className="full"
                                                for="star4"></label>
                                            <input type="radio" id="star3" name="rating" value="3" onClick={this.myFunction} /><label className="full"
                                                for="star3"></label>
                                            <input type="radio" id="star2" name="rating" value="2" onClick={this.myFunction} /><label className="full"
                                                for="star2"></label>
                                            <input type="radio" id="star1" name="rating" value="1" onClick={this.myFunction} /><label className="full"
                                                for="star1"></label>
                                        </fieldset>
                                    </div>
                                    <hr className="customTopLine customBottonLine"></hr>
                                    <span>Comment</span>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">With textarea</span>
                                        </div>
                                        <textarea className="form-control" value={this.state.userGivenOpinion} onChange={this.handleChange} aria-label="With textarea"></textarea>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="closeButton" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" onClick={this.sendReview} >Post Review</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade bd-example-modal-lg"
                    id="writingAnAnswer"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Write answer</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container text-left">
                                    {this.state.success &&
                                        <div className="alert alert-success mt-2" role="alert">
                                            Success
                                </div>
                                    }
                                    {this.state.loggInMessage.length > 0 &&
                                        <div className="alert alert-info mt-2" role="alert">
                                            {this.state.loggInMessage}
                                        </div>
                                    }
                                    <div>{this.state.question}</div>
                                    <hr className="customTopLine customBottonLine" />
                                    <span>Enter your answer</span>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">With textarea</span>
                                        </div>
                                        <textarea className="form-control" value={this.state.myAnswer} onChange={this.handleAnswerChange} aria-label="With textarea"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    id="AnswerModalcloseButton"
                                    data-dismiss="modal"
                                >Close</button>
                                <button type="button" className="btn btn-success" onClick={this.sendAnswer.bind(this)}>Post Answer</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="modal fade bd-example-modal-lg"
                    id="postQuestion"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Ask your question</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container text-left">
                                    {this.state.success &&
                                        <div className="alert alert-success mt-2" role="alert">
                                            Success
                                </div>
                                    }
                                    {this.state.loggInMessage.length > 0 &&
                                        <div className="alert alert-info mt-2" role="alert">
                                            {this.state.loggInMessage}
                                        </div>
                                    }
                                    <hr className="customTopLine customBottonLine" />
                                    <span>Enter your question</span>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Question</span>
                                        </div>
                                        <textarea className="form-control" value={this.state.myQuestion} onChange={this.handleQuestionChange} aria-label="With textarea"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    id="loadQuestionIntoModalCloseButton"
                                    data-dismiss="modal"
                                >Close</button>
                                <button type="button" className="btn btn-success" onClick={this.sendQuestion.bind(this)}>Post Question</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="detailPageBody bg-light mt-2">
                    <div className="container bg-white">
                        {this.state.success &&
                            <div className="alert alert-success mt-2" role="alert">
                                Success
                        </div>
                        }
                        {this.state.loggInMessage.length > 0 &&
                            <div className="alert alert-info mt-2" role="alert">
                                {this.state.loggInMessage}
                            </div>
                        }
                        <div className="row p-3">
                            <div className=" col-md-6">
                                <div className="imagePlaceHolder text-center">
                                    <img src={phone.imageUrl} />
                                </div>
                            </div>
                            <div className=" col-md-6 ">
                                <div className="text-left">
                                    {this.state.totalReviewCount > 0 ? (
                                        <span> {viewsStars}
                                            <span className="text-left"> {this.state.totalReviewCount} Cutomer Reviews</span>
                                        </span>
                                    ) : <span className="font-weight-light">No Reviews</span>
                                    }


                                </div>
                                {/* <span class="totalReviews"> {{ totalNoOfReviews }} customer reviews</span> */}
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

                                    <button type="button" onClick={this.addToBasket.bind(this, phone)} className="m-1 btn btn-primary font-weight-bold text-center text-uppercase shadow-lg" >Add
          to basket</button>
                                    <button type="button" onClick={this.addToWishlist.bind(this, phone)} className="m-1 btn btn-primary font-weight-bold text-center text-uppercase shadow-lg">Add
          to wish list</button>
                                </div>
                            </div>
                        </div >
                        <div className="shadow p-3 mb-5 mt-4 bg-light rounded border border-primary">
                            <p className=" font-weight-light text-capitalize text-center" style={{ fontSize: 1.5 + "rem" }}>Top Spec</p>

                            <div className="row text-center p-2 ">
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
                            <div className="text-center">
                                <span className="text-center btn btn-link text-primary viewFullSpecLink" data-toggle="collapse" data-target="#collapseOne"
                                    aria-expanded="false" aria-controls="collapseOne">VIEW FULL SPECIFICATIONS</span>
                            </div>
                        </div>

                        <div className="shadow p-3 mb-5 bg-light rounded border border-info">
                            <div className="accordion" id="accordionExample">
                                <div className="text-left">
                                    <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link " type="button" data-toggle="collapse" data-target="#collapseOne"
                                                aria-expanded="false" aria-controls="collapseOne">
                                                <i className="fas fa-chevron-circle-down fa-2x"> </i>
                                            </button>
                                            <span className="btn btn-link fullSpecLink" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false"
                                                aria-controls="collapseOne">TECHNICAL SPECIFICATIONS</span>
                                        </h5>
                                    </div>
                                </div>

                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <p className="font-weight-light text-capitalize text-center">Full Spec</p>
                                        <table className="table table-striped">
                                            <tbody>
                                                {fullSpec}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light rounded text-center p-3 mb-5">
                            <p className=" font-weight-light text-capitalize text-center" >Customer questions & answers</p>
                            <div className="row">
                                <div className="col-sm-8">
                                    {this.state.questionAndAnswersCount > 0 ?
                                        (
                                            <div>
                                                {questionAndAnswersComp}
                                            </div>
                                        ) : <div className="font-weight-light">No Question and answers! Be the first to Question</div>
                                    }
                                </div>
                                <div className="col-sm-4">
                                    {postQuestion}
                                </div>
                            </div>
                        </div>

                        <div className="bg-light rounded text-center p-3 mb-5">
                            <p className=" font-weight-light text-capitalize text-center">Reviews</p>
                            <div className="row">
                                <div className="col-sm-4 ">
                                    {writeReview}
                                    <hr className="customLine"></hr>
                                    <div className="text-left">
                                        <p className="font-weight-bold">Review this product</p>
                                        <p className="font-weight-normal">Share your thoughts with other customers</p>
                                        <button type="button" className="btn btn-outline-info btn-block" data-toggle="modal" data-target="#exampleModalCenter">Write
                                        a customer review</button>
                                    </div>
                                </div>
                                <div className="col-sm-8">

                                    {this.state.totalReviewCount > 0 ? (
                                        <div>
                                            {allReviews}
                                        </div>
                                    ) : <span className="font-weight-light">No Reviews</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// withRouter(DetailPhoneComponent)
export default withRouter(DetailPhoneComponent);
