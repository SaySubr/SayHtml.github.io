document.getElementById('backBtn').addEventListener('click', () => {
  location.href = 'index.html';
});

const triangleContainer = document.getElementById('triangle-container');

function createTriangle() {
  const tri = document.createElement('div');
  tri.classList.add('triangle');
  tri.style.left = `${Math.random() * 100}%`;
  tri.style.animationDuration = `${Math.random() * 3 + 4}s`;
  tri.style.transform = `rotate(${Math.random() * 360}deg)`;
  triangleContainer.appendChild(tri);
  setTimeout(() => tri.remove(), 7000); // удаляем после анимации
}

setInterval(createTriangle, 100); // каждые 100ms создаем новую
