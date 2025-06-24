// Aqui você pode adicionar interações JS no futuro, por exemplo:
// alert("Bem-vindo ao meu portfólio!");

console.log("Portfólio carregado com sucesso.");

function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}
// Fecha o modal ao clicar fora do conteúdo
window.onclick = function(event) {
  document.querySelectorAll('.modal').forEach(function(modal) {
    if (event.target === modal) modal.style.display = "none";
  });
}