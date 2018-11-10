const express = require('express')
const app = express(), cors = require('cors')
const bodyParser = require('body-parser')

var originsWhitelist = [
    'http://localhost:4200'
];

var corsOptions = {
    origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Node API')
})

app.get('/getData', (req, res) => {
    res.json({'message': 'Hello World'})
})

app.post('/postData', bodyParser.json(), (req, res) => {
    res.json(req.body)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))