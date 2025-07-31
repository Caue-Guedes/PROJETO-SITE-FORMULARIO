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
