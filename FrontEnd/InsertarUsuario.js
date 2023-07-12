const xhr = new XMLHttpRequest();
const url = 'http://localhost:3000/users';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Obtener los valores de los campos de entrada
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Crear un objeto con los datos del registro
      const registro = {
        email: email,
        password: password
      };

      // Realizar la solicitud POST a la API
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registro)
      })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta de la API
        alert("El usuario se ha registrado correctamente.");
        window.location.href = 'Administrar.html';
        console.log(data); // Puedes hacer lo que quieras con la respuesta
      })
      .catch(error => {
        // Manejar cualquier error
        alert("El usuario no se ha registrado correctamente.");
        console.error('Error:', error);
      });
    });
  });





