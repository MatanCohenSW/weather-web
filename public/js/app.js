const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherTemp = document.getElementById('weather-temp')
const weatherAddress = document.getElementById('weather-address')
const weatherHumidity = document.getElementById('weather-humidity-details')
const weatherWind = document.getElementById('weather-wind-details')
const uvIndex = document.getElementById('weather-uv-index-details')
const weatherImage = document.getElementById('weather-image')

weatherTemp.textContent = "-" + "° C"

var dayBackground = true;

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const loocation = search.value

    fetch('/weather?address=' + loocation).then((response) => {
        response.json().then((data) => {
            if(data.error)
                responseMessage.textContent = data.error
            else{
                weatherTemp.textContent = data.weatherDetails.temp + "° C"
                weatherAddress.textContent = data.weatherDetails.address 
                weatherHumidity.textContent = data.weatherDetails.humidity + "%"
                weatherWind.textContent = data.weatherDetails.windSpeed + " Km/h"
                uvIndex.textContent = data.weatherDetails.uvIndex
                debugger
                const weatherDesc = data.weatherDetails.weatherDesc[0].toLowerCase()

                if(data.weatherDetails.isDay){
                    if(!dayBackground)
                        changeBackgroundColor([56, 65, 83],[8, 25, 51],[74,152,243],[1,87,255]);

                    if(weatherDesc.includes("sunny")){
                        weatherImage.src = "/img/sunny-weather.jpeg"
                    }
                    else if(weatherDesc.includes("cloudy")){
                        weatherImage.src = "/img/cloudy-weather.jpeg"
                    }
                    else{
                        weatherImage.src = "/img/rainy-weather.jpeg"
                    }

                    dayBackground = true
                }
                else if(!data.weatherDetails.isDay){
                    if(dayBackground)
                        changeBackgroundColor([74,152,243],[1,87,255],[56, 65, 83],[8, 25, 51]);

                    if(weatherDesc.includes("cloudy")){
                        weatherImage.src = "/img/cloudy-weather.jpeg"
                    }
                    else if(weatherDesc.includes("clear")){
                        weatherImage.src = "/img/clear-night-weather.jpeg"
                    }
                    else{
                        weatherImage.src = "/img/rainy-weather.jpeg"
                    }

                    dayBackground = false

                }
            }

        })

    })

})

function changeBackgroundColor (initialColor1,initialColor2,finalColor1,finalColor2){
    var body = document.body;

    var steps = 100; 
    var currentStep = 0;

    var intervalTime = 10; 
    var colorChange = setInterval(function () {
        
        var color1 = calculateIntermediateColor(initialColor1, finalColor1, currentStep, steps);
        var color2 = calculateIntermediateColor(initialColor2, finalColor2, currentStep, steps);

        body.style.backgroundImage = "linear-gradient(125deg, rgb(" + color1.join(' ') + "), rgb(" + color2.join(' ') + "))";

        currentStep++;

        if (currentStep > steps) {
            clearInterval(colorChange);
        }
    }, intervalTime);
}

function calculateIntermediateColor(startColor, endColor, currentStep, totalSteps) {
    var result = [];
    for (var i = 0; i < 3; i++) {
        var difference = endColor[i] - startColor[i];
        var step = difference / totalSteps;
        result[i] = Math.round(startColor[i] + step * currentStep);
    }
    return result;
}

document.getElementById('locationInput').addEventListener('focus', function() {
    this.placeholder = '';
});

document.getElementById('locationInput').addEventListener('blur', function() {
    this.placeholder = 'Location'; // Optionally, add this line to restore the placeholder when the input loses focus
});