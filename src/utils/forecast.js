const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/645de8d74a7f5b4d47388c0f323ddb10/'+ lat + ',' + long + '?units=si&lang=en'
  request({url, json: true}, (error, {body}) => {
    if(error){
        callback('Unable to connect to Weather Service!', undefined)
    }
    else{
        if(body.error)
        {
          callback('Unable to find location!', undefined)
        }
        else{
          callback(undefined, {
            summary: body.daily.data[0].summary,
            temperature: body.currently.temperature,
            feels_like: body.currently.apparentTemperature,
            daily_min: body.daily.data[0].temperatureMin,
            daily_max: body.daily.data[0].temperatureMax,
            humidity: body.currently.humidity,
            rain_prob: body.currently.precipProbability
          })
        }
    }
})

}

module.exports = forecast