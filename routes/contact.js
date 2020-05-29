require('dotenv').config();

var express = require('express');
var router = express.Router();  

var morgan = require('morgan');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(morgan('dev'));

/* GET home page. */
router.get('/', (req, res) => {
    res.send('okay')
})

router.post('/', (req, res) => {
    const msg = {
        to: 'thk116@gmail.com',
        from: 'jthk1106@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg)
        .then(res => console.log('the RES: ', res))
        .catch(err => console.log('the ERR: ', err))

    res.json('email sent')
});

module.exports = router;