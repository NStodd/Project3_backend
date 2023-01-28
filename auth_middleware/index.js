const jwt = require("jsonwebtoken")
const {SECRET} = process.env
const auth = async(request, response, next) => {
    try{
    // Authorization : token "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1icmFfcmNobWFuMTEiLCJpYXQiOjE2NzQ3OTM1NTJ9.Irb0cYPdQCaZl1wvlC-F9jVq9mTDZYALifd3QPL8S3k"
    if(request.headers.authorization){
        console.log("hello")
        const token = request.headers.authorization.split(" ")[1]
        console.log(token)
        const payload = await jwt.verify(token, SECRET)
        console.log(payload)
        if(payload){
            request.payload = payload
            next()
        }
        else{
            response.status(400).json()
        }
    }
    else{
        response.status(400).json({error: "No Authorized Headers....or Incorrect Authorized Header Input"})
    }}
    catch(error){
        response.status(400).json({error})
    }
}

module.exports = auth
