document.addEventListener('DOMContentLoaded', function() {
  // Menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Atualizar ano no footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Carregar espécies de tartarugas
  loadTurtleSpecies();
  
  // Configurar validação do formulário
  setupFormValidation();
  
  // Contador de caracteres para textarea
  setupCharacterCounter();
});

function loadTurtleSpecies() {
  const species = [
    {
      name: "Tartaruga-de-pente",
      image: "https://www.tamar.org.br/fotos/F02_035_1.jpg",
      description: "Conhecida por seu belo casco usado na fabricação de jóias.",
      status: "endangered",
      credit: "Foto: Projeto TAMAR"
    },
    {
      name: "Tartaruga-verde",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTStvKgDAdr18IcYFCMX4rHNiX3rHWMOX613Q&s",
      description: "A maior das tartarugas de casco duro e única herbívora na fase adulta.",
      status: "endangered",
      credit: "Foto: Google Images"
    },
    {
      name: "Tartaruga-gigante",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Geochelone_gigantea-cornelle.jpg",
      description: "Encontradas nas Ilhas Galápagos, podem viver mais de 100 anos.",
      status: "vulnerable",
      credit: "Foto: Wikimedia Commons"
    },
    {
      name: "Tartaruga-oliva",
      image: "https://lh6.googleusercontent.com/proxy/RLLPof8njcjuIl1FXuQP1ESX3lkB1ohw3WXd8h1Z9TriJgGqBKEgKnDy01HW3Y3Gjke_Rjb66LYj_7VwWq6MOp1UtXf3GG6PJONANUY",
      description: "A menor das tartarugas marinhas, com cerca de 60-70 cm de comprimento.",
      status: "vulnerable",
      credit: "Foto: Google Images"
    },
    {
      name: "Tartaruga-de-couro",
      image: "https://faunanews.com.br/wp-content/uploads/2023/05/Imagem-3.jpg",
      description: "A maior de todas as tartarugas marinhas, podendo atingir 2 metros de comprimento.",
      status: "vulnerable",
      credit: "Foto: Fauna News"
    }
  ];
  
  const gallery = document.querySelector('.species-gallery');
  
  species.forEach(turtle => {
    const card = document.createElement('div');
    card.className = 'species-card';
    
    card.innerHTML = `
      <div class="species-img">
        <img src="${turtle.image}" alt="${turtle.name}" loading="lazy">
        <div class="image-credit">${turtle.credit}</div>
      </div>
      <div class="species-info">
        <h3>${turtle.name}</h3>
        <p>${turtle.description}</p>
        <span class="species-status status-${turtle.status}">
          ${getStatusText(turtle.status)}
        </span>
      </div>
    `;
    
    gallery.appendChild(card);
  });
}

function getStatusText(status) {
  const statusMap = {
    'endangered': 'Em perigo crítico',
    'vulnerable': 'Vulnerável',
    'least-concern': 'Pouco preocupante'
  };
  return statusMap[status] || 'Desconhecido';
}

function setupFormValidation() {
  const form = document.getElementById('form-contato');
  const retorno = document.getElementById('retorno-formulario');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Resetar mensagens de erro
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });
    
    // Validar campos
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');
    const newsletter = document.getElementById('newsletter');
    
    let isValid = true;
    
    // Validar nome
    if (!nome.value.trim()) {
      document.getElementById('nome-error').textContent = 'Por favor, insira seu nome';
      isValid = false;
    } else if (nome.value.trim().length < 3) {
      document.getElementById('nome-error').textContent = 'O nome deve ter pelo menos 3 caracteres';
      isValid = false;
    }
    
    // Validar email
    if (!email.value.trim()) {
      document.getElementById('email-error').textContent = 'Por favor, insira seu e-mail';
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      document.getElementById('email-error').textContent = 'Por favor, insira um e-mail válido';
      isValid = false;
    }
    
    // Validar assunto
    if (!assunto.value) {
      document.getElementById('assunto-error').textContent = 'Por favor, selecione um assunto';
      isValid = false;
    }
    
    // Validar mensagem
    if (!mensagem.value.trim()) {
      document.getElementById('mensagem-error').textContent = 'Por favor, insira sua mensagem';
      isValid = false;
    } else if (mensagem.value.trim().length < 10) {
      document.getElementById('mensagem-error').textContent = 'A mensagem deve ter pelo menos 10 caracteres';
      isValid = false;
    }
    
    if (isValid) {
      // Enviar formulário
      sendEmail(
        nome.value.trim(),
        email.value.trim(),
        assunto.value,
        mensagem.value.trim(),
        newsletter.checked
      );
    } else {
      retorno.textContent = 'Por favor, corrija os erros no formulário.';
      retorno.className = 'error-message';
      retorno.setAttribute('role', 'alert');
      retorno.focus();
    }
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function setupCharacterCounter() {
  const mensagem = document.getElementById('mensagem');
  const charCount = document.getElementById('char-count');
  
  mensagem.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = count;
    
    if (count > 500) {
      charCount.style.color = 'var(--error-color)';
    } else {
      charCount.style.color = 'inherit';
    }
  });
}

function sendEmail(nome, email, assunto, mensagem, newsletter) {
  const retorno = document.getElementById('retorno-formulario');
  
  // Simular envio para o e-mail caue.guedes@escola.pr.gov.br
  // Em produção, você precisaria de um backend para isso
  // Aqui está uma simulação do que aconteceria
  
  const formData = {
    nome: nome,
    email: email,
    assunto: assunto,
    mensagem: mensagem,
    newsletter: newsletter,
    destinatario: 'caue.guedes@escola.pr.gov.br'
  };
  
  console.log('Dados do formulário que seriam enviados:', formData);
  
  // Simular atraso de rede
  setTimeout(() => {
    retorno.textContent = 'Mensagem enviada com sucesso para caue.guedes@escola.pr.gov.br! Obrigado pelo seu contato.';
    retorno.className = 'success-message';
    retorno.setAttribute('role', 'alert');
    
    // Limpar formulário
    document.getElementById('form-contato').reset();
    document.getElementById('char-count').textContent = '0';
    
    // Focar no retorno para acessibilidade
    retorno.focus();
    
    // Esconder mensagem após 5 segundos
    setTimeout(() => {
      retorno.textContent = '';
      retorno.className = '';
    }, 5000);
  }, 1000);
}
