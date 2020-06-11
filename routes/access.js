const express = require('express');
const router  = express.Router()
const request = require('request')
const clientID = process.env['CLIENT_ID']
const clientSecret = process.env['CLIENT_SECRET']

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}


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
      return res.status(200).json(body)
    }
  })
})

router.get('/one-token', (req, res, next) => {
  const CLIENTID = 'ab9b8f77957f4befbd978a5e3c9d5365'
  const ACCESSURL = 'https://accounts.spotify.com/authorize'
  const REDIRECTURI = 'http://localhost:8080/dashboard'
  const SCOPE = 'playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private%20user-library-read%20user-library-modify%20user-read-private%20user-top-read'
  const STATE = getRandomString(8)

  const url = `${ACCESSURL}?client_id=${CLIENTID}&redirect_uri=${REDIRECTURI}&scope=${SCOPE}&response_type=token&state=${STATE}`

  return res.status(200).json(url)

  // request.get(url, function (error, response, body) {
  //   if(!error && response.statusCode === 200) {
  //     return res.status(200).json(body)
  //   }
  // })
})

module.exports = router;
