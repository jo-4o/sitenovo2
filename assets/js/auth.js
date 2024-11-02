// Mock dos dados para teste inicial
let users = JSON.parse(localStorage.getItem('users')) || [];

// Função de login
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } else {
    alert('Usuário não encontrado!');
  }
}

// Função de cadastro
function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (username && password) {
    const newUser = { id: users.length + 1, username, password, role: 'Aluno' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário cadastrado com sucesso!');
    window.location.href = 'index.html';
  } else {
    alert('Preencha todos os campos!');
  }
}
