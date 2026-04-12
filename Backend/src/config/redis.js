const{ createClient } = require('redis');

const redisclient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-17711.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 17711
    }
});

module.exports = redisclient;