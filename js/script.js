// Acessando elementos
const carrossel = document.querySelector('.carrossel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let index = 0; // O índice da imagem atual

// Função para mostrar a imagem correta de acordo com o índice
function updateCarrossel() {
    const totalItems = document.querySelectorAll('.item').length;
    // Move o carrossel para a posição correta
    carrossel.style.transform = `translateX(-${index * 100}%)`;
}

// Função para mover para a próxima imagem
function nextImage() {
    const totalItems = document.querySelectorAll('.item').length;
    index = (index + 1) % totalItems; // Vai para a próxima imagem, e volta à primeira no final
    updateCarrossel();
}

// Função para mover para a imagem anterior
function prevImage() {
    const totalItems = document.querySelectorAll('.item').length;
    index = (index - 1 + totalItems) % totalItems; // Vai para a imagem anterior, e vai para a última no começo
    updateCarrossel();
}

// Adicionando eventos aos botões
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Configuração para mover automaticamente a cada 3 segundos
setInterval(nextImage, 3000);