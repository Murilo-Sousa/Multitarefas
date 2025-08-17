// --- Helper para texto do botão
function updateButtonText(theme) {
    const btn = document.getElementById('theme-toggle');
    btn.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
  }
  
  // --- Toggle de tema via clique
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButtonText(newTheme);
  });
  
  // --- Carregar tema salvo ao abrir a página
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateButtonText(savedTheme);
  
  // --- Sincronizar entre abas/janelas
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      const theme = e.newValue || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      updateButtonText(theme);
    }
  });
  
  // --- Relógio Digital
  function updateClock() {
      const now = new Date();
      document.getElementById('digital-clock').textContent = now.toLocaleTimeString();
      document.getElementById('date').textContent = now.toLocaleDateString('pt-BR');
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  