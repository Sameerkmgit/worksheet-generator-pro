import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch('https://sitalsldfenvtdjdgafg.supabase.co/functions/v1/sitemap', {
      method: 'GET',
      headers: {
        'Accept': 'application/xml',
      },
    });

    if (!response.ok) {
      throw new Error(`Edge function returned ${response.status}`);
    }

    const xml = await response.text();

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap fetch error:', error);
    res.status(500).send('Error generating sitemap');
  }
}
