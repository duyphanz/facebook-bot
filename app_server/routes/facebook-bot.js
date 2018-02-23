var express = require('express');
var router = express.Router();


//authen facebook
router.get('/fb-bot', (req, res) => {
    

// Your verify token. Should be a random string.
let VERIFY_TOKEN = "ThisIsSecret"

 // Parse the query params
 let mode = req.query['hub.mode'];
 let token = req.query['hub.verify_token'];
 let challenge = req.query['hub.challenge'];
 console.log(req.query);
   
 // Checks if a token and mode is in the query string of the request
 if (mode && token) {
 
   // Checks the mode and token sent is correct
   if (mode === 'subscribe' && token === VERIFY_TOKEN) {
     
     // Responds with the challenge token from the request
     console.log('WEBHOOK_VERIFIED');
     res.status(200).send(challenge);
   
   } else {
     // Responds with '403 Forbidden' if verify tokens do not match
     res.sendStatus(403);      
   }
 } else {
    res.status(404);
    console.log('None')
 }

})

module.exports = router;