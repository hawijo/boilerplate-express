const signupForm = document.getElementById('signinForm')

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    window.location.href = '/loggedin';
      
  
  });