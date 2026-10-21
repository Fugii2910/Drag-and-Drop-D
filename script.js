// Controlo da pontuação
let pontuacao = 0;

const scoreDisplay = document.getElementById('score');
const foods = document.querySelectorAll('.food-item');
const basket = document.getElementById('basket');
const placeholder = document.querySelector('.placeholder-text');

// Configuração dos eventos de drag para cada alimento
foods.forEach(food => {
  food.addEventListener('dragstart', dragStart);
  food.addEventListener('dragend', dragEnd);
});

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  setTimeout(() => event.target.classList.add('dragging'), 0);
}

function dragEnd(event) {
  event.target.classList.remove('dragging');
}

// Eventos da Zona de Soltura (Cesta)
basket.addEventListener('dragover', dragOver);
basket.addEventListener('dragenter', dragEnter);
basket.addEventListener('dragleave', dragLeave);
basket.addEventListener('drop', drop);

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  basket.classList.add('hovered');
}

function dragLeave() {
  basket.classList.remove('hovered');
}

function drop(event) {
  event.preventDefault();
  basket.classList.remove('hovered');

  const foodId = event.dataTransfer.getData('text/plain');
  const foodElement = document.getElementById(foodId);

  if (!foodElement) return;

  // Verifica se o alimento é saudável através do atributo data-saudavel
  const isSaudavel = foodElement.getAttribute('data-saudavel') === 'true';

  if (isSaudavel) {
    // Soma 10 pontos ao acertar
    pontuacao += 10;
    
    // Oculta o texto explicativo da cesta ao inserir o primeiro item
    if (placeholder) {
      placeholder.style.display = 'none';
    }

    // Move o alimento para dentro da cesta
    basket.appendChild(foodElement);
  } else {
    // Subtrai 10 pontos ao errar (com limite mínimo de 0 pontos)
    pontuacao = Math.max(0, pontuacao - 10);
    
    // Feedback visual temporário de erro na cesta
    basket.style.borderColor = '#ef4444';
    setTimeout(() => {
      basket.style.borderColor = '#10b981';
    }, 400);
  }

  // Atualiza o valor no ecrã
  scoreDisplay.textContent = pontuacao;
}