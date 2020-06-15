require('dotenv').config();

var express = require('express');
var router = express.Router();  

var morgan = require('morgan');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(morgan('dev'));

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* GET home page. */
router.get('/', (req, res) => {
    res.send('no wey')
})

router.post('/', (req, res) => {
    let email = req.body
    const msg = {
        "personalizations":[{"to":[{"email":"thk116@gmail.com","name":"Jeremy Kim"}],"subject":"New msg from pfolio!"}],
        "content": [{"type": "text/plain", "value": email.message}],
        "from":{"email":email.email,"name":email.name},
        "reply_to":{"email":email.email,"name":email.name}
    }
    // const msg = {
    //     to: 'thk116@gmail.com',
    //     from: 'someone',
    //     subject: 'New message from your pfolio!',
    //     text: 'Youre hired!',
    //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // };
    sgMail.send(msg)
        .then(res => console.log('the RES: ', res))
        .catch(err => console.log('the ERR: ', err))
    res.json('email sent')
});

module.exports = router;