const async = require("async");
const nodemailer = require('nodemailer');
const csrf       = require('csurf');

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// This will make a get request and render the index page for logging in a professional or client
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.getHome = (req, res) => {
	res.render('home/home.ejs', { 
		success: true, 
		error: req.flash('error'),
		message: req.flash('message'),
		csrfToken: req.csrfToken()
	});
};

module.exports.sendContactForm = (req, res) => {
	async.parallel({
		// get the list of centers
	    getContactForm: (callback) => {
	    	let	mailOptions, smtpTransport;

	    	//EMail SMTP Configuration
	    	smtpTransport = nodemailer.createTransport({
	    		host: "smtp.gmail.com", //Host name
	    		secureConnection: true, //use Secure Shell
	    		port: 465, //port for secure SMTP
	    		auth: {
	    			user: process.env.gmail_email,
	    			pass: process.env.gmail_password
	    		}
	    	});

	    	mailOptions = {
	    		to: process.env.gmail_email,
	    		from: req.body.name + ' <' + req.body.email + '>' ,
	    		subject: req.body.subject, 
	    		text: req.body.message + '\n \nFrom: ' + req.body.name  + ' \nEmail: ' + req.body.email
	    	}

	    	smtpTransport.sendMail(mailOptions, err =>{
    			return callback(err);
    		});
	    }
	}, (err, data) => {
	    if(err){
	    	req.flash('error', err);
	        return res.redirect('/');
	    } 

	    req.flash('message', 'Email has been successfully sent.');
	    res.redirect('/');
	});	
};


module.exports.getBlog = (req, res) => {
	res.render('blog/blog.ejs', { 
		success: true, 
		error: req.flash('error'),
		message: req.flash('message'),
		csrfToken: req.csrfToken()
	});
}

module.exports.getBlogStreet = (req, res) => {
	res.render('blog/blog-street-photography.ejs', { 
		success: true, 
		error: req.flash('error'),
		message: req.flash('message'),
		csrfToken: req.csrfToken()
	});
}

module.exports.getNoteMasses = (req, res) => {
	res.render('blog/blog-note-to-the-masses.ejs', { 
		success: true, 
		error: req.flash('error'),
		message: req.flash('message'),
		csrfToken: req.csrfToken()
	});
}