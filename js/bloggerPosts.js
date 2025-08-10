// Fetch and render Blogger posts
// Default shows 5 posts, with "Load More" button to append more

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('blogger-posts');
  const loadMoreBtn = document.getElementById('load-more');
  const postsPerPage = 5;
  let startIndex = 1;

  async function loadPosts() {
    const url = `https://mentor-x.blogspot.com/feeds/posts/summary?alt=json&max-results=${postsPerPage}&start-index=${startIndex}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const entries = data.feed?.entry || [];

      entries.forEach(entry => {
        const title = entry.title?.$t || 'Untitled';
        const link = (entry.link || []).find(l => l.rel === 'alternate')?.href || '#';
        const rawSnippet = entry.summary?.$t || '';
        const snippet = rawSnippet.replace(/<[^>]+>/g, '').slice(0, 100) + '...';

        const item = document.createElement('a');
        item.href = link;
        item.target = '_blank';
        item.className = 'flex gap-4 p-4 bg-white rounded shadow hover:bg-gray-50 transition-colors duration-300';

        const titleEl = document.createElement('h3');
        titleEl.className = 'font-semibold text-blue-700 flex-shrink-0';
        titleEl.textContent = title;

        const snippetEl = document.createElement('p');
        snippetEl.className = 'text-gray-600';
        snippetEl.textContent = snippet;

        item.appendChild(titleEl);
        item.appendChild(snippetEl);
        container.appendChild(item);
      });

      startIndex += entries.length;
      if (entries.length < postsPerPage) {
        loadMoreBtn.classList.add('hidden');
      }
    } catch (err) {
      console.error('Failed to load posts', err);
      loadMoreBtn.classList.add('hidden');
    }
  }

  loadMoreBtn.addEventListener('click', loadPosts);
  loadPosts();
});
