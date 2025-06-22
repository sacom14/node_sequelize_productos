import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => {
    console.error('Error del cliente de redis', err);
});

redisClient.connect();

export default redisClient;