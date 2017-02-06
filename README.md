# NodeMailer Email Sender - Starter

This is a repo for a starter server for sending emails to yourself or others through gmail using the nodemail node module. Just download and install and you have a good foundation for building application. 

## Installation
1. Download the repository
2. Install npm modules: `npm install`
4. Start up the server: `node server.js`
5. Test with Postman or connect using Jquery AJAX from your front-end

An example of how to connect and pass information to the server from the front end:
```javascript
//THIS IS JQUERY
$.ajax({
    url: 'http://localhost:3003/email/send',
    headers: {
        'Content-Type':'application/x-www-form-urlencoded'
    },
    method: 'POST',
    crossDomain: 'true',
    dataType: 'json',
    data: {'email':email,'password': password, 'number': phonenumber},
    success: (data)=>{
      console.log('YOU SEND THE DATA TO THE BACKEND!')
    }
	}) .fail(function(jqXhr) {
  console.log('failed');
});
```

If you have any questions or requests, an issue ticket on github.
