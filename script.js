  document.addEventListener('DOMContentLoaded', () => {
  // Получаем ссылки на основные элементы на странице
  const loader = document.getElementById('loader');
  const main   = document.getElementById('main');
  const card1  = document.getElementById('card1');
  const card2  = document.getElementById('card2');
  const desc   = document.getElementById('description');
  const drops  = document.getElementById('drops-container');

  // Функция для создания капли (для анимации дождя)
  function createDrop() {
    const drop = document.createElement('div'); // Создаем новый элемент для капли
    drop.classList.add('drop'); // класс для капли, чтобы применялись стили
    drop.style.left = `${Math.random() * 100}%`; // Случайное положение по оси X (ширина экрана)
    drop.style.width = drop.style.height = `${Math.random() * 8 + 4}px`; // Случайный размер капли (от 4 до 12px)
    drop.style.animationDuration = `${Math.random() * 3 + 4}s`; // Случайная продолжительность анимации (от 4 до 7 секунд)
    drops.appendChild(drop); // Добавляем каплю на экран
    setTimeout(() => drop.remove(), 7000); // Удаляем каплю через 7 секунд
  }

  // Создаем капли каждую 50 миллисекунд
  setInterval(createDrop, 50);


  // Скрытие загрузочного экрана и отображение контента с анимацией
  setTimeout(() => {
  loader.style.display = 'none'; // Скрываем загрузочный экран
  main.classList.remove('hidden'); // Показываем основной контент

  // Рандомная задержка для появления анимации карточек
  const randomDelay1 = Math.random() * 1500 + 500; // Рандомная задержка от 0.5 до 2 секунд
  const randomDelay2 = Math.random() * 1500 + 500; // Рандомная задержка от 0.5 до 2 секунд

  // Появление первой карточки с рандомной задержкой
  setTimeout(() => card1.classList.add('show'), randomDelay1);

   // Появление второй карточки с рандомной задержкой
  setTimeout(() => card2.classList.add('show'), randomDelay2);
}, Math.random() * 7000 + 500); // Задерживает работу загрузочного экрана(не скрывает его)


  // Действия при наведении на карточку 1
  card1.addEventListener('mouseenter', () => {
    desc.textContent = 'Stable Diffusion — это передовая генеративная модель искусственного интеллекта, способная создавать фотореалистичные изображения по текстовому описанию. Используется художниками, дизайнерами и разработчиками игр.';
  });
  card1.addEventListener('mouseleave', () => {
    desc.textContent = ''; // Очищаем описание при уходе с карточки
  });
  // Действия при клике на кнопку на карточке 1
  card1.querySelector('.try-btn').addEventListener('click', () => {
    location.href = 'https://8df8d867101d.ngrok-free.app/'; // Переход на cтраницу Stable
    // использовуй локальный сервер: http://localhost:5000
  });


  // Действия при наведении на карточку 2
  card2.addEventListener('mouseenter', () => {
    desc.textContent = 'IQAir — это система мониторинга качества воздуха в реальном времени. На интерактивной карте вы можете отслеживать уровень задымленности, загрязнений и принимать решения о прогулках на основе данных.';
  });
  card2.addEventListener('mouseleave', () => {
    desc.textContent = ''; // Очищаем описание при уходе с карточки
  });
  // Действия при клике на кнопку на карточке 2
  card2.querySelector('.try-btn').addEventListener('click', () => {
    location.href = 'iqair.html'; // Переход на страницу IQAir
  });
});
