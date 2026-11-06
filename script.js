// Dark / light mode
const themeBtn = document.getElementById('theme-toggle');

// Update the button text to show what the next click will do
function updateThemeButton() {
  const isDark = document.body.classList.contains('dark');
  themeBtn.textContent = isDark ? ' Light mode' : ' Dark mode';
  themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// Restore the saved theme when the page loads
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
updateThemeButton();

// Toggle the theme and remember the choice
themeBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeButton();
});

// Recipe filter (recipes page)
const filterButtons = document.querySelectorAll('.filter-btn');
const recipeCards = document.querySelectorAll('.recipe-card');

filterButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const region = btn.dataset.filter;

    // Highlight the active filter button
    filterButtons.forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    // Show or hide each card with the .hidden class
    recipeCards.forEach(function (card) {
      if (region === 'all' || card.dataset.region === region) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Favorites saved in localStorage (recipes page)
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

recipeCards.forEach(function (card) {
  const id = card.dataset.id;
  const favBtn = card.querySelector('.fav-btn');

  // Restore saved favorites when the page loads
  if (favorites.includes(id)) {
    favBtn.classList.add('active');
  }

  // Add or remove the recipe from favorites on click
  favBtn.addEventListener('click', function () {
    if (favorites.includes(id)) {
      favorites = favorites.filter(function (item) {
        return item !== id;
      });
    } else {
      favorites.push(id);
    }
    favBtn.classList.toggle('active');
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
});

// Ingredient scaler (recipe pages)
const servingsInput = document.getElementById('servings');

if (servingsInput) {
  servingsInput.addEventListener('input', function () {
    const base = Number(servingsInput.dataset.base);
    const now = Number(servingsInput.value) || base;

    // Multiply each base amount by the new servings ratio
    document.querySelectorAll('.amt').forEach(function (span) {
      const scaled = (Number(span.dataset.amount) * now) / base;
      span.textContent = Math.round(scaled * 100) / 100;
    });
  });
}

// Contact form validation (contact page)
const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', function (event) {
    // Stop the form from submitting automatically
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const error = document.getElementById('error');

    // The message must be longer than 20 characters
    if (message.length <= 20) {
      error.textContent = 'Your message must be more than 20 characters.';
      error.hidden = false;
      return;
    }

    // Hide the form and show a personalised confirmation
    error.hidden = true;
    form.style.display = 'none';

    const confirmation = document.getElementById('confirmation');
    confirmation.textContent = 'Thank you, ' + name + "! We've received your message.";
    confirmation.hidden = false;
  });
}

// Newsletter signup (footer)
const news = document.getElementById('newsletter');

news.addEventListener('submit', function (event) {
  event.preventDefault();
  news.innerHTML = '<p>Thanks for subscribing! </p>';
});