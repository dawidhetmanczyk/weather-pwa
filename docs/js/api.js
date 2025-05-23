(() => {
  const API_KEY = '8c4c186dd61266d832287e37d8b06eb2';
  const BASE = 'https://api.openweathermap.org/data/2.5';

  window.fetchWeather = async city => {
    const url = `${BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Nie udało się pobrać pogody.');
    return res.json();
  };
})();

