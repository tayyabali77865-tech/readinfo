const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-pk.vercel.app';

function RobotsTxt() {}

export async function getServerSideProps({ res }) {
  const content = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay
Crawl-delay: 5
`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.write(content);
  res.end();

  return { props: {} };
}

export default RobotsTxt;
