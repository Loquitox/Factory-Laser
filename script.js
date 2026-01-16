// ========================
// VARIABLES GLOBALES
// ========================
const textoInput = document.getElementById('textoInput');
const invertirBtn = document.getElementById('invertirBtn');
const agregarCapaBtn = document.getElementById('agregarCapaBtn');
const quitarCapaBtn = document.getElementById('quitarCapaBtn');
const preview = document.getElementById('preview');

let capas = [];
let capaSeleccionada = null;

// ========================
// FUNCIONES DE CAPAS
// ========================

// Crear capa nueva
function agregarCapa(texto = 'TU TEXTO ACÁ', fontSize = 26) {
  const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textEl.setAttribute('font-size', fontSize);
  textEl.setAttribute('fill', '#000');
  textEl.setAttribute('dominant-baseline', 'middle');
  textEl.style.cursor = 'grab';

  const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
  textPath.setAttribute('href', '#pathNormal');
  textPath.setAttribute('startOffset', '50%');
  textPath.setAttribute('text-anchor', 'middle');
  textPath.textContent = texto;

  textEl.appendChild(textPath);
  preview.appendChild(textEl);

  const capa = {
    textEl,
    textPathEl: textPath,
    rotacion: 0,
    invertido: false
  };

  // Seleccionar la capa recién creada
  seleccionarCapa(capa);

  // Hacer arrastrable
  hacerArrastrable(capa);

  capas.push(capa);
}

// Seleccionar capa
function seleccionarCapa(capa) {
  capaSeleccionada = capa;

  // Actualizar input
  textoInput.value = capa.textPathEl.textContent;
}

// Quitar capa
function quitarCapa() {
  if (!capaSeleccionada) return;
  preview.removeChild(capaSeleccionada.textEl);
  capas = capas.filter(c => c !== capaSeleccionada);
  capaSeleccionada = capas.length ? capas[capas.length - 1] : null;
  if (capaSeleccionada) textoInput.value = capaSeleccionada.textPathEl.textContent;
}

// ========================
// TEXTO EN TIEMPO REAL
// ========================
textoInput.addEventListener('input', () => {
  if (!capaSeleccionada) return;
  capaSeleccionada.textPathEl.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// ========================
// INVERTIR DIRECCIÓN
// ========================
invertirBtn.addEventListener('click', () => {
  if (!capaSeleccionada) return;

  const actual = capaSeleccionada.textPathEl.getAttribute('href');
  if (actual === '#pathNormal') {
    capaSeleccionada.textPathEl.setAttribute('href', '#pathInvertido');
    capaSeleccionada.invertido = true;
  } else {
    capaSeleccionada.textPathEl.setAttribute('href', '#pathNormal');
    capaSeleccionada.invertido = false;
  }
});

// ========================
// ARRASTRAR (DESKTOP & MOBILE)
// ========================
function hacerArrastrable(capa) {
  let arrastrando = false;
  let inicioX = 0;

  // Desktop
  capa.textEl.addEventListener('mousedown', e => {
    arrastrando = true;
    inicioX = e.clientX;
    capa.textEl.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!arrastrando) return;
    const delta = e.clientX - inicioX;
    capa.rotacion += delta * 0.4;
    aplicarTransformacion(capa);
    inicioX = e.clientX;
  });

  document.addEventListener('mouseup', () => {
    arrastrando = false;
    capa.textEl.style.cursor = 'grab';
  });

  // Mobile
  capa.textEl.addEventListener('touchstart', e => {
    arrastrando = true;
    inicioX = e.touches[0].clientX;
    e.preventDefault();
  });

  document.addEventListener('touchmove', e => {
    if (!arrastrando) return;
    const delta = e.touches[0].clientX - inicioX;
    capa.rotacion += delta * 0.4;
    aplicarTransformacion(capa);
    inicioX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', () => {
    arrastrando = false;
  });
}

// Aplicar transformación (rotación + invertir)
function aplicarTransformacion(capa) {
  const rotFinal = capa.invertido ? capa.rotacion + 180 : capa.rotacion;
  capa.textEl.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
}

// ========================
// BOTONES CAPAS
// ========================
agregarCapaBtn.addEventListener('click', () => agregarCapa());
quitarCapaBtn.addEventListener('click', quitarCapa);

// ========================
// INICIALIZACIÓN
// ========================
agregarCapa();
