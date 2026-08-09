import Head from 'next/head';

export default function BuyAdspace() {
  return (
    <>
      <Head>
        <title>Buy Adspace – Advertise with Us</title>
        <meta name="description" content="Get premium advertising spaces on our high-traffic news portal." />
      </Head>
      <div className="container">
        <div style={{ padding: '60px 0', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--text-primary)' }}>Buy Adspace</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Aap hamari website par premium advertising space buy kar sakte hain. Hamare paas monthly traffic aur standard display banners support active hain.
          </p>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '24px', borderRadius: '12px', marginTop: '20px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Available Slots:</h2>
            <ul>
              <li>Header Banner (728x90px)</li>
              <li>Sidebar Rectangular Banner (300x250px)</li>
              <li>Inside Article Text Banner (responsive)</li>
            </ul>
            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
              Contact: <a href="mailto:admin@readinfo.org.pk" style={{ color: 'var(--accent)' }}>admin@readinfo.org.pk</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
