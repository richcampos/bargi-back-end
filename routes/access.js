const express = require('express');
const router  = express.Router()
const request = require('request')
const clientID = process.env['CLIENT_ID']
const clientSecret = process.env['CLIENT_SECRET']


router.get('/', (req, res, next) => {
  var options = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  }

  request.post(options, function (error, response, body) {
    if(!error && response.statusCode === 200) {

      const token = body.access_token

      return res.status(200).json(token)
    }
  })
})

module.exports = router;
