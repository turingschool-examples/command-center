module.exports = function (res, topic, legitTopics) {
  return res.status(404).send({
    status: 'notFound',
    message: 'That is an invalid topic. ' +
             'Try: ' + legitTopics.join(', ') + '. ' +
             'You submitted: ' + topic + '.'
  });
};