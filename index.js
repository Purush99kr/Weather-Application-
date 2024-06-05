const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    // const APIKey = '883ba56b0c2228e475cad822d40dbe62';
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.search-box input').value;

    if (city == '') 
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }


            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temp');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent==city){
                return;
            }
            else{
                cityHide.textContent = city;

                container.style.height = '555px';
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');
            }

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'IMG/sun.png';
                    break;
                case 'Rain':
                    image.src = 'IMG/rain.jpg';
                    break;
                case 'Clouds':
                    image.src = 'IMG/cloudy.png';
                    break;
                case 'Mist':
                    image.src = 'IMG/mist.jpeg';
                    break;
                case 'Haze':
                    image.src = 'IMG/mist.jpeg';
                    break;
                default:
                    image.src = 'IMG/cloudy.png';
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML =`${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km\hr`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
