import decode from "../../node_modules/jwt-decode";
function loginService() {
    console.log("H")
    return true;
}
// const authenticated = () => {
function authenticated() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log("HEr")
        return false;
    }
    try {
        // { exp: 12903819203 }
        const expiration = decode(token);
        console.log(expiration)
        console.log(expiration.exp)
        if (expiration.exp < new Date().getTime() / 1000) {
            return false;
        }

    } catch (e) {
        return false;
    }

    return true;
}
module.exports = {
    myloginservice: loginService, authenticated
};