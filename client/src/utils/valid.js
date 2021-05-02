/* eslint-disable no-useless-escape */
const valid = ({fullname, username, password, email, cf_password}) =>{
    const err = {}

    if(!fullname) {
        err.fullname ="Please add your full name"
    } else if(fullname.length > 25) {
        err.fullname = "full nmae greater than 25 characters long"
    }

    
    if(!username) {
        err.username ="Please add a username"
    } else if(username.replace(/ /g, '').length > 25) {
        err.username = "Username is greater than 25 characters long"
    }

    if(!email) {
        err.email ="Please add your email address"
    } else if(!validateEmail(email)) {
        err.email = "Email format is incorrect"
    }

    if(!password) {
        err.password ="Please enter your password"
    } else if(password.length < 6) {
        err.password = "Password must be at least 6 characters long"
    }

    if(password !== cf_password) {
        err.cf_password ="Passwords do not match"
    }

    return{
        errMsg: err,
        errLength: Object.keys(err).length
    }
}


function validateEmail(email) {
    //esLint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = valid