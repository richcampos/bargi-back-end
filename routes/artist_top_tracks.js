const express = require('express')
const request = require('request')
const router = express.Router()

router.get('/', (req, res, next) => {
  const id = req.body.id
  const token = req.get('Authorization')

  const options = {
    url: `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    headers: {
      'Authentication': `Bearer ${token}`
    }
  }

  request.get(options, (error, response, body) => {
    if(!error && response.statusCode(200)) {
      return res.status(200).json(body)
    } 
  })
})

module.exports = router