document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').onsubmit = e => {
    e.preventDefault()
    const city = document.querySelector('#city').value
    document.querySelector('#cityName').innerHTML = city

    getWeatherData(city)
  }

  async function getWeatherData (city) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=H9NYJX84SDMP95FQ5SL9TL2T6 `,
        { mode: 'cors' }
      )
      const weatherData = await response.json()

      const conditions = weatherData.currentConditions.conditions
      const icon = weatherData.currentConditions.icon
      const fahrenheit = weatherData.currentConditions.temp
      const uvIndex = weatherData.currentConditions.uvindex
      const time = weatherData.currentConditions.datetime

      const celsius = fah => {
        return parseInt(((fah - 32) * 5) / 9)
      }

      document.querySelector('#img').src = updateImg(icon)
      document.querySelector('#conditions').innerHTML = conditions
      document.querySelector('#fahrenheit').innerHTML = fahrenheit
      document.querySelector('#celsius').innerHTML = celsius(fahrenheit)
      document.querySelector('#uvindex').innerHTML = uvIndex
      document.querySelector('#time').innerHTML = time
    } catch (err) {
      document.querySelector('#cityName').innerHTML =
        'No matching location found'
    }
  }

  const updateImg = condition => {
    let src = 'https://giphy.com/embed/WOfGfEQwDzdGcXYmrn'
    switch (condition) {
      case 'clear-day':
        src = 'https://giphy.com/embed/lyVNcb1n5Ob0Q'
        break
      case 'cloudy':
        src = 'https://giphy.com/embed/xMPdlWMxIkLpS'
        break
      case 'partly-cloudy-day':
        src = 'https://giphy.com/embed/Ole6YAEGcciPXmw4mf'
        break
      case 'rainy':
        src = 'https://giphy.com/embed/vLi3T5m3RH45y'
        break
    }
    return src
  }
})
