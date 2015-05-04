const assert = require('assert');
const summarizeTopics = require('../lib/summarize-topics');
const trimTopics = require('../lib/trim-topics');

const topics = {
  one: [1, 2],
  two: [1],
  three: [1,2,3,4,5,6,7,8,9,0,1]
};

describe('summarizeTopics', function () {

  it('should get a count of the number of tweets for a topic', function () {
    const summarized = summarizeTopics(topics);
    assert.equal(summarized.one, 2);
    assert.equal(summarized.two, 1);
    assert.equal(summarized.three, 11);
  });

});

describe('trimTopics', function () {

  it('should should trim the number of values for a key to a given limit', function () {
    const trimmed = trimTopics(topics, 5);
    assert.equal(trimmed.one.length, 2);
    assert.equal(trimmed.two.length, 1);
    assert.equal(trimmed.three.length, 5);
  });

});