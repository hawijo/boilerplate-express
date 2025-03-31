const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  window.location.href = '/loggedin';
    

});