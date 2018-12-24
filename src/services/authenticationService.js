var data = "initial";
function authservice() {
    //convert input to output
    // console.log(data);
    // data = "sammmerere";
    return data;
}
function setData(dataCameIn) {
    // console.log(dataCameIn);
    // console.log(data);
    data = dataCameIn;
    // console.log(data);
    // isAuthenticated();
}
function isLoggedIn() {
    // Checking if the token exists or checking the expiration of the token
    // if authservice returns true it means token is not valid 
    if (localStorage.getItem("token") && null || this.isAuthenticated()) {
        this.isLoggedin = false;
        return this.isLoggedin;
    }
    else {
        return true;
    }
}

function isAuthenticated() {
    const token = localStorage.getItem('token');
    console.log(token)
    fetch("http://localhost:3000/checkToken", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Authorization": "Bearer "+ token
        },
    }).then(function (response) {
        return response.json();
    })
        // .then(response => response.json())
        .then(myJson => {
            console.log((myJson));
            // localStorage.setItem("email", myJson.email)
            // localStorage.setItem("userId", myJson.userId)
            // localStorage.setItem("name", myJson.name)
            // localStorage.setItem("token", myJson.token)
            // this.setState({
            //     name: myJson.name
            // })
            var data = myJson.Message
            console.log(data)
            return data;
        })
}
module.exports = {
    authservice: authservice, setData,isAuthenticated
};