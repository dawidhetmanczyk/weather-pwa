const form = document.getElementById('city-form');
const input = document.getElementById('city-input');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) return;
    await window.saveCity(city);
    location.href = `weather.html?city=${encodeURIComponent(city)}`;
  });
}

if (location.pathname.endsWith('weather.html')) {
  const params = new URLSearchParams(location.search);
  const city = params.get('city');
  document.getElementById('city-name').textContent = city;
  const info = document.getElementById('weather-info');
  document.getElementById('back').onclick = () => history.back();
  window.fetchWeather(city)
    .then(data => {
      info.innerHTML = `
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Warunki: ${data.weather[0].description}</p>
      `;
    })
    .catch(() => {
      info.textContent = 'Brak połączenia – spróbuj później.';
    });
}

if (location.pathname.endsWith('favorites.html')) {
  document.getElementById('new-search').onclick = () => location.href = 'index.html';
  window.getCities().then(cities => {
    const list = document.getElementById('fav-list');
    list.innerHTML = '';
    cities
      .sort((a,b)=>b.time - a.time)
      .slice(0,5)
      .forEach(c => {
        const li = document.createElement('li');
        li.textContent = c.name;
        li.onclick = () =>
          location.href = `weather.html?city=${encodeURIComponent(c.name)}`;
        list.appendChild(li);
      });
  });
}
