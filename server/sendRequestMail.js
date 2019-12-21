const nodemailer = require('nodemailer');

module.exports = function sendEmail(userEmail) {
    // create reusable transporter object using the default SMTP transport
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: "bookbank.cohort7@gmail.com",
            pass: "rbkcohort7"
        }
    });

    const message = {
        from: 'bookbank.cohort7@gmail.com',
        to: userEmail,
        subject: 'Welcome to Book Bank',
        // text: `test email!`,
        html: `<h1 style ="font-family:Helvetica; color:black;"> Weclome to Book bank website! </h1>
    
        <h3 style ="font-family:Helvetica; color:black;"> One of your book has been requested ! </h3>
    <p>book bank team</p>
          </h3>`

    };
    // send mail with defined transport object
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log("not done")
            console.log(err);
        } else {
            console.log("done")
            console.log(info);
        }
    });
};  
