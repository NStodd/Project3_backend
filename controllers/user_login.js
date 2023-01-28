// Dependencies
require("dotenv").config()
const User = require("./User")
const {Router} = require("express")
const bcryptjs = require("bcryptjs")
// json token // jwt also known as jot
/* JSON Web Token (JWT) is an open standard (RFC 7519) 
that defines a compact and self-contained way for securely 
transmitting information between parties as a JSON object. 
This information can be verified and trusted because it is digitally signed. 
JWTs can be signed using a secret (with the HMAC algorithm) or 
a public/private key pair using RSA or ECDSA.*/
const jwt = require("jsonwebtoken")
const router = Router()
const {SECRET} = process.env


router.post("/recipe_user_signup", async(request, response)=>{
    try{
        request.body.password = await bcryptjs.hash(request.body.password, 10)
        // console.log(request.body)
        const new_User = User.create(request.body)
        //response.status(200).json(new_User)
        response.json(new_User)
        console.log(request.body)
        console.log(new_User)
    }
    catch(error){
        //response.status(400).json(error)
        response.json(error)
    }
})
/*
router.get("/login_recipe", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/habits/")
    }
    else {
        res.render("user/login.ejs", {message: ""})
    }
})*/

router.post("/recipe_user_login", async(request, response)=>{
    try{
    const {username, password} = request.body
    const user = await User.findOne({username})
    if(user){
        const match = await bcryptjs.compare(password, user.password)
        if(match){
            const token = await jwt.sign({username}, SECRET);
            //response.status(200).json({token{})
            response.json(token)
            console.log(request.body, token)
        }
        else{
            //response.status(400).json({error: "Incorrect Password. Please Try Again....."})
            response.json({error: "Incorrect Password. Please Try Again....."})
        }
    }
    else{
        //response.status(400).json({error: "Incorrect Username. Please Try Again......."})
        response.json({user: "Incorrect Username. Please Try Again......."})
    }
}
    catch(error){
        //response.status(400).json({error: "Incorrect Username. Please Try Again......."})
        response.json({error: "Incorrect Username. Please Try Again......."})
    }
})

router.get('/logout', (req, res) => {
    // destroy the session and redirect to main page
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

module.exports = router;