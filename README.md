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


     if ((data.message.indexOf('011') == -1) && (data.message.indexOf('012') == -1)) {
		browserHistory.push('/');

		setTimeout(()=>{
		browserHistory.push('/features');

		}, 10);
		setTimeout(()=>{
		browserHistory.push('/login/account');

		}, 20);


      localStorage.setItem('token', data.token);
  	}
  	else{
  		alert(data.message)
  	}


    }
	}) .fail(function(jqXhr) {
console.log('failed');
});
```

If you have any questions or requests, an issue ticket on github.
