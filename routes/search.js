const express = require('express')
const router = express.Router()
const request = require('request')

const searchURL = 'https://api.spotify.com/v1/search'

router.post('/', (req, res, next) => {
  const query = `${searchURL}?q=${req.body.regex}&type=artist`
  const token = req.get('Authorization')

  var options = {
    url: query,
    headers: {
      'Authorization': token
    }
  }
  
  request.get(options, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      return res.status(200).json(body)
    }
  })
})

module.exports = router
