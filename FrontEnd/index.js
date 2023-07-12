
document.addEventListener('DOMContentLoaded', function() {
    const loginLi = document.getElementById('login');
    const logoutLi = document.getElementById('CerrarSesion');
    const adminLi = document.getElementById('VerUsuarios');

    if (localStorage.getItem('token')) {
      loginLi.style.display = 'none';
      logoutLi.style.display = 'block';
      adminLi.style.display = 'block';
    } else {
      loginLi.style.display = 'block';
      logoutLi.style.display = 'none';
      adminLi.style.display = 'none';
    }

    
    

  });

