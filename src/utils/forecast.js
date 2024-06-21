const request = require('request');


const getWeatherByCity = (city,callback) =>{

    const url = "http://api.weatherstack.com/current?access_key=9e48245b8021a72c154b9ca8b5a26ee6&query=" + city;

    request({url: url,json: true},(error, response) => {
        if(error)
            callback("Unable to connect to weather service!",undefined)
        else if(response.body.current){
            const temp = response.body.current.temperature;
            const fellsLikeTemp = response.body.current.feelslike;
            const address = response.body.request.query;
            callback(undefined,"In " + address + " it is currently " + temp + " degrees out. Its feels like " + fellsLikeTemp + " degrees.")
        }
        else
            callback("Unable to find location! Try another search.",undefined)   
        
    })
}

module.exports = {
    getWeatherByCity: getWeatherByCity
}; 