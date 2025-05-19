async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const apiKey = '0fd195258fd2cdea4632711f4b0a2753';
    const weatherResult = document.getElementById('weatherResult');

    if (!city) {
        weatherResult.innerHTML = '⚠️ Please enter a city name.';
        return;
    }

    weatherResult.innerHTML = '🔍 Loading...';

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0fd195258fd2cdea4632711f4b0a2753&units=metric`);
        const data = await res.json();

        if (res.ok) {
            const temp = data.main.temp;
            const condition = data.weather[0].main;
            const emoji = getWeatherEmoji(condition);
            const advice = getAdviceByTemp(temp);

            weatherResult.innerHTML = `
                <strong>${data.name}, ${data.sys.country}</strong><br>
                ${emoji} ${condition} - ${data.weather[0].description}<br>
                🌡️ ${temp}°C<br>
                💬 ${advice}
            `;
        } else {
            weatherResult.innerHTML = '❌ City not found.';
        }
    } catch (error) {
        weatherResult.innerHTML = '⚠️ Error fetching weather data.';
        console.error(error);
    }
}

function getWeatherEmoji(condition) {
    switch (condition.toLowerCase()) {
        case 'clear': return '☀️';
        case 'clouds': return '☁️';
        case 'rain': return '🌧️';
        case 'drizzle': return '🌦️';
        case 'thunderstorm': return '⛈️';
        case 'snow': return '❄️';
        case 'mist':
        case 'fog': return '🌫️';
        default: return '🌈';
    }
}

function getAdviceByTemp(temp) {
    if (temp >= 30) return 'It\'s hot out there! Stay hydrated 🧃';
    if (temp >= 20) return 'Perfect day to be outside! 🏞️';
    if (temp >= 10) return 'Might need a light jacket. 🧥';
    return 'Bundle up, it\'s cold! ❄️🧣';
}

function resetApp() {
    document.getElementById('cityInput').value = '';           
    document.getElementById('weatherResult').innerHTML = '';   
}

