// frontend/js/fetch-private-schemes.js

document.addEventListener('DOMContentLoaded', () => {
    const listEl = document.getElementById('schemeList');
    // Show loading
    listEl.innerHTML = '<li>Loading private schemes…</li>';
  
    fetch('http://localhost:5000/api/schemes/private')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(schemes => {
        listEl.innerHTML = ''; 
        if (!schemes.length) {
          listEl.innerHTML = '<li>No private schemes found.</li>';
          return;
        }
        schemes.forEach(s => {
          const li = document.createElement('li');
          li.className = 'scheme-item';
          // Attach same data-attributes your filters expect:
          li.dataset.category   = s.category || 'all';
          li.dataset.region     = s.region   || 'all';
          li.dataset.benefits   = s.benefits || 'all';
          li.dataset.state      = s.state    || 'all';
          li.dataset.gender     = s.gender   || 'all';
          li.dataset.age        = s.ageRange || 'all';
          li.dataset.caste      = s.caste    || 'all';
          li.dataset.ministry   = s.ministry || 'all';
          li.dataset.residence  = s.residence|| 'all';
          li.dataset.minority   = s.minority || 'all';
          li.dataset.disabled   = s.differentlyAbled || 'all';
          li.dataset.dbt        = s.dbt      || 'all';
          li.dataset.disability = s.disabilityPercentage || 'all';
  
          li.innerHTML = `
            <h3>${s.title}</h3>
            <p>${s.description || ''}</p>
            <a href="${s.link}" class="read-more" target="_blank">View Scheme</a>
          `;
          listEl.appendChild(li);
        });
  
        // Re-run filters if your sidebar logic is already loaded
        if (typeof filterSchemes === 'function') {
          filterSchemes();
        }
      })
      .catch(err => {
        console.error('Failed to load private schemes:', err);
        listEl.innerHTML = `<li>Error loading schemes: ${err.message}</li>`;
      });
  });
  