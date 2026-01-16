const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const textoCircularEl = document.getElementById('textoCircularEl');
const invertirBtn = document.getElementById('invertirBtn');

// Texto en tiempo real
textoInput.addEventListener('input', () => {
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// Invertir dirección del texto SIN romper el círculo
invertirBtn.addEventListener('click', () => {
  const actual = textoCircularEl.getAttribute('transform');

  if (actual) {
    textoCircularEl.removeAttribute('transform');
  } else {
    textoCircularEl.setAttribute(
      'transform',
      'scale(1,-1) translate(0,-420)'
    );
  }
});
