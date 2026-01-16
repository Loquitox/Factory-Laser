const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const textoCircularEl = document.getElementById('textoCircularEl');

let rotacion = 0;
let arrastrando = false;
let inicioX = 0;

// texto en tiempo real
textoInput.addEventListener('input', () => {
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// drag 360 real
textoCircularEl.addEventListener('mousedown', (e) => {
  arrastrando = true;
  inicioX = e.clientX;
  textoCircularEl.style.cursor = 'grabbing';
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!arrastrando) return;

  const delta = e.clientX - inicioX;
  rotacion += delta * 0.4; // sensibilidad (ajustable)

  textoCircularEl.setAttribute(
    'transform',
    `rotate(${rotacion} 210 210)`
  );

  inicioX = e.clientX;
});

document.addEventListener('mouseup', () => {
  arrastrando = false;
  textoCircularEl.style.cursor = 'grab';
});

