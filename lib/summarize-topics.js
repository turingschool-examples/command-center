module.exports = function (topics) {
  return Object.keys(topics).reduce(function (summary, topic) {
    summary[topic] = topics[topic].length;
    return summary;
  }, {});
};