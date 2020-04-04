const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
let msg1 = document.querySelector('#msg1')
let msg2 = document.querySelector('#msg2')
let msg3 = document.querySelector('#msg3')
let msg4 = document.querySelector('#msg4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()                              //stop the browser from refreshing the page on submit
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    
    const location = searchElement.value
    console.log(location)

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error
                msg2.textContent = ''
                msg3.textContent = ''
                msg4.textContent = ''
            }
            else{
                const curr_temp = Number(data.forecastData.temperature.toFixed(0))
                const curr_feels_like = Number(data.forecastData.feels_like.toFixed(0))
                const daily_min = Number(data.forecastData.daily_min.toFixed(0))
                const daily_max = Number(data.forecastData.daily_max.toFixed(0))
                const humidity = Number((data.forecastData.humidity*100).toFixed(0))
                const rain_prob = Number((data.forecastData.rain_prob*100).toFixed(1))

                msg1.textContent = data.location
                msg2.textContent = data.forecastData.summary
                msg3.textContent = 'It is currently ' + curr_temp + '˚ out. Feels like ' + curr_feels_like + '˚ (' + daily_min  + '˚ - ' + daily_max + '˚).'
                msg4.textContent = 'Current humidity is ' + humidity + '%. There is ' + rain_prob + '% chance of rain.'
            }
        })
    })
})