const url = 'http://localhost:3000/login';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const warnings = document.getElementById('warnings');

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const loginData = {
        email: email,
        password: password
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Guardar el token en el almacenamiento local (por ejemplo, localStorage)
          localStorage.setItem('token', data.token);
          // Redireccionar o realizar otras acciones después del inicio de sesión exitoso
          window.location.href = 'index.html';
        } else {
          warnings.textContent = data.message;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        warnings.textContent = 'Error interno del servidor';
      });
    });
  });