
let intervaloParpadeo = null;
let currentStarIndex = 0;

function iniciarParpadeoSecuencial(desde = 0) {
  const stars = document.querySelectorAll('.star');
  let current = desde;

  clearInterval(intervaloParpadeo);

  intervaloParpadeo = setInterval(() => {
    stars.forEach(star => star.classList.remove('parpadeando'));
    stars[current].classList.add('parpadeando');
    current = (current + 1) % stars.length;
  }, 800);
}

// Animación al cargar encabezados
document.querySelectorAll('h1, h2').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 1s ease, transform 1s ease';
  setTimeout(() => {
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  }, 300);
});

// Cambiar tema entre noche y día feliz
const toggleBtn = document.querySelector('.toggle-night');
let modoFeliz = false;

toggleBtn.addEventListener('click', () => {
  if (modoFeliz) {
    document.body.style.background = 'linear-gradient(180deg, #0d0d0d 0%, #1a001a 100%)';
    document.body.style.color = 'hotpink';
    toggleBtn.textContent = '🌙';
  } else {
    document.body.style.background = 'linear-gradient(180deg, #fff1f0 0%, #ffe7f2 100%)';
    document.body.style.color = '#4b0082';
    toggleBtn.textContent = '🌞';
  }
  modoFeliz = !modoFeliz;
});

// Descargar archivo al hacer clic en la luna
const moonBtn = document.querySelector('.moon-btn');
if (moonBtn) {
  moonBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'media/CV_KarlaGuzman.pdf'; // Asegúrate de que exista este archivo
    link.download = 'CV_KarlaGuzman.pdf';
    link.click();
  });
}

// Crear partículas flotantes
const particlesContainer = document.createElement('div');
particlesContainer.className = 'particles';
document.body.appendChild(particlesContainer);

for (let i = 0; i < 30; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.top = `${Math.random() * 100}vh`;
  particle.style.animationDelay = `${Math.random() * 10}s`;
  particlesContainer.appendChild(particle);
}

// Agregar estilos de partículas
const style = document.createElement('style');
style.innerHTML = `
  .particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  .particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10 "%3E%3Cpath d="M5 1L6 4H9L7 6L8 9L5 7L2 9L3 6L1 4H4Z" fill="%23aa00ff"/%3E%3C/svg%3E');
    background-size: cover;
    opacity: 0.5;
    animation: floatStar 8s infinite ease-in-out;
  }
  @keyframes floatStar {
    0% { transform: translateY(0) translateX(0); opacity: 0.5; }
    50% { transform: translateY(-20px) translateX(10px); opacity: 0.2; }
    100% { transform: translateY(0) translateX(0); opacity: 0.5; }
  }
`;
document.head.appendChild(style);

const clickSound = new Audio('media/cardEffect.mp3');

document.querySelectorAll('.star').forEach((star, index) => {
  star.addEventListener('click', () => {
    // Reproducir sonido al hacer click
    clickSound.currentTime = 0;  // reiniciar para que pueda sonar seguido
    clickSound.play().catch(e => console.log('Error al reproducir el sonido:', e));
    
    // Guardar el índice clicado
    currentStarIndex = index;

    // Detener el parpadeo secuencial
    clearInterval(intervaloParpadeo);

    // Quitar clases de todas
    document.querySelectorAll('.star').forEach(s => {
      s.classList.remove('parpadeando', 'activa');
    });

    // Activar solo la estrella clicada
    star.classList.add('activa');

    // Mostrar carta correspondiente
    const sectionId = star.getAttribute('data-section');
    const card = document.getElementById(sectionId);
    if (!card) {
      console.error(`No se encontró la carta con ID: ${sectionId}`);
      return;
    }

    document.querySelectorAll('.card').forEach(c => {
      if (c !== card) c.classList.remove('visible');
    });

    card.classList.add('visible');
  });
});

// Cerrar cartas al hacer clic en el botón de cerrar y reiniciar parpadeo desde la estrella activa
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.card').classList.remove('visible');

    // Reiniciar desde la última estrella activa
    document.querySelectorAll('.star').forEach(s => s.classList.remove('activa'));
    iniciarParpadeoSecuencial(currentStarIndex);
  });
});

function posicionarEstrellasEnElipse() {
  const stars = [...document.querySelectorAll('.star')];
  const container = document.querySelector('.star-container');

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  const a = containerWidth / 2.5;
  const b = containerHeight / 2.8;
  const total = stars.length;

  stars.forEach((star, i) => {
    const angle = (2 * Math.PI / total) * i - Math.PI / 2;
    const x = centerX + a * Math.cos(angle);
    const y = centerY + b * Math.sin(angle);
    star.style.left = `${x - 50}px`;
    star.style.top = `${y - 50}px`;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  posicionarEstrellasEnElipse();
  iniciarParpadeoSecuencial();
});

window.addEventListener('resize', posicionarEstrellasEnElipse);
