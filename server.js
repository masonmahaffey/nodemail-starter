// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var nodemailer  = require('nodemailer');
var cors        = require('cors');


// =================================================================
// configuration ===================================================
// =================================================================
// Make sure to never push this to github as people will see your actual password
var gmailEmail = 'YOUR GMAIL EMAIL HERE';
var gmailEmailPassword = 'YOUR GMAIL EMAIL PASSWORD HERE';
var myPort = 3003; // <--- CHANGE THE PORT YOU WANT THE SERVER TO RUN ON HERE



// =================================================================
// route-configuration ===================================================
// =================================================================
var port = process.env.PORT || myPort; // used to create, sign, and verify tokens
app.use(bodyParser.urlencoded({ extended: false })); // used to get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true})); //this kills CORS errors
app.use(morgan('dev'));// use morgan to log requests to the console


// =================================================================
// routes ==========================================================
// =================================================================
// create reusable transporter object using the default SMTP transport

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailEmailPassword
    }
});

app.post('/send/email', (req,res)=>{
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;


		let mailOptions = {
		    from: '"Portfolio Website"' + email, // sender address
		    to: gmailEmail, // list of receivers
		    subject: 'Contact form submission from portfolio ✔ ', // Subject line
		    // text: 'Hello world ?', // plain text body
		    html: 'Someone made a contact form submission on your portfolio website. <br/><br/> email: ' + email + '<br/> name: ' + name + '<br/> message: <br/>' + '<p>' + message + '</p>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info)=> {
		    if (error) {
		    	res.json({msg: '0'});
		        return console.log(error);
		    }
		    else{
		    	res.json({msg: '1'});
		    }
		    console.log(info.messageId, info.response);
		});
		

})

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Your email server is running at http://localhost:' + port);
