// Function to load modules dynamically
function loadModule(module) {
  fetch(`modules/${module}.html`)
      .then(response => response.text())
      .then(html => {
          const iframe = document.getElementById('dashboard-iframe');
          const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

          // Save current iframe content if needed
          const currentData = iframeDocument.getElementById('form-data') ? iframeDocument.getElementById('form-data').value : null;

          // Load new module HTML into iframe
          iframeDocument.open();
          iframeDocument.write(html);
          iframeDocument.close();

          // Restore previous data if applicable
          if (currentData && iframeDocument.getElementById('form-data')) {
              iframeDocument.getElementById('form-data').value = currentData;
          }
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

// Default selection - Load the default module
document.addEventListener('DOMContentLoaded', function() {
  // Find the default menu item and trigger its click event
  const defaultMenuItem = document.querySelector('.nav__link.active');
  if (defaultMenuItem) {
      defaultMenuItem.click(); // Simulate click to load default module
  }

  // Event listener for menu items
  linkColor.forEach(l => l.addEventListener('click', colorLink));

  // Initialize menu toggle
  showMenu('header-toggle', 'navbar');
});

// Logout functionality
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
