// Ветер (анимированные капли)
function createDrop() {
  const drop = document.createElement('div');
  drop.classList.add('drop');

  drop.style.left = `${window.innerWidth - 20}px`;
  drop.style.top = `${(Math.random() * 60 - 20)}vh`;

  drop.style.width = `${Math.random() * 20 + 20}px`;
  drop.style.animationDuration = `${Math.random() * 0.5 + 0.8}s`;

  document.getElementById('drops').appendChild(drop);
  setTimeout(() => drop.remove(), 3000);
}
setInterval(createDrop, 50);



// Погода (OpenWeather)
fetch("https://api.openweathermap.org/data/2.5/weather?q=Krasnoyarsk&appid=8c5ea41842271fecb16dd70a1445245f&units=metric&lang=ru")
  .then(res => res.json())
  .then(data => {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const wind = data.wind.speed;
    document.getElementById("weather").innerText = `Погода в Красноярске: ${temp}°C, ${desc}, ветер ${wind} м/с`;
  })
  .catch(() => {
    document.getElementById("weather").innerText = "Не удалось загрузить погоду.";
  });

// Карта + IQAir
const map = L.map('map').setView([56.0106, 92.8526], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

const apiKey = "4d15c00c-ac29-4e2a-a061-bfad81adc773";

const locations = [
  { name: "Центр", lat: 56.0106, lon: 92.8526 },
  { name: "Северо-запад", lat: 56.05, lon: 92.90 },
  { name: "Юг", lat: 55.98, lon: 92.83 }
];

locations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lon]).addTo(map);
  marker.bindPopup("Загрузка...");

  marker.on("click", () => {
    fetch(`https://api.airvisual.com/v2/nearest_city?lat=${loc.lat}&lon=${loc.lon}&key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          const p = data.data.current.pollution;
          const w = data.data.current.weather;
          marker.getPopup().setContent(`
            <strong>${loc.name}</strong><br>
            AQI (США): ${p.aqius}<br>
            Загрязнитель: ${p.mainus}<br>
            Температура: ${w.tp}°C<br>
            Влажность: ${w.hu}%<br>
            Ветер: ${w.ws} м/с
          `).openOn(map);
        } else {
          marker.getPopup().setContent("Нет данных").openOn(map);
        }
      })
      .catch(() => {
        marker.getPopup().setContent("Ошибка API").openOn(map);
      });
  });
});
