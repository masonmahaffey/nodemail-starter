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
var port = process.env.PORT || 3003; // used to create, sign, and verify tokens
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));
// use morgan to log requests to the console
app.use(morgan('dev'));


// =================================================================
// routes ==========================================================
// =================================================================
// create reusable transporter object using the default SMTP transport

var gmailEmail = 'YOUR GMAIL EMAIL HERE';
var gmailEmailPassword = 'YOUR GMAIL EMAIL PASSWORD HERE';
// Make sure to never push this to github as people will see your actual password

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
