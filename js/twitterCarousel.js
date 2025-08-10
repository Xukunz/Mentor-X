document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('twitter-posts');
  if (!container) return;

  const BEARER_TOKEN = 'YOUR_TWITTER_BEARER_TOKEN'; // Replace with your token
  const USERNAME = 'XMentor18812';

  async function fetchTweets() {
    try {
      const userRes = await fetch(`https://api.twitter.com/2/users/by/username/${USERNAME}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`
        }
      });
      if (!userRes.ok) throw new Error('Failed to fetch user');
      const userData = await userRes.json();
      const userId = userData.data.id;

      const tweetsRes = await fetch(
        `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&expansions=attachments.media_keys&media.fields=url&tweet.fields=id`,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
          }
        }
      );
      if (!tweetsRes.ok) throw new Error('Failed to fetch tweets');
      const tweetsData = await tweetsRes.json();

      const mediaMap = new Map();
      (tweetsData.includes?.media || []).forEach((m) => {
        if (m.type === 'photo' && m.url) {
          mediaMap.set(m.media_key, m.url);
        }
      });

      const slides = [];
      (tweetsData.data || []).forEach((tweet) => {
        const key = tweet.attachments?.media_keys?.[0];
        const url = mediaMap.get(key);
        if (url) {
          slides.push({ id: tweet.id, image: url });
        }
      });

      renderCarousel(slides.slice(0, 3));
    } catch (err) {
      console.error('Error loading tweets', err);
      container.textContent = 'Unable to load tweets.';
    }
  }

  function renderCarousel(slides) {
    if (!slides.length) {
      container.textContent = 'No tweets available.';
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'relative overflow-hidden rounded-lg';

    const track = document.createElement('div');
    track.className = 'flex transition-transform duration-700 ease-in-out';
    track.style.width = `${slides.length * 100}%`;

    slides.forEach((slide) => {
      const a = document.createElement('a');
      a.href = `https://twitter.com/${USERNAME}/status/${slide.id}`;
      a.target = '_blank';
      a.className = 'w-full flex-shrink-0';
      a.style.width = `${100 / slides.length}%`;

      const img = document.createElement('img');
      img.src = slide.image;
      img.alt = 'Tweet image';
      img.className = 'w-full h-64 object-cover sm:h-72 md:h-80';

      a.appendChild(img);
      track.appendChild(a);
    });

    wrapper.appendChild(track);
    container.appendChild(wrapper);

    let index = 0;
    setInterval(() => {
      index = (index + 1) % slides.length;
      track.style.transform = `translateX(-${index * (100 / slides.length)}%)`;
    }, 4000);
  }

  fetchTweets();
});
