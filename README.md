# Mentor-X

Landing page for the MentorX community.

## Tweet Loading

Tweets from [@XMentor18812](https://x.com/XMentor18812) are embedded using Twitter's official timeline widget. This keeps implementation simple and avoids extra network requests.

1. Add an anchor tag with the `twitter-timeline` class inside a styled container:

   ```html
   <div class="w-full max-w-2xl overflow-hidden rounded shadow bg-white p-4">
     <a class="twitter-timeline" data-tweet-limit="3" href="https://x.com/XMentor18812?ref_src=twsrc%5Etfw">Tweets by XMentor18812</a>
   </div>
   ```

2. Include Twitter's widget script once at the end of the page:

   ```html
   <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
   ```

3. Tailor the feed by adjusting the `data-tweet-limit` or other [widget options](https://developer.twitter.com/en/docs/twitter-for-websites/timelines/overview). The surrounding `<div>` uses Tailwind classes for styling, matching the Blogger post list.

This replaces previous custom fetch solutions and ensures only the official timeline loads.

Update
