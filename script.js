const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const invertirBtn = document.getElementById('invertirBtn');

let invertido = false;

// Texto en tiempo real
textoInput.addEventListener('input', () => {
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// Dirección inversa (como Zizou)
invertirBtn.addEventListener('click', () => {
  textoPreview.setAttribute(
    'href',
    invertido ? '#pathNormal' : '#pathInvertido'
  );
  invertido = !invertido;
});
let arrastrando = false;
let inicioX = 0;
let offsetActual = 50;

// arrancamos centrado
textoPreview.setAttribute('startOffset', offsetActual + '%');

// mouse down sobre el texto
textoPreview.addEventListener('mousedown', (e) => {
  arrastrando = true;
  inicioX = e.clientX;
  e.preventDefault();
});

// mouse move
document.addEventListener('mousemove', (e) => {
  if (!arrastrando) return;

  const delta = e.clientX - inicioX;

  // sensibilidad (ajustable)
  offsetActual += delta * 0.05;

  // límites
  if (offsetActual < 0) offsetActual = 0;
  if (offsetActual > 100) offsetActual = 100;

  textoPreview.setAttribute('startOffset', offsetActual + '%');

  inicioX = e.clientX;
});

// mouse up
document.addEventListener('mouseup', () => {
  arrastrando = false;
});
