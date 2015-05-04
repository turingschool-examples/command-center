module.exports = function (topics, limit) {
  return Object.keys(topics).reduce(function (result, topic) {
    result[topic] = topics[topic].slice(0, limit);
    return result;
  }, {});
};