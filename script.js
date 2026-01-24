const textPath = document.getElementById("textPath");
const textInput = document.getElementById("textInput");
const svgText = document.getElementById("virolaText");

let startOffset = 50;
let inverted = false;
let sizeIndex = 1;
const sizes = [12, 16, 20, 24];

// Texto en vivo
textInput.addEventListener("input", () => {
  textPath.textContent = textInput.value || " ";
});

// Agregar texto
document.getElementById("add").onclick = () => {
  textInput.value += " TEXTO";
  textPath.textContent = textInput.value;
};

// Quitar texto
document.getElementById("remove").onclick = () => {
  textInput.value = "";
  textPath.textContent = " ";
};

// Tamaño (4 alturas)
document.getElementById("size").onclick = () => {
  sizeIndex = (sizeIndex + 1) % sizes.length;
  svgText.style.fontSize = sizes[sizeIndex] + "px";
};

// Invertir (texto de cabeza, mismo lugar)
document.getElementById("invert").onclick = () => {
  inverted = !inverted;
  svgText.setAttribute(
    "transform",
    inverted ? "rotate(180 150 150)" : "rotate(0 150 150)"
  );
};

// Rotar libre 360° (mouse / táctil)
let dragging = false;
let startX = 0;

svgText.addEventListener("pointerdown", e => {
  dragging = true;
  startX = e.clientX;
  svgText.setPointerCapture(e.pointerId);
});

svgText.addEventListener("pointermove", e => {
  if (!dragging) return;
  const dx = e.clientX - startX;
  startOffset = (startOffset + dx * 0.15) % 100;
  textPath.setAttribute("startOffset", startOffset + "%");
  startX = e.clientX;
});

svgText.addEventListener("pointerup", () => dragging = false);
svgText.addEventListener("pointerleave", () => dragging = false);
