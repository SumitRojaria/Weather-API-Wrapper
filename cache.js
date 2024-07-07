const redis =require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
  });
  
  client.connect();
  
  async function getCachedValue(key) 
  {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  }
  
  async function setCachedValue(key, value, expirationInSeconds) 
  {
    await client.set(key, JSON.stringify(value), 'EX', expirationInSeconds);
  }
  
  module.exports = {
    getCachedValue,
    setCachedValue,
  };