const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu API
const urlParams = new URLSearchParams(window.location.search);
const usuarioId = urlParams.get('id');

function llenarDatosUsuarioEnFormulario() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/users/${usuarioId}`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          const usuario = JSON.parse(xhr.responseText);
          // Llenar los campos del formulario con los datos del usuario
          document.getElementById('email').value = usuario.email;
  
         
        } catch (error) {
          console.error('Error al analizar la respuesta:', error);
          // Manejar el error de acuerdo a tus necesidades
        }
      } else if (xhr.status === 401) {
        // Redireccionar al login si el token es inválido
        window.location.href = 'login.html';
      } else {
        console.error('Error al obtener el usuario:', xhr.status);
        // Manejar el error de acuerdo a tus necesidades
      }
    };
  
    xhr.onerror = function() {
      console.error('Error al realizar la solicitud');
      // Manejar el error de acuerdo a tus necesidades
    };
  
    xhr.send();
  }

  function enviarFormulario( correo, contrasenia) {

    const update = {
      "email":correo,
      "password":contrasenia
    }

    fetch(`${API_URL}/users/${usuarioId}`, {
      method: 'PUT',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400 || response.status === 500) {
          return response.json().then(errorData => {
            console.error('Error al actualizar usuario:', errorData.mensaje);
            alert('Error al actualizar usuario: ' + errorData.mensaje);
            throw new Error('Error al actualizar usuario');
          });
        } else if (response.status === 401) {
          window.location.href = 'login.html';
          throw new Error('Token inválido');
        } else {
          console.error('Error al actualizar usuario:', response.status);
          alert('Error al actualizar usuario:', response.status);
          throw new Error('Error al actualizar usuario');
        }
      })
      .then(usuarioActualizado => {
        // Lógica adicional después de actualizar el usuario
        alert('Usuario actualizado correctamente');
        window.location.href = 'Administrar.html';
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        alert('Error al realizar la solicitud');
      });
    



  }
  


  

  // Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    llenarDatosUsuarioEnFormulario();
    const formulario = document.getElementById('form');
    const inputCorreo = document.getElementById('email');
    const inputContrasenia = document.getElementById('password');

    formulario.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe por defecto
      const campos = [
        { campo: inputCorreo, mensaje: 'Por favor, ingrese un correo', validar: validarCorreo },
        { campo: inputContrasenia, mensaje: 'Por favor, ingrese una contraseña'},
      ];
    
      for (const { campo, mensaje, validar } of campos) {

        const valor = campo.value.trim();
    
        if (valor === '' || (validar && !validar(valor))) {
          alert(mensaje);
          campo.focus();
          return;
        }
      }
      const correo = inputCorreo.value.trim();
      const contrasenia = inputContrasenia.value.trim();
      enviarFormulario(correo,contrasenia);
      return false;

    },true);
});

  // Función para validar el formato de correo electrónico
  function validarCorreo(correo) {
    // Expresión regular para validar el formato de correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  }

   // Función para validar la contraseña
  function validarContrasenia(contrasenia) {
    // Verificar que la contraseña tenga al menos 8 caracteres
    // y contenga al menos un dígito, una letra mayúscula y una letra minúscula
    return contrasenia.length >= 8 && /\d/.test(contrasenia) && /[A-Z]/.test(contrasenia) && /[a-z]/.test(contrasenia);
  }
