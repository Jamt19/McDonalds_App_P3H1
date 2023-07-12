

// Función para borrar un usuario
function deleteUser(id) {
  fetch(`https://mc-app.onrender.com/users/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al eliminar el usuario');
      }
    })
    .then(data => {
      console.log('Usuario eliminado:', data);
      // Realizar cualquier otra acción necesaria después de eliminar el usuario
      window.location.href = `Administrar.html?id=${id}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
  

