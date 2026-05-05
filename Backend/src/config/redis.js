const{ createClient } = require('redis');

const redisclient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-12941.crce179.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 12941
    }
});

module.exports = redisclient;