const displayImage = document.getElementById('displayImage');
const placeholder = document.querySelector('.placeholder');
const fileInput = document.getElementById('fileInput');
const loadBtn = document.getElementById('loadBtn');
const nextBtn = document.getElementById('nextBtn');
const removeCurrentBtn = document.getElementById('removeCurrentBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const rotateBtn = document.getElementById('rotateBtn');
const downloadBtn = document.getElementById('downloadBtn');

let images = [];
let currentIndex = -1;
let scale = 1;
let rotation = 0;

// Cargar imágenes
loadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
  if (files.length > 0) {
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      images.push(url);
    });
    if (currentIndex === -1) currentIndex = images.length - 1;
    resetTransform();
    showImage();
  }
});

function showImage() {
  if (currentIndex >= 0 && currentIndex < images.length) {
    displayImage.src = images[currentIndex];
    displayImage.style.display = 'block';
    placeholder.style.display = 'none';
    applyTransform();
  } else {
    displayImage.style.display = 'none';
    placeholder.style.display = 'block';
    currentIndex = -1;
  }
}

function resetTransform() {
  scale = 1;
  rotation = 0;
}

function applyTransform() {
  displayImage.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
}

// Correr imagen
nextBtn.addEventListener('click', () => {
  if (images.length > 0) {
    currentIndex = (currentIndex + 1) % images.length;
    resetTransform();
    showImage();
  }
});

// Borrar imagen actual
removeCurrentBtn.addEventListener('click', () => {
  if (images.length > 0 && currentIndex >= 0) {
    images.splice(currentIndex, 1);
    if (images.length === 0) {
      currentIndex = -1;
    } else {
      // Mantener índice dentro del rango
      currentIndex = currentIndex % images.length;
    }
    resetTransform();
    showImage();
  }
});

// Borrar todas
clearAllBtn.addEventListener('click', () => {
  images = [];
  currentIndex = -1;
  resetTransform();
  showImage();
  fileInput.value = '';
});

// Zoom in
zoomInBtn.addEventListener('click', () => {
  if (currentIndex >= 0) {
    scale = Math.min(scale + 0.2, 3);
    applyTransform();
  }
});

// Zoom out
zoomOutBtn.addEventListener('click', () => {
  if (currentIndex >= 0) {
    scale = Math.max(scale - 0.2, 0.5);
    applyTransform();
  }
});

// Rotar
rotateBtn.addEventListener('click', () => {
  if (currentIndex >= 0) {
    rotation = (rotation + 90) % 360;
    applyTransform();
  }
});

// Descargar
downloadBtn.addEventListener('click', () => {
  if (currentIndex >= 0) {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = 'imagen-visora.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('No hay imagen para descargar.');
  }
});