# Command Center

A simple API that gives you the last few tweets from the twitter API for a number of different topics.

## Setup

You'll need some Twitter API keys to get this thing running.

*  `consumer_key: COMMAND_CENTER_CONSUMER_KEY`
*  `consumer_secret: COMMAND_CENTER_CONSUMER_SECRET`
*  `token: COMMAND_CENTER_TOKEN`
*  `token_secret: COMMAND_CENTER_TOKEN_SECRET`

## Endpoints

* `/api/topics` returns a list of all of the topics available
* `/api/topics/:topic` returns the last five tweets for a given topic