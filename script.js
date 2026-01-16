const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const textoGrupo = document.getElementById('textoGrupo');
const invertirBtn = document.getElementById('invertirBtn');

// Texto en tiempo real
textoInput.addEventListener('input', () => {
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

let invertido = false;

// Rotación REAL 180° (correcta)
invertirBtn.addEventListener('click', () => {
  if (!invertido) {
    textoGrupo.setAttribute(
      'transform',
      'rotate(180 210 210)'
    );
  } else {
    textoGrupo.removeAttribute('transform');
  }
  invertido = !invertido;
});
