// Function to load modules dynamically
function loadModule(module) {
    fetch(`modules/${module}.html`)
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
      })
      .catch(err => console.error('Error loading module:', err));
  }
  
  // Show the sidebar menu
  const showMenu = (headerToggle, navbarId) => {
    const toggleBtn = document.getElementById(headerToggle),
      nav = document.getElementById(navbarId);
    
    if (headerToggle && navbarId) {
      toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
        toggleBtn.classList.toggle('bx-x');
      });
    }
  };
  
  // Activate the selected link and load the corresponding module
  const linkColor = document.querySelectorAll('.nav__link');
  
  function colorLink() {
    linkColor.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    
    const module = this.getAttribute('data-module');
    if (module) {
      loadModule(module);
    }
  }
  
  linkColor.forEach(l => l.addEventListener('click', colorLink));
  
  showMenu('header-toggle', 'navbar');

  document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.querySelector('.nav__logout');

    logoutLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        window.location.href = './components/logout.html'; // Redirect to logout page
        setTimeout(function() {
            window.close(); // Close the current tab after 3 seconds
        }, 3000); // Adjust timeout as needed
    });
});

  


