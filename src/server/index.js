// Environment variables config
const dotenv = require('dotenv');
dotenv.config();

// Package imports
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const express = require('express');

// Instantiate express app
const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

const createReport = async (req, res) => {
  const userEnteredUrl = req.body.url;
  const apiKey = process.env.API_KEY;
  console.log('User entered url', userEnteredUrl);
  const urlForApiReq = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${userEnteredUrl}&lang=en`;
  const response = await fetch(urlForApiReq);
  const reportRaw = await response.json();
  const reportData = {
    sentimentScore: reportRaw.score_tag,
    agreement: reportRaw.agreement,
    subjectivity: reportRaw.subjectivity,
    confidence: reportRaw.confidence,
    irony: reportRaw.irony,
  };
  console.log(reportData);
  res.send(reportData);
};

app.post('/create-report', createReport);

app.listen(8081, function () {
  console.log('My News Eval listening on port 8081');
});
