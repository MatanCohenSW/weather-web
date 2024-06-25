const request = require('request');


const getWeatherByCity = (city,callback) =>{

    const url = "http://api.weatherstack.com/current?access_key=9e48245b8021a72c154b9ca8b5a26ee6&query=" + city;

    request({url: url,json: true},(error, response) => {
        if(error)
            callback("Unable to connect to weather service!",undefined)
        else if(response.body.current){
            var weatherDetails = {
                temp: response.body.current.temperature,
                fellsLikeTemp: response.body.current.feelslike,
                humidity: response.body.current.humidity,
                windSpeed: response.body.current.wind_speed,
                isDay: response.body.current.is_day == "yes"? true : false,
                address: response.body.request.query,
                uvIndex: response.body.current.uv_index,
                weatherDesc: response.body.current.weather_descriptions
            }

            callback(undefined,weatherDetails)
        }
        else
            callback("Unable to find location! Try another search.",undefined)   
        
    })
}

module.exports = {
    getWeatherByCity: getWeatherByCity
}; 