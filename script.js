const themeBtn = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

themeBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

const filterButtons = document.querySelectorAll('.filter-btn');
const recipeCards = document.querySelectorAll('.recipe-card');

filterButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const region = btn.dataset.filter;

    filterButtons.forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    recipeCards.forEach(function (card) {
      if (region === 'all' || card.dataset.region === region) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

recipeCards.forEach(function (card) {
  const id = card.dataset.id;
  const favBtn = card.querySelector('.fav-btn');

  if (favorites.includes(id)) {
    favBtn.classList.add('active');
  }

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

const servingsInput = document.getElementById('servings');

if (servingsInput) {
  servingsInput.addEventListener('input', function () {
    const base = Number(servingsInput.dataset.base);
    const now = Number(servingsInput.value) || base;

    document.querySelectorAll('.amt').forEach(function (span) {
      const scaled = (Number(span.dataset.amount) * now) / base;
      span.textContent = Math.round(scaled * 100) / 100;
    });
  });
}

const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const error = document.getElementById('error');

    if (message.length <= 20) {
      error.textContent = 'Your message must be more than 20 characters.';
      error.hidden = false;
      return;
    }

    error.hidden = true;
    form.style.display = 'none';

    const confirmation = document.getElementById('confirmation');
    confirmation.textContent = 'Thank you, ' + name + "! We've received your message.";
    confirmation.hidden = false;
  });
}

const news = document.getElementById('newsletter');

news.addEventListener('submit', function (event) {
  event.preventDefault();
  news.innerHTML = '<p>Thanks for subscribing! 🎉</p>';
});