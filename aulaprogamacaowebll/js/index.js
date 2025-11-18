document.addEventListener('DOMContentLoaded', () => {

  /* =============================
     MENU RESPONSIVO
  ============================= */
  const toggleMenu = () => {
    const menu = document.getElementById('navMenu');
    if (menu) menu.classList.toggle('active');
  };
  window.toggleMenu = toggleMenu;

  /* =============================
     SCROLL SUAVE ENTRE SEÇÕES
  ============================= */
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerHeight = 70;
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({ top: sectionPosition, behavior: 'smooth' });

    const menu = document.getElementById('navMenu');
    if (menu) menu.classList.remove('active');
  };
  window.scrollToSection = scrollToSection;

  /* =============================
     EXIBIR VOLUNTÁRIOS CADASTRADOS
  ============================= */
  const exibirVoluntarios = () => {
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    const tabelaContainer = document.getElementById('tabelaVoluntarios');

    if (!tabelaContainer) return;

    if (voluntarios.length === 0) {
      tabelaContainer.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
      return;
    }

    let html = `
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Idade</th>
            <th>Disponibilidade</th>
            <th>Área de Interesse</th>
          </tr>
        </thead>
        <tbody>
    `;

    voluntarios.forEach(v => {
      html += `
        <tr>
          <td>${v.nome}</td>
          <td>${v.email}</td>
          <td>${v.telefone}</td>
          <td>${v.idade}</td>
          <td>${v.disponibilidade}</td>
          <td>${v.areaInteresse}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;
    tabelaContainer.innerHTML = html;
  };

  /* =============================
     FORMULÁRIO DE CADASTRO
  ============================= */
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = document.getElementById('volunteerForm');
    if (!form) return;

    if (form.dataset.submitting === 'true') return;
    form.dataset.submitting = 'true';

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

    if (!nome || !email) {
      alert("Por favor, preencha os campos obrigatórios: nome e e-mail.");
      form.dataset.submitting = "false";
      return;
    }

    const formData = {
      nome,
      email,
      telefone: form.telefone.value.trim(),
      idade: form.idade.value.trim(),
      disponibilidade: form.disponibilidade.value.trim(),
      areaInteresse: form.areaInteresse.value.trim(),
      experiencia: form.experiencia.value.trim(),
      motivacao: form.motivacao.value.trim(),
      dataCadastro: new Date().toLocaleString()
    };

    let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    voluntarios.push(formData);
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
      successMessage.classList.add('show');
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => successMessage.classList.remove('show'), 4000);
    }

    setTimeout(() => {
      form.reset();
      form.dataset.submitting = 'false';
    }, 1000);

    exibirVoluntarios();
  };

  /* =============================
     EVENTOS INICIAIS
  ============================= */
  const form = document.getElementById('volunteerForm');
  if (form) form.addEventListener('submit', handleSubmit);

  // Exibir lista ao carregar (em qualquer página que tenha a tabela)
  exibirVoluntarios();

});