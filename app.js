const moviesGrid = document.getElementById('moviesGrid');
const heroContent = document.getElementById('heroContent');
const heroBg = document.getElementById('heroBg');
const searchInput = document.getElementById('searchInput');

let currentMovies = [];

// FETCH POPULAR MOVIES
async function fetchMovies() {

  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  const data = await response.json();

  currentMovies = data.results;

  renderHero(currentMovies[0]);

  renderMovies(currentMovies);

}

fetchMovies();

// HERO
function renderHero(movie) {

  heroBg.style.backgroundImage =
    `url(${IMAGE_URL + movie.backdrop_path})`;

  heroContent.innerHTML = `

    <h1>${movie.title}</h1>

    <p>
      ⭐ ${movie.vote_average.toFixed(1)}
    </p>

    <p>
      ${movie.overview}
    </p>

    <button onclick="goToMovie(${movie.id})">
      ▶ Watch
    </button>

    <button onclick="addToWatchlist(${movie.id})">
      + Watch Later
    </button>
  `;
}

// MOVIES GRID
function renderMovies(movies) {

  moviesGrid.innerHTML = movies.map(movie => `

    <div class="movie-card">

      <img
        src="${IMAGE_URL + movie.poster_path}"
        alt="${movie.title}"
      />

      <div class="movie-info">

        <h3>${movie.title}</h3>

        <p>⭐ ${movie.vote_average.toFixed(1)}</p>

        <p class="overview">
          ${movie.overview.slice(0, 100)}...
        </p>

        <button onclick="goToMovie(${movie.id})">
          ▶ Watch
        </button>

        <button onclick="addToWatchlist(${movie.id})">
          + Watch Later
        </button>

      </div>

    </div>

  `).join('');

}

// SEARCH
searchInput.addEventListener('keyup', async (e) => {

  const query = e.target.value;

  if (query.trim() === "") {
    renderMovies(currentMovies);
    return;
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await response.json();

  renderMovies(data.results);

});

// MOVIE PAGE
function goToMovie(id) {
  window.location.href = `movie.html?id=${id}`;
}

// WATCHLIST
function addToWatchlist(id) {

  let watchlist =
    JSON.parse(localStorage.getItem('watchlist')) || [];

  if (!watchlist.includes(id)) {

    watchlist.push(id);

    localStorage.setItem(
      'watchlist',
      JSON.stringify(watchlist)
    );

    alert('Added to Watch Later ✅');
  }

  updateWatchCount();
}

function updateWatchCount() {

  let watchlist =
    JSON.parse(localStorage.getItem('watchlist')) || [];

  document.getElementById('watchCount').textContent =
    watchlist.length;
}

updateWatchCount();