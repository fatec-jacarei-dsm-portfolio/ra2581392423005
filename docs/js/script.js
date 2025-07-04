document.addEventListener('DOMContentLoaded', () => {
  // Inicializa a biblioteca de animações AOS
  AOS.init({
    duration: 800, // Duração da animação em ms
    once: true, // Animação acontece apenas uma vez
  });

  // Seleciona todos os botões de projeto pela nova classe 'project-trigger'
  const projectButtons = document.querySelectorAll('.project-trigger');
  const modal = document.getElementById('project-modal');

  // Se o modal não existir na página, interrompe o script
  if (!modal) {
    console.error("Elemento do modal não encontrado. Verifique o ID 'project-modal'.");
    return;
  }

  const modalContentArea = document.getElementById('modal-content-area');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalLink = document.getElementById('modal-link');
  const closeModalButton = modal.querySelector('.close');

  projectButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Pega os dados dos data-attributes do botão clicado
      const { img, title, description, link } = button.dataset;

      // Preenche o modal com os dados do projeto
      modalImg.src = img;
      modalImg.alt = title;
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalLink.href = link;

      // Exibe o modal usando as classes do Tailwind
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      
      // Adiciona uma pequena animação de "zoom-in" ao abrir
      setTimeout(() => {
        modalContentArea.classList.remove('scale-95');
      }, 10);
    });
  });

  // Função para fechar o modal
  const closeModal = () => {
    modalContentArea.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 300); // A duração deve corresponder à transição no CSS (duration-300)
  };

  // Eventos para fechar o modal
  closeModalButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => event.target === modal && closeModal());
  document.addEventListener('keydown', (event) => event.key === 'Escape' && !modal.classList.contains('hidden') && closeModal());
});