// Variável para armazenar a URL da imagem de perfil
let profileImageUrl = 'https://via.placeholder.com/150'; // URL padrão

// Função para exibir o perfil
function renderProfile(content) {
  content.innerHTML = `
    <h2>Perfil do Usuário</h2>
    <div class="profile-container">
      <div class="profile-image" style="background-image: url('${profileImageUrl}');"></div>
      <input type="file" id="profileImageInput" style="display:none" accept="image/*" onchange="updateProfileImage(event)">
      <button onclick="document.getElementById('profileImageInput').click()">Atualizar Foto de Perfil</button>
    </div>
  `;
}

// Função para atualizar a imagem de perfil
function updateProfileImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profileImageUrl = e.target.result;
      renderProfile(document.getElementById('content')); // Atualiza a página de perfil
    };
    reader.readAsDataURL(file);
  }
}

// Função para renderizar a página de configurações com modo escuro e logout
function renderSettings(content) {
  content.innerHTML = `
    <h2>Configurações</h2>
    <button onclick="toggleDarkMode()">Modo Escuro</button>
    <button onclick="logout()">Deslogar</button>
  `;
}

// Alterna o modo escuro no corpo da página
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Função de logout
function logout() {
  window.location.href = 'index.html'; // Redireciona para a página de login
}

// Navegação para as novas páginas de perfil e configurações
function navigate(section) {
  const content = document.getElementById('content');
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuItems.forEach(item => item.classList.remove('active'));
  document.querySelector(`.menu-item[onclick="navigate('${section}')"]`).classList.add('active');
  
  if (section === 'home') {
    // Exibe a tela inicial
    content.innerHTML = `
      <div class="home-content">
        <h1>Sistema de Demandas Descomplica Uniamérica</h1>
        <p>Bem-vindo ao sistema que simplifica o gerenciamento de demandas de projetos acadêmicos e profissionais.</p>
        <div class="navigation-buttons">
          <button onclick="navigate('demands')">Ver Demandas</button>
          <button onclick="navigate('profile')">Acessar Perfil</button>
          <button onclick="navigate('settings')">Configurações</button>
        </div>
      </div>
    `;
  } else if (section === 'profile') {
    renderProfile(content);
  } else if (section === 'demands') {
    renderDemands(content);
  } else if (section === 'settings') {
    renderSettings(content);
  }
}


function renderDemands(content) {
  content.innerHTML = `
    <h2>Demandas</h2>
    <div class="demands-container">
      ${createDemandCard('Título da Demanda 1', 'Descrição breve da demanda...', 'assets/images/demanda1.jpg')}
      ${createDemandCard('Título da Demanda 2', 'Outra descrição curta...', 'assets/images/demanda2.jpg')}
      ${createDemandCard('Título da Demanda 3', 'Mais uma breve descrição...', 'assets/images/demanda3.jpg')}
    </div>
  `;
}
// Lista de demandas armazenada em um array
let demands = [
  { title: "Demanda 1", description: "Demanda Ex 1", imageUrl: "https://media.discordapp.net/attachments/1102772809337425923/1302055622308659322/Download_Rescue_Rescue_Operation_Mountain_Rescue__Royalty-Free_Stock_Illustration_Image.jpg?ex=6726b94b&is=672567cb&hm=a0486d4dcd33823664fdee71b0cbb209534be2a96c1883cb175bd77ff2871965&=&format=webp&width=565&height=565" },
  { title: "Demanda 2", description: "Demanda Ex 2", imageUrl: "https://media.discordapp.net/attachments/1102772809337425923/1302055623005048902/Download_Cook_Serve_Grill__Royalty-Free_Stock_Illustration_Image.jpg?ex=6726b94b&is=672567cb&hm=5f4d9e201bf04bf25c9dd570ec4d1450908afe669c353632ad247a5b8ba3805c&=&format=webp&width=565&height=565" },
  { title: "Demanda 3", description: "Demanda Ex 3", imageUrl: "https://media.discordapp.net/attachments/1102772809337425923/1302055622577225841/Download_free_media_from_Peggy_Marco___Pixabay.jpg?ex=6726b94b&is=672567cb&hm=5f92a319f8a115ab3b2c05bdfa0e17405ddcd0e961294fb2cb3a5a40c9bb96f5&=&format=webp&width=374&height=374" }
];

function renderDemands(content) {
  content.innerHTML = `
    <h2>Demandas</h2>
    <div class="demands-container">
      ${demands.map(demand => createDemandCard(demand.title, demand.description, demand.imageUrl)).join('')}
    </div>
  `;
}

function createDemandCard(title, description, imageUrl) {
  return `
    <div class="demand-card">
      <img src="${imageUrl}" alt="Imagem da Demanda">
      <h3>${title}</h3>
      <p>${description}</p>
      <button onclick="openDemandModal('${title}')">Ver Demanda</button>
    </div>
  `;
}

function openDemandModal(title) {
  const demand = demands.find(d => d.title === title);
  const modal = document.getElementById('demandModal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeDemandModal()">&times;</span>
      <h2>${demand.title}</h2>
      <p>${demand.description}</p>
      <form id="claimForm">
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="class">Turma:</label>
        <input type="text" id="class" name="class" required>
        
        <label for="shift">Turno:</label>
        <input type="text" id="shift" name="shift" required>
        
        <label for="group">Colegas de Grupo:</label>
        <input type="text" id="group" name="group">
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <button type="submit" onclick="submitClaim(event, '${title}')">Reivindicar Demanda</button>
      </form>
    </div>
  `;
  modal.style.display = 'block';
}

function closeDemandModal() {
  document.getElementById('demandModal').style.display = 'none';
}

function submitClaim(event, title) {
  event.preventDefault();

  // Obtenha os valores dos campos de entrada
  const name = document.getElementById('name').value.trim();
  const className = document.getElementById('class').value.trim();
  const shift = document.getElementById('shift').value.trim();
  const group = document.getElementById('group').value.trim();
  const email = document.getElementById('email').value.trim();

  // Verifica se todos os campos obrigatórios estão preenchidos
  if (!name || !className || !shift || !email) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Dados da demanda e do usuário para envio no webhook
  const webhookData = {
    content: `🚨 **Nova demanda reivindicada!** 🚨\n**Demanda:** ${title}\n**Nome:** ${name}\n**Turma:** ${className}\n**Turno:** ${shift}\n**Grupo:** ${group}\n**Email:** ${email}`
  };

  // Envia a solicitação ao webhook do Discord
  fetch("https://discord.com/api/webhooks/1110038333977018448/PvuV9G--OMRGGwWiDpmbJ8eyyNmBmV80SmJzvD2y3jr3ywmNnf8WsmYGKEbQGqigzqFY", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(webhookData)
  })
    .then(response => {
      if (response.ok) {
        // Remove a demanda se o webhook for enviado com sucesso
        const demandIndex = demands.findIndex(d => d.title === title);
        if (demandIndex !== -1) {
          demands.splice(demandIndex, 1);
          alert("Demanda reivindicada com sucesso! Notificação enviada.");
          closeDemandModal();
          renderDemands(document.getElementById('content')); // Re-renderiza a lista de demandas
        }
      } else {
        alert("Erro ao enviar a notificação. Tente novamente.");
      }
    })
    .catch(error => {
      console.error("Erro de rede:", error);
      alert("Erro ao conectar com o servidor. Tente novamente.");
    });
}
