const svg = document.getElementById("svg");
const input = document.getElementById("textInput");

const sizes = [14, 18, 22, 26]; // 4 alturas
let texts = [];
let active = null;

function createText(content) {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");

  text.setAttribute("font-size", sizes[1]);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("cursor", "grab");
  text.setAttribute("transform-origin", "160px 160px");

  textPath.setAttribute("href", "#textPathCircle");
  textPath.setAttribute("startOffset", "50%");
  textPath.textContent = content || "TEXTO";

  text.appendChild(textPath);
  svg.appendChild(text);

  const obj = {
    text,
    textPath,
    sizeIndex: 1,
    offset: 50,
    inverted: false
  };

  enableDrag(obj);
  texts.push(obj);
  setActive(obj);
}

function setActive(obj) {
  active = obj;
  input.value = obj.textPath.textContent;
}

input.addEventListener("input", () => {
  if (active) active.textPath.textContent = input.value;
});

document.getElementById("add").onclick = () => {
  createText(input.value);
};

document.getElementById("remove").onclick = () => {
  if (!active) return;
  svg.removeChild(active.text);
  texts = texts.filter(t => t !== active);
  active = texts[texts.length - 1] || null;
  if (active) input.value = active.textPath.textContent;
};

document.getElementById("invert").onclick = () => {
  if (!active) return;
  active.inverted = !active.inverted;
  active.text.setAttribute(
    "transform",
    active.inverted ? "rotate(180 160 160)" : "rotate(0 160 160)"
  );
};

document.getElementById("size").onclick = () => {
  if (!active) return;
  active.sizeIndex = (active.sizeIndex + 1) % sizes.length;
  active.text.setAttribute("font-size", sizes[active.sizeIndex]);
};

// Drag angular (mouse + touch)
function enableDrag(obj) {
  let startX = 0;

  const start = e => {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    setActive(obj);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);
  };

  const move = e => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = (x - startX) * 0.15;
    startX = x;

    obj.offset = Math.min(80, Math.max(20, obj.offset + delta));
    obj.textPath.setAttribute("startOffset", obj.offset + "%");
  };

  const end = () => {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("touchmove", move);
    window.removeEventListener("mouseup", end);
    window.removeEventListener("touchend", end);
  };

  obj.text.addEventListener("mousedown", start);
  obj.text.addEventListener("touchstart", start);
}

// Texto inicial
createText("TEXTO");
