// frontend/js/fetch-government-schemes.js

window.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('schemeList');
  // Show a loading indicator
  listEl.innerHTML = '<li>Loading government schemes…</li>';

  fetch('http://localhost:5000/api/schemes/government')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(schemes => {
      // Clear loading message
      listEl.innerHTML = '';

      if (!schemes.length) {
        listEl.innerHTML = '<li>No government schemes found.</li>';
        return;
      }

      schemes.forEach(s => {
        const li = document.createElement('li');
        li.className = 'scheme-item';
        // Attach any data-* attributes needed for filtering
        li.dataset.category = s.category || 'all';
        li.dataset.region   = s.region   || 'all';
        // …add others as needed…

        // Render the scheme
        li.innerHTML = `
          <h3>${s.title}</h3>
          <p>${s.description || ''}</p>
          <a class="read-more" href="${s.link}" target="_blank">View Scheme</a>
        `;
        listEl.appendChild(li);
      });

      // If you have a filterSchemes() function, invoke it now
      if (typeof filterSchemes === 'function') {
        filterSchemes();
      }
    })
    .catch(err => {
      console.error('Failed to load government schemes:', err);
      listEl.innerHTML = `<li>Error loading schemes: ${err.message}</li>`;
    });
});
