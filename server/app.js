const express = require('express');
const morgan = require('morgan');
var axios = require('axios');
var app = express();


app.use(morgan('dev'));

var cache = {};

app.get('/',function(req, res){
    var iMovie = req.query.i;
    var tMovie = req.query.t;
    if(iMovie){
        cache[iMovie] ? res.send(cache[iMovie]) : null
    } else if (tMovie){
        cache[tMovie] ? res.send(cache[tMovie]) : null
    } else {
        res.status(400).send('No id or title');
        return;
    } if(iMovie){
        axios
            .get('http://www.omdbapi.com/', {
                params: {
                    i: iMovie,
                    apiKey: '8730e0e'
                }
            }) 
            .then(function(response){
                console.log('/ route with ' + JSON.stringify(response.data));
                res.json(response.data);
                cache[iMovie] = response.data;
            })
    } else if (tMovie) {
        axios
            .get('http://www.omdbapi.com/', {
                params: {
                    t: tMovie,
                    apiKey: '8730e0e'
                }
            })
            .then(function(response){
                console.log('/ route with ' + JSON.stringify(response.data));
                res.json(response.data);
                cache[tMovie] = response.data;
            })
    }

});

app.get('/cache', (req, res) => {
    res.json(cache)
})
module.exports = app;