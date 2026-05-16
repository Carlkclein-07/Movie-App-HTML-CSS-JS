// CORRECTION 1: Fixed the missing 'd' in document
document.addEventListener('DOMContentLoaded', () => {
  // CORRECTION 2: Set an empty string placeholder so it doesn't break the syntax
  
  let ALL_MOVIES = [];

  fetch('movies.json')
    .then(res => res.json())
    .then(data => {
      ALL_MOVIES = data;
      renderHero(data);
      renderTrending(data);
      renderMovies(data);
      // This works now because it calls the global function below
      updateWatchCount(); 
    });

  // HERO
  function renderHero(movies) {
    const featured = movies.find(m => m.featured) || movies[0];

    document.getElementById('heroBg').style.backgroundImage =
      `url(${featured.backdrop})`;

    document.getElementById('heroContent').innerHTML = `
      <h1>${featured.title}</h1>
      <p>⭐ ${featured.rating} | ${featured.year}</p>
      <p>${featured.description}</p>

      <button onclick="goToMovie(${featured.id})">▶ Watch</button>
      <button onclick="addToWatchlist(${featured.id})">+ Watch Later</button>
    `;
  }

  // TRENDING
  function renderTrending(movies) {
    const trending = movies.filter(m => m.isTrending);

    document.getElementById('trendingRow').innerHTML =
      trending.map(movie => `
        <div class="movie-card">
          <img src="${movie.poster}" />
          <h4>${movie.title}</h4>

          <p class="rating">⭐ ${movie.rating}</p>

          <button onclick="goToMovie(${movie.id})">▶</button>
          <button onclick="addToWatchlist(${movie.id})">+</button>
        </div>
      `).join('');
  }

  // MOVIES GRID
  function renderMovies(movies) {
    document.getElementById('moviesGrid').innerHTML =
      movies.map(movie => `
        <div class="movie-card">
          <img src="${movie.poster}" />
          <h4>${movie.title}</h4>

          <p class="rating">⭐ ${movie.rating}</p>

          <button onclick="goToMovie(${movie.id})">▶ Watch</button>
          <button onclick="addToWatchlist(${movie.id})">+ Watch Later</button>
        </div>
      `).join('');
  }
});

// NAVIGATION
function goToMovie(id) {
  window.location.href = `movie.html?id=${id}`;
}

// WATCHLIST SYSTEM
function addToWatchlist(id) {
  let list = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem('watchlist', JSON.stringify(list));
    alert('Added to Watch Later ✅');
  }

  updateWatchCount();
}

// CORRECTION 3: Moved this outside DOMContentLoaded so the buttons can access it globally
function updateWatchCount() {
  const list = JSON.parse(localStorage.getItem('watchlist')) || [];
  const el = document.getElementById('watchCount');
  if (el) el.textContent = list.length;
}