const express = require('express');
const app = express();
const http = require('http').Server(app);

const cors = require('express-cors');
app.use(cors({ allowedOrigins: ['*'] }));

const Twitter = require('node-tweet-stream');

const respondToInvalidTopic = require('./lib/respond-to-invalid-topic');
const formatTweet = require('./lib/format-tweet');
const summarizeTopics = require('./lib/summarize-topics');
const trimTopics = require('./lib/trim-topics');

var t = new Twitter({
  consumer_key: process.env.COMMAND_CENTER_CONSUMER_KEY,
  consumer_secret: process.env.COMMAND_CENTER_CONSUMER_SECRET,
  token: process.env.COMMAND_CENTER_TOKEN,
  token_secret: process.env.COMMAND_CENTER_TOKEN_SECRET
});

var topics = {
  'bieber': [],
  'tswift': [],
  'javascript': [],
  'pokemon': [],
  'denver': [],
  'rails': []
};

const legitTopics =  Object.keys(topics);

t.on('tweet', function (tweet) {
  legitTopics.forEach(function (topic) {
    const tweetText = tweet.text.toLowerCase();
    const belongsToTopic = tweetText.indexOf(topic) !== -1;
    if (belongsToTopic) { topics[topic].push(tweet); }
  });
  topics = trimTopics(topics, 100);
  console.log(formatTweet(tweet));
  console.log(summarizeTopics(topics));
});

t.on('error', function () {
  console.error('ERROR:', arguments);
});

t.trackMultiple(legitTopics);

app.get('/', function (req, res) {
  res.send({
    status: 'ok',
    message: "You are probably looking for the /api endpoint."
  });
});

app.get('/api', function (req, res) {
  res.send({
    status: 'ok',
    message: 'This is the root of the API, you should probably hit one of the endpoints with some data.',
    endpoints: {
      '/api/topics': 'Returns a list of all of the topics being tracked.',
      '/api/topics/:topic': 'Returns the last five tweets for a given topic.'
    }
  });
});

app.get('/api/topics', function (req, res) {
  res.send({
    status: 'ok',
    topics: Object.keys(topics),
    tweets: summarizeTopics(topics)
  });
});

app.get('/api/topics/:topic', function (req, res) {
  const topic = req.params.topic;

  if (legitTopics.indexOf(req.params.topic) === -1) {
    return respondToInvalidTopic(res, topic, legitTopics);
  }

  const limit = req.params.limit || 5;
  res.send({ status: 'ok',
             topic: topic,
             tweets: trimTopics(topics, limit)[topic]
           });
});

const port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('Your server is up and running on Port ' + port + '.');
});