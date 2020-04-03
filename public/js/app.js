const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
let msg1 = document.querySelector('#msg1')
let msg2 = document.querySelector('#msg2')
let msg3 = document.querySelector('#msg3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()                              //stop the browser from refreshing the page on submit
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    
    const location = searchElement.value
    console.log(location)

    fetch('http://127.0.0.1:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error
                msg2.textContent = ''
                msg3.textContent = ''
            }
            else{
                msg1.textContent = data.location
                msg2.textContent = data.forecastData.summary
                let temp = data.forecastData.temperature
                let rain = (data.forecastData.rain_prob*100).toPrecision(3)
                msg3.textContent = 'It is currently ' + temp + ' degrees celcious out. There is a ' + rain + '% chance of rain.'
            }
        })
    })
})