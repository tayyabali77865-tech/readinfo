import { getAllPostsForNewsSitemap } from '../lib/api';

const SITE_URL = 'https://readinfo-mu.vercel.app';
const PUBLICATION_NAME = 'ReadInfo';
const PUBLICATION_LANG = 'en';

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateNewsSiteMap(posts) {
  // Google News Sitemap: include articles from last 2 days
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  let recentPosts = posts.filter((p) => new Date(p.date) >= cutoff);

  // Fallback: if no posts in last 48h, use latest 50
  if (recentPosts.length === 0) {
    recentPosts = posts.slice(0, 50);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${recentPosts
  .map(
    (post) => `  <url>
    <loc>${escapeXml(`${SITE_URL}/news/${post.slug}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(PUBLICATION_NAME)}</news:name>
        <news:language>${PUBLICATION_LANG}</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>${
      post.imageUrl
        ? `
    <image:image>
      <image:loc>${escapeXml(post.imageUrl)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;
}

function NewsSiteMap() {
  // Response served via getServerSideProps
}

export async function getServerSideProps({ res }) {
  const posts = await getAllPostsForNewsSitemap();
  const sitemap = generateNewsSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default NewsSiteMap;
