document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  // Sync the navbar watch count right when the details page opens
  updateWatchCount();

  fetch('movies.json')
    .then(res => res.json())
    .then(movies => {
      const movie = movies.find(m => m.id === id);
      
      // CORRECTION/OPTIMIZATION 1: Handle missing movie gracefully instead of failing silently
      if (!movie) {
        document.body.innerHTML = `
          <div style="text-align: center; padding: 50px; color: white; font-family: sans-serif;">
            <h2>🎬 Movie not found!</h2>
            <p>The movie you are looking for does not exist or has been removed.</p>
            <a href="index.html" style="color: #e50914; text-decoration: none; font-weight: bold;">← Go Back Home</a>
          </div>
        `;
        return;
      }

      // Populate elements if the movie exists
      document.getElementById('detailHero').style.backgroundImage =
        `url(${movie.backdrop})`;

      document.getElementById('detailPoster').src = movie.poster;
      document.getElementById('detailTitle').textContent = movie.title;
      document.getElementById('detailRating').textContent = `⭐ ${movie.rating} (${movie.year})`;
      document.getElementById('detailDescription').textContent = movie.description;

      document.getElementById('addBtn').onclick = () => {
        addToWatchlist(movie.id);
      };
    });
});

// WATCHLIST SYSTEM
function addToWatchlist(id) {
  let list = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem('watchlist', JSON.stringify(list));
    alert('Added to Watch Later ✅');
  }
  
  // CORRECTION/OPTIMIZATION 2: Update the visual counter after adding an item
  updateWatchCount();
}

// CORRECTION/OPTIMIZATION 3: Added this helper function to match app.js behavior
function updateWatchCount() {
  const list = JSON.parse(localStorage.getItem('watchlist')) || [];
  const el = document.getElementById('watchCount');
  if (el) el.textContent = list.length;
}