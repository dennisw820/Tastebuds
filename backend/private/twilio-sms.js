const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

var message = 'Please send me a snack *wink*';
var recipient = '9546385037';

client.messages.create({
    body: message,
    from: process.env.TWILIO_TRIAL_NUMBER,
    to: recipient
}).then(message => console.log(message.sid));