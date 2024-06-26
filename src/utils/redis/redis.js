const { createClient } = require('redis');


const mexResponse = 240;
const client = createClient({
    password: 'eIFQ2QDQjKRmXdcjtYufcAPIiIVZJDny',
    socket: {
        host: 'redis-11653.c256.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11653
    }
});

client.on('error', (err) => console.log('Redis Client Error', err));


async function setRequestNum(callback) {
    await client.connect();
    
    var value = await client.get('requestNum')
    var month = await client.get('month')
    var year = await client.get('year')
    const date = new Date();
    const currentMonth = date.getMonth() + 1
    const currentYear = date.getFullYear();

    value++

    if(currentMonth > month || currentYear > year){
        await client.set('requestNum', 1)
        await client.set('month', currentMonth)
        await client.set('year', currentYear)
        callback(undefined,"success")   

    }
    else if(value < mexResponse){
        await client.set('requestNum', value)
        callback(undefined,"success")  
    }
    else{
        callback("Cannot use the serivce right now, please try again later. ",undefined)   
    }

    await client.disconnect();
} 

module.exports = {
    setRequestNum: setRequestNum
}; 