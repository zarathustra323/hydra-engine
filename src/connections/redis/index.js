const Promise = require('bluebird');
const redis = require('redis');
const env = require('../../env');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const options = { url: env.REDIS_DSN };
const client = redis.createClient(options);
client.on('connect', () => {
  process.stdout.write(`Successful Redis connection with options '${JSON.stringify(options)}'\n`);
});

module.exports = client;
