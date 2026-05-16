const params = new URLSearchParams(window.location.search);

const id = params.get('id');

// FETCH MOVIE DETAILS
async function fetchMovieDetails() {

  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );

  const movie = await response.json();

  document.getElementById('detailHero').style.backgroundImage =
    `url(${IMAGE_URL + movie.backdrop_path})`;

  document.getElementById('detailPoster').src =
    IMAGE_URL + movie.poster_path;

  document.getElementById('detailTitle').textContent =
    movie.title;

  document.getElementById('detailRating').textContent =
    `⭐ ${movie.vote_average.toFixed(1)} | ${movie.release_date}`;

  document.getElementById('detailDescription').textContent =
    movie.overview;

  document.getElementById('addBtn').onclick = () => {
    addToWatchlist(movie.id);
  };

}

fetchMovieDetails();

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

}
const searchBox = document.getElementById("search");
const movieContainer = document.getElementById("movies");

const API_KEY = "YOUR_API_KEY";

searchBox.addEventListener("input", () => {
  searchMovies(searchBox.value);
});

async function searchMovies(query) {
  if (query.trim() === "") {
    movieContainer.innerHTML = "";
    return;
  }

  const response = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
  );

  const data = await response.json();

  displayMovies(data.Search);
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";

  if (!movies) {
    movieContainer.innerHTML = "<h2>No movies found</h2>";
    return;
  }

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");

    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    movieContainer.appendChild(movieCard);
  });
}