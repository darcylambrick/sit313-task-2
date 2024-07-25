const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'darcylambrick@gmail.com',
    pass: 'lauyjvspixrpvutd'
  }
});

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
    
    var mailOptions = {
      from: 'darcylambrick@gmail.com',
      to: email,
      subject: 'Thank you for signing up',
      attachments: [{
        filename: 'logo.png',
        path: './public/images/logo.png',
        cid: 'logo'
      }],
      html:'<div class="header" style="background-color: darkcyan;text-align: left"><img src="cid:logo" alt="Deakin logo" width="200" height="200"></div><h1 style="font-size: 40px;font-family: Arial">Welcome to the Newsletter!</h1><p style="font-family: Arial">Thanks for signing up ' + firstname +' '+ lastname + '</p>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.sendFile(__dirname + "/index.html")
}) 

app.listen(5000, (req,res)=>{
    console.log("Server is running on port 5000")
})