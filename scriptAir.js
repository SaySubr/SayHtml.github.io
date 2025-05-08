// Ветер (анимированные капли)
function createDrop() {
  // Создаём новый элемент 'div' для капли
  const drop = document.createElement('div');
  drop.classList.add('drop'); // Добавляем класс 'drop' для применения стилей

  // Устанавливаем случайное положение капли по горизонтали (справа)
  drop.style.left = `${window.innerWidth - 20}px`;
  
  // Устанавливаем случайную вертикальную позицию капли, с небольшим смещением
  drop.style.top = `${(Math.random() * 60 - 20)}vh`;

  // Устанавливаем случайную ширину капли
  drop.style.width = `${Math.random() * 20 + 20}px`;

  // Устанавливаем случайную продолжительность анимации падения капли
  drop.style.animationDuration = `${Math.random() * 0.5 + 0.8}s`;

  // Добавляем каплю в контейнер с id 'drops'
  document.getElementById('drops').appendChild(drop);

  // Удаляем каплю через 3 секунды (когда анимация закончится)
  setTimeout(() => drop.remove(), 3000);
}

// Запускаем создание капли каждые 50 миллисекунд
setInterval(createDrop, 50);

// Погода (OpenWeather)
fetch("https://api.openweathermap.org/data/2.5/weather?q=Krasnoyarsk&appid=8c5ea41842271fecb16dd70a1445245f&units=metric&lang=ru")
  .then(res => res.json()) // Преобразуем ответ в формат JSON
  .then(data => {
    // Извлекаем температуру, описание погоды и скорость ветра
    const temp = Math.round(data.main.temp); // Округляем температуру
    const desc = data.weather[0].description; // Описание погоды
    const wind = data.wind.speed; // Скорость ветра

    // Отображаем информацию о погоде в элементе с id "weather"
    document.getElementById("weather").innerText = `Погода в Красноярске: ${temp}°C, ${desc}, ветер ${wind} м/с`;
  })
  .catch(() => {
    // Если не удаётся получить данные, выводим ошибку
    document.getElementById("weather").innerText = "Не удалось загрузить погоду.";
  });

// Карта + IQAir
// Инициализируем карту с центром на Красноярске и уровнем масштабирования 11
const map = L.map('map').setView([56.0106, 92.8526], 11);

// Добавляем слой с картой OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// API ключ для IQAir
const apiKey = "4d15c00c-ac29-4e2a-a061-bfad81adc773";

// Массив с координатами интересных точек на карте
const locations = [
  { name: "Центр", lat: 56.0106, lon: 92.8526 },
  { name: "Северо-запад", lat: 56.05, lon: 92.90 },
  { name: "Юг", lat: 55.98, lon: 92.83 }
];

// Для каждой локации добавляем маркер на карту
locations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lon]).addTo(map);
  marker.bindPopup("Загрузка..."); // Добавляем всплывающее окно с текстом "Загрузка..."

  // Когда кликнут по маркеру, делаем запрос к API IQAir
  marker.on("click", () => {
    fetch(`https://api.airvisual.com/v2/nearest_city?lat=${loc.lat}&lon=${loc.lon}&key=${apiKey}`)
      .then(res => res.json()) // Преобразуем ответ в JSON
      .then(data => {
        // Если данные получены успешно, выводим информацию о качестве воздуха
        if (data.status === "success") {
          const p = data.data.current.pollution; // Загрязнение
          const w = data.data.current.weather; // Погода

          // Обновляем содержимое всплывающего окна с информацией
          marker.getPopup().setContent(`
            <strong>${loc.name}</strong><br>
            AQI (США): ${p.aqius}<br>
            Загрязнитель: ${p.mainus}<br>
            Температура: ${w.tp}°C<br>
            Влажность: ${w.hu}%<br>
            Ветер: ${w.ws} м/с
          `).openOn(map);
        } else {
          // Если данных нет, показываем сообщение "Нет данных"
          marker.getPopup().setContent("Нет данных").openOn(map);
        }
      })
      .catch(() => {
        // Если произошла ошибка при запросе, показываем ошибку
        marker.getPopup().setContent("Ошибка API").openOn(map);
      });
  });
});
