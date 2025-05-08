document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const main   = document.getElementById('main');
  const card1  = document.getElementById('card1');
  const card2  = document.getElementById('card2');
  const desc   = document.getElementById('description');
  const drops  = document.getElementById('drops-container');
  //анимация дождя
  function createDrop() {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.width = drop.style.height = `${Math.random() * 8 + 4}px`;
    drop.style.animationDuration = `${Math.random() * 3 + 4}s`;
    drops.appendChild(drop);
    setTimeout(() => drop.remove(), 7000);
  }
  setInterval(createDrop, 250);
  //анимация карточек
  setTimeout(() => {
    loader.style.display = 'none';
    main.classList.remove('hidden');
    setTimeout(() => card1.classList.add('show'), 200);
    setTimeout(() => card2.classList.add('show'), 400);
  }, 5500);
  //действия на сайте (карточка 1)
  card1.addEventListener('mouseenter', () => {
    desc.textContent = 'Stable Diffusion — это передовая генеративная модель искусственного интеллекта, способная создавать фотореалистичные изображения по текстовому описанию. Используется художниками, дизайнерами и разработчиками игр.';
  });
  card1.addEventListener('mouseleave', () => {
    desc.textContent = '';
  });
  card1.querySelector('.try-btn').addEventListener('click', () => {
    location.href = 'https://c1d0-185-200-106-39.ngrok-free.app/';
});//http://localhost:5000 cюда тыкай

  //действия на сайте (карточка 1)
  card2.addEventListener('mouseenter', () => {
    desc.textContent = 'IQAir — это система мониторинга качества воздуха в реальном времени. На интерактивной карте вы можете отслеживать уровень задымленности, загрязнений и принимать решения о прогулках на основе данных.';
  });
  card2.addEventListener('mouseleave', () => {
    desc.textContent = '';
  });
  card2.querySelector('.try-btn').addEventListener('click', () => {
    location.href = 'iqair.html';
  });
});
