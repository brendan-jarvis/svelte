export async function GET() {
	return new Response(
		`
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
        <loc>https://svelte-brendan-jarvis.vercel.app/</loc>
        <lastmod>2023-03-18</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://svelte-brendan-jarvis.vercel.app/blog/1</loc>
        <lastmod>2023-03-18</lastmod>
        <changefreq>never</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://svelte-brendan-jarvis.vercel.app/hackernews</loc>
        <lastmod>2023-03-18</lastmod>
        <changefreq>always</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
