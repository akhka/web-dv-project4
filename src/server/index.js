const dotenv = require('dotenv');
dotenv.config();

projectData = [];



var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


app.get('/latest', getData);

function getData (request, response) {
    response.send(projectData);
}


app.post('/saveData', saveData);

function saveData(request, response) {
    projectData.summary = request.body.summary;
}



// API
const apiKey = '4fc2583462f44a139ea675c8953eafa4'    //process.env.API_KEY   (IDK for some reason it gives me undifined result if used dotenv)
const baseUrl = `https://api.meaningcloud.com/summarization-1.0?sentences=3&key=${apiKey}`

theBaseUrl = { key: baseUrl }

app.get('/baseUrl', getBaseUrl)

function getBaseUrl(req, res){
    res.send(theBaseUrl)
}

app.post('/api', async function(req, res){
    projectData = req.body.url;
    const requestUrl = `${baseUrl}&url=${projectData}`

    const response = await fetch(requestUrl)
    const finalData = response.json()
    console.log(finalData);
    res.send(finalData)
})