document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const registrationForm = document.getElementById('registrationForm');
  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Envia los datos de registro al servidor
    socket.emit('register', { username, password });
  });
});
