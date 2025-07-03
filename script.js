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
      image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Conhecida por seu belo casco usado na fabricação de jóias.",
      status: "endangered"
    },
    {
      name: "Tartaruga-verde",
      image: "https://images.unsplash.com/photo-1558640476-437a2b9438a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "A maior das tartarugas de casco duro e única herbívora na fase adulta.",
      status: "endangered"
    },
    {
      name: "Tartaruga-gigante",
      image: "https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Encontradas nas Ilhas Galápagos, podem viver mais de 100 anos.",
      status: "vulnerable"
    },
    {
      name: "Tartaruga-oliva",
      image: "https://images.unsplash.com/photo-1560279969-9ff8a9f14a4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "A menor das tartarugas marinhas, com cerca de 60-70 cm de comprimento.",
      status: "vulnerable"
    },
    {
      name: "Tartaruga-de-couro",
      image: "https://images.unsplash.com/photo-1560279969-9ff8a9f14a4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "A maior de todas as tartarugas marinhas, podendo atingir 2 metros de comprimento.",
      status: "vulnerable"
    }
  ];
  
  const gallery = document.querySelector('.species-gallery');
  
  species.forEach(turtle => {
    const card = document.createElement('div');
    card.className = 'species-card';
    
    card.innerHTML = `
      <div class="species-img">
        <img src="${turtle.image}" alt="${turtle.name}" loading="lazy">
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
      // Simular envio do formulário
      retorno.textContent = 'Mensagem enviada com sucesso! Obrigado pelo seu contato.';
      retorno.className = 'success-message';
      retorno.setAttribute('role', 'alert');
      
      // Limpar formulário
      form.reset();
      document.getElementById('char-count').textContent = '0';
      
      // Focar no retorno para acessibilidade
      retorno.focus();
      
      // Simular envio assíncrono
      setTimeout(() => {
        retorno.textContent = '';
        retorno.className = '';
      }, 5000);
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
