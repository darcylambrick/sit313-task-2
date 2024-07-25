const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req,res)=>{
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    const data = {
        members:[{
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    }
    jsonData = JSON.stringify(data)

    const url = "https://us13.api.mailchimp.com/3.0/lists/ed75e229e0"
    const options = {
        method:"POST",
        auth:"darcy:f6fdfc65501826c66fcf3095f9be8fab-us13"
    }


    const request = https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
console.log(firstname,lastname,email)
}) 

app.listen(5000, (req,res)=>{
    console.log("Server is running on port 5000")
})