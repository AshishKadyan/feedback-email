const chai = require('chai');
const lambda = require('../transform-ext-scores');

const { expect } = chai;

describe('Test Transform Score', () => {
  it('verifies transform score call', async () => {
    const lambdaEvent = require('./event.js');
    const result = await lambda.handler(lambdaEvent, context);
    console.log(result);
    expect(result).to.be.a('string');
  });
});
