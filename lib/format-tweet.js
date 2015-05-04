module.exports = function (tweet) {
  return tweet.user.name + ' (' + tweet.user.screen_name + '): ' + tweet.text;
};