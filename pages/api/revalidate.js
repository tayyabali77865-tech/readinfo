/**
 * API route: /api/revalidate
 * Called by Vercel Cron every hour to force-refresh ISR pages
 */
export default async function handler(req, res) {
  // Secure the endpoint with a secret token
  const secret = req.headers['x-revalidate-secret'] || req.query.secret;
  if (secret !== process.env.REVALIDATE_SECRET && process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    // Revalidate homepage
    await res.revalidate('/');

    // Optionally: revalidate recent article pages
    // (ISR handles this automatically, but we can force it)
    res.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      message: 'Homepage revalidated. Article pages use ISR (auto-update on next visit).',
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating', error: err.message });
  }
}
