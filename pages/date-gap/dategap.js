/*==================== SHOW NAVBAR ====================*/
const showMenu = (headerToggle, navbarId) => {
  const toggleBtn = document.getElementById(headerToggle),
      nav = document.getElementById(navbarId);

  // Validate that variables exist
  if (headerToggle && navbarId) {
      toggleBtn.addEventListener('click', () => {
          // We add the show-menu class to the div tag with the nav__menu class
          nav.classList.toggle('show-menu');
          // change icon
          toggleBtn.classList.toggle('bx-x');
      });
  }
};
showMenu('header-toggle', 'navbar');

/*==================== LINK ACTIVE ====================*/
const linkColor = document.querySelectorAll('.nav__link');

function colorLink() {
  linkColor.forEach(l => l.classList.remove('active'));
  this.classList.add('active');
}

linkColor.forEach(l => l.addEventListener('click', colorLink));

const navLinks = document.querySelectorAll('.nav__link');
const contentContainer = document.getElementById('content-container');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default behavior
      const targetURL = event.target.href;

      fetch(targetURL)
          .then(response => response.text())
          .then(data => {
              contentContainer.innerHTML = data; // Load fetched content
          })
          .catch(error => {
              console.error('Error fetching content:', error); // Handle errors
          });
  });
});

/*==================== CALCULATE DATE GAP ====================*/
function calculate() {
  const fromDate = document.getElementById('from').value;
  const toDate = document.getElementById('to').value;
  const result = document.getElementById('result');

  if (!fromDate || !toDate) {
      result.innerHTML = 'Please select both dates.';
      return;
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);

  if (from > to) {
      result.innerHTML = 'From date should be earlier than to date.';
      return;
  }

  const timeDifference = to - from;
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  result.innerHTML = `The gap between the dates is ${Math.ceil(daysDifference)} days.`;
}

/*==================== RESET FORM ====================*/
function resetForm() {
  document.getElementById('from').value = '';
  document.getElementById('to').value = '';
  document.getElementById('result').innerHTML = '';
}
