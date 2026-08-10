const BASE_URL_1 = 'https://readinfo.org.pk/wp-json/wp/v2';
const BASE_URL_2 = 'https://readinfos.com/wp-json/wp/v2';
const SITE_NAME = 'ReadInfo PK';
const REVALIDATE_SECONDS = 3600; // 1 hour

/**
 * Helper to fetch from a source URL with fallback handling
 */
async function fetchFromSource(endpointUrl) {
  try {
    const res = await fetch(endpointUrl, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error(`Error fetching from ${endpointUrl}:`, err.message);
    return [];
  }
}

/**
 * Fetch with pagination metadata (reads X-WP-TotalPages header)
 */
async function fetchWithMeta(endpointUrl) {
  try {
    const res = await fetch(endpointUrl, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { data: [], totalPages: 0 };
    const data = await res.json();
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    return { data, totalPages };
  } catch (err) {
    console.error(`Error fetching from ${endpointUrl}:`, err.message);
    return { data: [], totalPages: 0 };
  }
}

/**
 * Paginated posts: readinfos.com pages first, then readinfo.org.pk
 * Page 1..N  → readinfos.com
 * Page N+1.. → readinfo.org.pk
 */
export async function getPaginatedPosts(page = 1, perPage = 10) {
  // Fetch both sources' total pages in parallel (lightweight _fields=id)
  const [source2Info, source1Info] = await Promise.all([
    fetchWithMeta(`${BASE_URL_2}/posts?page=1&per_page=${perPage}&_fields=id&status=publish`),
    fetchWithMeta(`${BASE_URL_1}/posts?page=1&per_page=${perPage}&_fields=id&status=publish`),
  ]);

  const readinfosPages  = source2Info.totalPages || 0;  // readinfos.com
  const readinfoOrgPages = source1Info.totalPages || 0; // readinfo.org.pk
  const totalPages = readinfosPages + readinfoOrgPages || 1;

  let pagePosts = [];

  if (page <= readinfosPages && readinfosPages > 0) {
    // Serve from readinfos.com
    const { data } = await fetchWithMeta(
      `${BASE_URL_2}/posts?page=${page}&per_page=${perPage}&_embed=wp:featuredmedia,wp:term&status=publish`
    );
    pagePosts = data.map(p => normalizePost(p, { includeContent: false }));
  } else {
    // Serve from readinfo.org.pk
    const readinfoPage = page - readinfosPages;
    if (readinfoPage >= 1 && readinfoPage <= readinfoOrgPages) {
      const { data } = await fetchWithMeta(
        `${BASE_URL_1}/posts?page=${readinfoPage}&per_page=${perPage}&_embed=wp:featuredmedia,wp:term&status=publish`
      );
      pagePosts = data.map(p => normalizePost(p, { includeContent: false }));
    }
  }

  if (pagePosts.length === 0) {
    const fallback = getFallbackPosts().map(({ content, ...rest }) => rest);
    return { posts: fallback, totalPages: Math.max(totalPages, 1), currentPage: page };
  }

  return { posts: pagePosts, totalPages, currentPage: page };
}

/**
 * Filter duplicates by title and sort descending by date
 */
function processAndMergePosts(postsArray1, postsArray2, options = {}) {
  const allRaw = [...postsArray1, ...postsArray2];
  const normalized = allRaw.map(p => normalizePost(p, options));
  
  const seenTitles = new Set();
  const unique = [];

  // Sort by date descending first
  normalized.sort((a, b) => new Date(b.date) - new Date(a.date));

  for (const post of normalized) {
    const cleanTitle = post.title.toLowerCase().replace(/\s+/g, '').trim();
    if (!seenTitles.has(cleanTitle)) {
      seenTitles.add(cleanTitle);
      unique.push(post);
    }
  }

  return unique;
}

/**
 * Fetch all posts from both sources with pagination
 */
export async function getAllPosts(page = 1, perPage = 12) {
  const [data1, data2] = await Promise.all([
    fetchFromSource(`${BASE_URL_1}/posts?page=${page}&per_page=${perPage}&_embed=wp:featuredmedia,wp:term&status=publish`),
    fetchFromSource(`${BASE_URL_2}/posts?page=${page}&per_page=${perPage}&_embed=wp:featuredmedia,wp:term&status=publish`)
  ]);

  // Strip full content for list views — reduces page data from ~400kB to ~50kB
  const posts = processAndMergePosts(data1, data2, { includeContent: false });

  if (posts.length === 0) {
    return { posts: getFallbackPosts().map(p => ({ ...p, content: undefined })), totalPages: 1 };
  }

  return { posts, totalPages: Math.ceil(posts.length / 10) || 1 };
}

/**
 * Fetch all slugs for static paths
 */
export async function getAllSlugs() {
  const [data1, data2] = await Promise.all([
    fetchFromSource(`${BASE_URL_1}/posts?per_page=50&_fields=slug&status=publish`),
    fetchFromSource(`${BASE_URL_2}/posts?per_page=50&_fields=slug&status=publish`)
  ]);

  const slugs = [...data1, ...data2].map(p => p.slug);
  return slugs.length > 0 ? slugs : ['fbise-ssc-part-1-result-2026-announced', 'maryam-nawaz-e-bikes-scheme-2026'];
}

/**
 * Fetch single post by slug from either source
 */
export async function getPostBySlug(slug) {
  const [data1, data2] = await Promise.all([
    fetchFromSource(`${BASE_URL_1}/posts?slug=${slug}&_embed=wp:featuredmedia,wp:term&status=publish`),
    fetchFromSource(`${BASE_URL_2}/posts?slug=${slug}&_embed=wp:featuredmedia,wp:term&status=publish`)
  ]);

  const posts = [...data1, ...data2];
  if (posts.length > 0) {
    return normalizePost(posts[0]);
  }
  return getFallbackPosts().find(p => p.slug === slug) || getFallbackPosts()[0];
}

/**
 * Fetch latest posts for sidebar/related
 */
export async function getLatestPosts(count = 5) {
  const [data1, data2] = await Promise.all([
    fetchFromSource(`${BASE_URL_1}/posts?per_page=${count}&_embed=wp:featuredmedia,wp:term&status=publish`),
    fetchFromSource(`${BASE_URL_2}/posts?per_page=${count}&_embed=wp:featuredmedia,wp:term&status=publish`)
  ]);

  const posts = processAndMergePosts(data1, data2, { includeContent: false }).slice(0, count);
  if (posts.length === 0) {
    return getFallbackPosts().slice(0, count);
  }
  return posts;
}

/**
 * Fetch posts filtered by category slug from readinfos.com (BASE_URL_2)
 */
export async function getPostsByCategory(categorySlug, count = 12) {
  // First, fetch the category ID by its slug from readinfos.com
  try {
    const catRes = await fetch(`${BASE_URL_2}/categories?slug=${categorySlug}`);
    if (!catRes.ok) return [];
    const catData = await catRes.json();
    if (!catData || catData.length === 0) return [];
    const catId = catData[0].id;
    
    // Now fetch posts using the category ID
    const postsData = await fetchFromSource(`${BASE_URL_2}/posts?categories=${catId}&per_page=${count}&_embed=wp:featuredmedia,wp:term&status=publish`);
    return postsData.map(p => normalizePost(p, { includeContent: false }));
  } catch (err) {
    console.error(`Error fetching category posts for ${categorySlug}:`, err.message);
    return [];
  }
}

/**
 * Fetch posts for sitemap
 */
export async function getAllPostsForSitemap() {
  const [data1, data2] = await Promise.all([
    fetchFromSource(`${BASE_URL_1}/posts?per_page=100&_fields=slug,date,modified&status=publish`),
    fetchFromSource(`${BASE_URL_2}/posts?per_page=100&_fields=slug,date,modified&status=publish`)
  ]);

  const all = [...data1, ...data2];
  return all.length > 0 ? all : getFallbackPosts().map(p => ({ slug: p.slug, date: p.date, modified: p.date }));
}

/**
 * Local fallback data when API is blocked
 */
export function getFallbackPosts() {
  return [
    {
      id: 2683,
      slug: 'fbise-ssc-part-1-result-2026-announced',
      title: 'FBISE SSC Part 1 Result 2026 Announced – Check Federal Board 9th Class Result Online',
      excerpt: 'The FBISE SSC Part 1 Result 2026 has officially been announced. Thousands of students can check federal board 9th class results online.',
      content: '<p>Federal Board of Intermediate and Secondary Education (FBISE) Islamabad has officially declared the SSC Part 1 (9th Class) Annual Examination Results. Students can verify their results by using Roll Number, Name, or via SMS service.</p><h2>How to check FBISE 9th Class Result:</h2><ol><li>Go to the official FBISE portal.</li><li>Enter your Roll Number.</li><li>Select class (SSC-I).</li><li>Click Search.</li></ol>',
      date: new Date().toISOString(),
      imageUrl: null,
      categories: ['Results', 'Latest Updates']
    },
    {
      id: 2677,
      slug: 'maryam-nawaz-e-bikes-scheme-2026',
      title: 'Maryam Nawaz E Bikes Scheme 2026: Eligibility, Online Registration & Application Guide',
      excerpt: 'Getting to college is now easier. Maryam Nawaz E-Bikes scheme registration process, check eligibility criteria and documents required.',
      content: '<p>The government of Punjab has launched the Maryam Nawaz E-Bikes scheme for students in major cities to provide interest-free electric motorbikes on easy installments.</p><h2>Eligibility Criteria:</h2><ul><li>Must be a regular student in Punjab.</li><li>Must possess a valid driving license or learner permit.</li><li>Age limit between 18 to 25.</li></ul>',
      date: new Date().toISOString(),
      imageUrl: null,
      categories: ['Govt Schemes', 'Latest Updates']
    },
    {
      id: 9991,
      slug: 'readinfos-jobs-and-scholarships-updates',
      title: 'ReadInfos Jobs & Scholarships Updates 2026 – Latest Careers Opportunities',
      excerpt: 'ReadInfos.com latest updates on private and public sector jobs and international scholarships schemes for Pakistani students.',
      content: '<p>Sourced from ReadInfos.com. Explore fully funded international scholarships in Europe, USA and UK along with government department job openings in Pakistan.</p>',
      date: new Date().toISOString(),
      imageUrl: null,
      categories: ['Jobs', 'ReadInfos.com']
    }
  ];
}

/**
 * Normalize WordPress post to clean object
 */
function normalizePost(post, { includeContent = true } = {}) {
  const embedded = post._embedded || {};
  const media = embedded['wp:featuredmedia']?.[0];
  const terms = embedded['wp:term'] || [];
  // Flatten all term arrays and filter specifically for 'category' taxonomy
  const categories = terms.flat().filter(t => t && t.taxonomy === 'category');

  const imageUrl =
    media?.media_details?.sizes?.large?.source_url ||
    media?.media_details?.sizes?.medium_large?.source_url ||
    media?.source_url ||
    null;

  const categoryNames = categories.map((c) => c.name);

  // Strip HTML from excerpt
  const rawExcerpt = post.excerpt?.rendered || '';
  const excerpt = rawExcerpt.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160);

  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title?.rendered || ''),
    excerpt: excerpt,
    ...(includeContent && { content: post.content?.rendered || '' }),
    date: post.date,
    modified: post.modified,
    imageUrl,
    categories: categoryNames,
    link: post.link,
  };
}

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

export { SITE_NAME, REVALIDATE_SECONDS };
